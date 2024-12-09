import { gql } from '@apollo/client/core';

/**
 *  REVIEW
 */

export const CREATE_REVIEW_CHANNEL_MUTATION = gql`
	mutation createReviewChannel(
		$feedback: String
		$channel: String!
		$rate: Float!
	) {
		createReviewChannel(
			params: {
				feedback: $feedback
				channel: $channel
				rate: $rate
			}
		) {
			id
		}
	}
`;

export const GET_CHANNEL_REVIEW_QUERY = gql`
	query channelReview($channelId: String!) {
		channelReview(channelId: $channelId) {
			id, rate, feedback, createdAt, createdBy{id, username}
		}
	}
`;

export const GET_CHANNEL_RATE_QUERY = gql`
	query channelRate($channelId: String!) {
		channelRate(channelId: $channelId) {
			percentageRate2Reviews,
            percentageRate3Reviews,
            percentageRate4Reviews,
            percentageRate5Reviews,
            total,
            avgTotal
		}
	}
`;