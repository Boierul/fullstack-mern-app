import { gql } from '@apollo/client';

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

const GET_CLIENT_BY_ID = gql`
  query getClientById($id:ID!) {
    client(id:$id) {
      id,
      name,
      email,
      phone
    }
  }
`;

export { GET_CLIENTS, GET_CLIENT_BY_ID };
