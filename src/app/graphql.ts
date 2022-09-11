import { gql } from 'apollo-angular';

/** Queries */
export const ALL_BOXES_QUERY = gql`
  query {
    boxes(free: false, purchasable: true, openable: true) {
      edges {
        node {
          id
          name
          iconUrl
          cost
        }
      }
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
      name
      wallets {
        id
        amount
        currency
      }
    }
  }
`;

/** Mutations */
export const LOGIN_MUTATION = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      user {
        displayName
      }
    }
  }
`;

export const OPEN_BOX_MUTATION = gql`
  mutation OpenBox($input: OpenBoxInput!) {
    openBox(input: $input) {
      boxOpenings {
        id
        itemVariant {
          id
          name
          value
        }
      }
    }
  }
`;

/** Subscriptions */
export const WALLET_UPDATE_SUBSCRIPTION = gql`
  subscription OnUpdateWallet {
    updateWallet {
      wallet {
        id
        amount
        name
      }
    }
  }
`;
