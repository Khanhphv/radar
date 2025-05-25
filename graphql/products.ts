import { gql } from "@apollo/client";
import { createApolloClient } from ".";

export interface IProduct {
  content: string;
  created_at: string;
  id: string;
  product_type: string;
  sub_title: string;
  thumbnail: string;
  title: string;
  updated_at: string;
}

export const productsGraphql = {
  getAll: async (offset?: number, limit?: number) => {
    const client = createApolloClient();
    try {
      const {
        data: { products },
      } = await client.query({
        query: gql`
          query Products {
            products(offset: ${offset || null}, limit: ${limit || null}) {
              content
              created_at
              id
              product_type
              sub_title
              thumbnail
              title
              updated_at
            }
          }
        `,
      });
      return products as IProduct[];
    } catch (error) {
      return [] as IProduct[];
    }
  },
};
