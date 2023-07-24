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