import { APIs } from '$lib/statics/apis';
import { CREATE_REVIEW_CHANNEL_MUTATION, GET_CHANNEL_RATE_QUERY, GET_CHANNEL_REVIEW_QUERY } from '$providers/queries/kchannel/review';
import { endpointFetch } from '../utils';


export const createReviewChannel = {
	load: async ({ feedback, channel, rate }) => {
		const res = await endpointFetch(
			{
				query: CREATE_REVIEW_CHANNEL_MUTATION,
				variables: { feedback, channel, rate },
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['createReviewChannel'];
			return res['data'];
		}
		throw res;
	},
};

export const channelReview = {
	load: async ({ channelId }) => {
		const res = await endpointFetch(
			{
				query: GET_CHANNEL_REVIEW_QUERY,
				variables: { channelId },
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['channelReview'];
			return res;
		}
		throw res;
	},
};

export const channelRate = {
	load: async ({ channelId }) => {
		const res = await endpointFetch(
			{
				query: GET_CHANNEL_RATE_QUERY,
				variables: { channelId },
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['channelRate'];
			return res;
		}
		throw res;
	},
};