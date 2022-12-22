import { gql } from "@apollo/client";

export const GET_STORIES_QUERY = gql`
  query {
    stories(orderBy: createdAt_DESC, stage: PUBLISHED) {
      headline
      summary
      id
      createdAt
      slug
    }
  }
`;

export const GET_STORY_BY_SLUG_QUERY = gql`
  query getBySlug($slug: String!) {
    stories(where: { slug: $slug }) {
      headline
      id
      createdAt
      slug
      summary
      content {
        html
      }
    }
  }
`;
