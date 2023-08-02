import { gql } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";

const cache = new InMemoryCache();
export default cache;

export const GET_ACTIVITIES = gql`
	query Activity($accId: Int!) {
		activity(input: { accId: $accId }) {
      id
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
				prevClosePrice
			}
		}
	}
`;

export const GET_ORDERS = gql`
	query Orders($accId: Int!) {
		orders(input: { accId: $accId }) {
			type
			side
			status
			tradePrice
			tradeQty
			date
			stock {
				ticker
				name
				currPrice
			}
		}
	}
`;

export const GET_TOTAL_VALUE = gql`
	query AllAccValue($userId: String!) {
		allAccValue(input: { userId: $userId })
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

export const GET_OVERVIEW_LINE_CHART = gql`
	query StockHistorical($accId: Int!) {
    stockHistorical(input: {ticker: "^GSPC"}) {
        data {
            x
            y
        }
    }
    accountHistorical(input: {accId: $accId}) {
        data {
            x
            y
        }
    }
}
`;

export const GET_STOCK_LINE_CHART = gql`
  query StockHistorical($ticker: String!) {
    stockHistorical(input: {ticker: $ticker}) {
        data {
            x
            y
        }
    }
  }
`

export const GET_ONE_STOCK = gql`
  query OneStock($ticker: String!) {
    oneStock(input: {ticker: $ticker}) {
      name
      currPrice
    }
  }
`

export const GET_WATCH_LIST = gql`
	query WatchList($accId: Int!) {
		watchList(input: { accId: $accId }) {
			id
			stock {
				ticker
				name
				currPrice
				prevClosePrice
			}
		}
	}
`;

export const TOGGLE_WATCH_LIST = gql`
	mutation ToggleWatch($accId: Int!, $ticker: String!) {
		toggleWatch(accId: $accId, ticker: $ticker) {
			message
			accountWatch {
				id
				stock {
					ticker
					name
					currPrice
					prevClosePrice
				}
			}
		}
	}
`;
