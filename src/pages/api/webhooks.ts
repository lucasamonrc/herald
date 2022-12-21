import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";

import { stripe } from "../../services/stripe";
import supabase from "../../services/supabase";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscriptions.updated",
  "customer.subscriptions.deleted",
]);

async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("stripe_customer_id", customerId)
    .single();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    user_id: user.id,
    active: subscription.status === "active",
  };

  if (createAction) {
    await supabase.from("subscriptions").insert(subscriptionData);
  } else {
    await supabase
      .from("subscriptions")
      .update(subscriptionData)
      .eq("user_id", user.id);
  }
}

const webhooks = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    const buf = await buffer(request);

    const secret = request.headers["stripe-signature"] as
      | string
      | string[]
      | Buffer;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err) {
      const e = err as Error;
      return response.status(400).send(`Webhook error: ${e.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            const subscription = event.data.object as Stripe.Subscription;

            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              false
            );

            break;
          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession?.subscription?.toString() as string,
              checkoutSession?.customer?.toString() as string,
              true
            );

            break;
          default:
            throw new Error("Unhandled event");
        }
      } catch (err) {
        return response.json({ error: "Webhook handler failed" });
      }
    }

    return response.json({ received: true });
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};

export default webhooks;
