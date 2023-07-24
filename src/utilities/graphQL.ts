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
