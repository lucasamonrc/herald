import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import supabase from "../../../services/supabase";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      let results = await supabase
        .from("users")
        .select("*")
        .eq("email", session?.user?.email as string)
        .single();

      if (results.error) {
        return { ...session, activeSubscription: null };
      }

      results = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", results.data.id)
        .single();

      if (results.error) {
        return { ...session, activeSubscription: null };
      }

      return { ...session, activeSubscription: results.data.active || null };
    },
    async signIn({ user, account, profile }) {
      let results = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

      if (results.error) {
        let { error } = await supabase
          .from("users")
          .insert({ name: user.name, email: user.email, image: user.image });

        if (error) {
          console.error(error);
          return false;
        }
      }

      return true;
    },
  },
});
