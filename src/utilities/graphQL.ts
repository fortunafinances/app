import { gql } from "@apollo/client";

export const GET_ACTIVITIES = gql`
  query Activity($accId: Int!) {
    activity(input: { accId: $accId }) {
      date
      type
      description
      amount
    }
  }
`;

export const GET_HOLDINGS = gql`
  query Holdings($accId: Int!) {
    holdings(input: { accId: $accId }) {
      stockQuantity
      stock {
        ticker
        name
        currPrice
      }
    }
  }
`;

export const MAKE_TRANSFER = gql`
  mutation InsertTransfer(
    $sendAccId: Int!
    $receiveAccId: Int!
    $transferAmt: Float!
  ) {
    insertTransfer(
      sendAccId: $sendAccId
      receiveAccId: $receiveAccId
      transferAmt: $transferAmt
    )
  }
`;

export const GET_ACCOUNTS = gql`
  query Accounts($userId: String!) {
    accounts(input: { userId: $userId }) {
      accId
      name
      cash
    }
  }
`;

export const GET_STOCK_NAMES = gql`
  query Stocks {
    stocks {
      name
      ticker
      currPrice
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation InsertAccount($name: String!, $userId: ID!) {
    insertAccount(name: $name, userId: $userId) {
      message
      account {
        accId
        name
        cash
      }
    }
  }
`;

export const GET_OVERVIEW = gql`
  query DisplayBar($accId: Int!) {
    displayBar(input: { accId: $accId }) {
      total
      invest
      cash
    }
  }
`;

export const GET_PIE_CHART_DATA = gql`
  query PieData($accId: Int!) {
    pieData(input: { accId: $accId }) {
      labels
      values
      message
    }
  }
`;

export const GET_LINE_CHART_SP500 = gql`
	query StockHistorical($ticker: String!) {
		stockHistorical(input: { ticker: $ticker}) {
			date
			price
		}
	}
`;

export const GET_LINE_CHART_USER = gql`
	query AccountHistorical($accId: Int!) {
		accountHistorical(input: { accId: $accId}) {
			date
			value
		}
	}
`;