import { APIs } from '$lib/statics/apis';
import {
	GET_CHANNELS_QUERY,
	GET_CHANNEL_INFO_QUERY,
	GET_CHANNEL_OWNERSHIP_QUERY,
	GET_CHANNEL_QUERY,
	GET_PAGE_CHANNEL_QUERY,
	GET_SEARCH_CHANNEL_QUERY,
	UPDATE_CHANNEL_ADDRESS_MUTATION,
	UPDATE_CHANNEL_COVER_MUTATION,
	UPDATE_CHANNEL_INFO_MUTATION,
	UPDATE_CHANNEL_MUTATION,
	UPDATE_CHANNEL_PROFILE_MUTATION
} from '$providers/queries/kchannel/channel';
import { endpointFetch } from '../utils';

export const getChannels = {
	load: async () => {
		const res = await endpointFetch(
			{
				query: GET_CHANNELS_QUERY,
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['myChannels'];
			return res;
		}

		throw res;
	},
};
export const getSearchChannels = {
	load: async ({ searchText = "", pageNum = 0, limit = 10 }) => {
		const res = await endpointFetch(
			{
				query: GET_SEARCH_CHANNEL_QUERY,
				variables: { currentPage: pageNum, searchText, limit },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['searchChannels'];
			return res;
		}
		throw res;
	},
};

export const getChannel = {
	load: async ({ id }) => {
		const res = await endpointFetch(
			{
				query: GET_CHANNEL_QUERY,
				variables: { id },
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['channel'];
			return res;
		}
		throw res;
	},
};

export const getChannelOwnership = {
	load: async ({ channel }) => {
		const res = await endpointFetch(
			{
				query: GET_CHANNEL_OWNERSHIP_QUERY,
				variables: { channel },
			},
			APIs.KTALK
		);
		if (res?.success == true) {
			res['data'] = res['data']['myChannelOwnership'];
			return res;
		}
		throw res;
	},
};


export const updateChannel = {
	load: async ({ id, email, name, phone, bio, profile, desc, website }) => {
		const res = await endpointFetch(
			{
				query: UPDATE_CHANNEL_MUTATION,
				variables: { id, email, name, phone, bio, profile, desc, website },
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['updateChannel'];
			return res;
		}
		throw res;
	},
};

export const updateChannelInfo = {
	load: async ({ id, email, name, phone, bio, desc, website, publicStatus, catalog, acceptingCurrency, usdExchangeRateInRiel }) => {
		const res = await endpointFetch(
			{
				query: UPDATE_CHANNEL_INFO_MUTATION,
				variables: { id, email, name, phone, bio, desc, website, publicStatus, catalog, acceptingCurrency, usdExchangeRateInRiel },
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['updateChannelInfo'];
			return res;
		}
		throw res;
	},
};

export const updateChannelAddress = {
	load: async ({ id, address, latitude, longitude }) => {
		const res = await endpointFetch(
			{
				query: UPDATE_CHANNEL_ADDRESS_MUTATION,
				variables: { id, address, latitude, longitude },
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['updateChannelAddress'];
			return res;
		}
		throw res;
	},
};


export const updateChannelProfile = {
	load: async ({ id, profile }) => {
		const res = await endpointFetch(
			{
				query: UPDATE_CHANNEL_PROFILE_MUTATION,
				variables: { id, profile },
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['updateChannelProfile'];
			return res;
		}
		throw res;
	},
};

export const updateChannelCover = {
	load: async ({ id, cover }) => {
		const res = await endpointFetch(
			{
				query: UPDATE_CHANNEL_COVER_MUTATION,
				variables: { id, cover },
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['updateChannelCover'];
			return res;
		}
		throw res;
	},
};

export const getAllChannels = {
	load: async (page, limit) => {
		const res = await endpointFetch(
			{
				query: GET_PAGE_CHANNEL_QUERY,
				variables: { page: page, limit: limit },
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['channels'];
			return res;
		}
		throw res;
	},
};


export const getChannelInfo = {
	load: async ({ id }) => {
		const res = await endpointFetch(
			{
				query: GET_CHANNEL_INFO_QUERY,
				variables: { id },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['channelInfo'];
			return res;
		}
		throw res;
	},
};

