import { ApolloClient, InMemoryCache } from "@apollo/client";

const apollo = new ApolloClient({
  uri: process.env.HYGRAPH_API_URL as string,
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

export default apollo;
