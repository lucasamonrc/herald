import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import api from "../services/api";
import getStripeJs from "../services/stripejs";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession() as any;
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn();
      return;
    }

    if (session.activeSubscription) {
      router.push("/stories");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      className="flex mt-10 h-16 w-[260px] rounded bg-teal-400 text-white text-2xl font-bold justify-center items-center transition hover:brightness-75"
    >
      Subscribe Now
    </button>
  );
}
