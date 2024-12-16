import { useQuery, useMutation, gql, useApolloClient } from "@apollo/client";
import type { Card, CardStatus } from "../types";
// import { useState } from "react";

export const GET_CARDS = gql`
  query GetCards {
    cards {
      id
      title
      description
      createdAt
      status
    }
  }
`;

const CREATE_CARD = gql`
  mutation CreateCard(
    $title: String!
    $description: String!
    $status: String!
  ) {
    createCard(title: $title, description: $description, status: $status) {
      card {
        id
        title
        description
        createdAt
        status
      }
    }
  }
`;

const UPDATE_CARD = gql`
  mutation UpdateCard(
    $id: String!
    $title: String
    $description: String
    $status: String
  ) {
    updateCard(
      id: $id
      title: $title
      description: $description
      status: $status
    ) {
      card {
        id
        title
        description
        createdAt
        status
      }
    }
  }
`;

const DELETE_CARD = gql`
  mutation DeleteCard($id: String!) {
    deleteCard(id: $id) {
      success
    }
  }
`;

export const useCards = () => {
  const { data, loading, error } = useQuery<{ cards: Card[] }>(GET_CARDS);
  const [createCardMutation, { loading: createCardLoading }] = useMutation(CREATE_CARD);
  const [updateCardMutation, { loading: updateCardLoading }] = useMutation(UPDATE_CARD);
  const [deleteCardMutation, { loading: deleteCardLoading }] = useMutation(DELETE_CARD);
  const apolloClient = useApolloClient();

  const createCard = async (
    title: string,
    description: string,
    status: CardStatus
  ) => {
    await createCardMutation({
      variables: { title, description, status },
      refetchQueries: [{ query: GET_CARDS }],
    });
    await apolloClient.refetchQueries({ include: [GET_CARDS] });
  };

  const updateCard = async (
    id: string,
    title?: string,
    description?: string,
    status?: CardStatus
  ) => {
    await updateCardMutation({
      variables: { id, title, description, status },
      refetchQueries: [{ query: GET_CARDS }],
    });
    await apolloClient.refetchQueries({ include: [GET_CARDS] });
  };

  const deleteCard = async (id: string) => {
    await deleteCardMutation({
      variables: { id },
      refetchQueries: [{ query: GET_CARDS }],
    });
    await apolloClient.refetchQueries({ include: [GET_CARDS] });
  };

  const updateCardStatus = async (id: string, status: CardStatus) => {
    await updateCard(id, undefined, undefined, status);
  };

  return {
    cards: data?.cards || [],
    loading,
    error,
    createCard,
    updateCard,
    deleteCard,
    updateCardStatus,
    createCardLoading,
    updateCardLoading,
    deleteCardLoading,
  };
};
