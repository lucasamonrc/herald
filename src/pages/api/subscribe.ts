import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { stripe } from "../../services/stripe";
import supabase from "../../services/supabase";

const subscribe = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  if (request.method === "POST") {
    const session = await getSession({ req: request });

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", session?.user?.email)
      .single();

    let customerId = data.stripe_customer_id;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: session?.user?.email as string,
      });

      await supabase
        .from("users")
        .update({ stripe_customer_id: stripeCustomer.id })
        .eq("id", data.id);
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: "price_1MHGraEm2gwBmoGGSQguhFti", quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL as string,
      cancel_url: process.env.STRIPE_CANCEL_URL as string,
    });

    return response.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};

export default subscribe;
