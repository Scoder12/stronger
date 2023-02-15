import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!backend) throw new Error("NEXT_PUBLIC_BACKEND_URL is unset");

export const client = new ApolloClient({
  link: createHttpLink({
    uri: backend + "/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});
