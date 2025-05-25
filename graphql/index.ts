"use client";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://cool-sunbeam-67.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "ttqtvuReKv7vm96R3qhXCEbA3gCRQaKQI4YcvhnGUwFOEjfq6xF1svwL6ct81Mdg",
    },
  });
};

export { createApolloClient };

export * from "./products";
