import { gql } from '@apollo/client/core';

/**
 *  CHANNEL
 */
export const GET_CHANNELS_QUERY = gql`
	query myChannels {
		myChannels {
			id
			name
			desc
			phone
			email
			website
			profile
		}
	}
`;

export const GET_CHANNEL_QUERY = gql`
	query channel($id: String!) {
		channel(id: $id) {
			id
			name
			desc
			phone
			email
			website
			profile
			cover
			bio
			createdAt
			public
			address
			latitude 
			longitude
			kind
			acceptingCurrency
    		usdExchangeRateInRiel
			catalog {
				id
				name
			}
			
		}
	}
`;



export const GET_CHANNEL_OWNERSHIP_QUERY = gql`
	query myChannelOwnership($channel: String!) {
		myChannelOwnership (params:{
			channel: $channel
     	}) {
			id
			channel {
				id
				name
			}
			user {
				id
				username
			}
		}
	}
`;

export const GET_PAGE_CHANNEL_QUERY = gql`
	query channels($page: Float!, $limit: Float!) {
		channels(page: $page, limit: $limit) {
			total
			page
			channel {
				id
				name
				desc
				phone
				email
				website
				profile
				bio
				createdAt
				catalog {
					id
					name
				}
			}
		}
	}
`;

export const UPDATE_CHANNEL_MUTATION = gql`
	mutation updateChannel(
		$id: String!
		$name: String!
		$bio: String!
		$profile: JSON!
		$desc: String!
		$website: String!
		$phone: String!
		$email: String!
	) {
		updateChannel(
			params: {
				id: $id
				name: $name
				bio: $bio
				profile: $profile
				desc: $desc
				website: $website
				email: $email
				phone: $phone
				public: $publicStatus
			}
		) {
			name
		}
	}
`;

export const UPDATE_CHANNEL_INFO_MUTATION = gql`
	mutation updateChannelInfo(
		$id: String!
		$name: String!
		$bio: String
		$desc: String
		$website: String
		$phone: String
		$email: String
		$catalog: String
		$usdExchangeRateInRiel: String!
		$acceptingCurrency: String!
		$publicStatus: Boolean!
	) {
		updateChannelInfo(
			params: {
				id: $id
				name: $name
				bio: $bio
				desc: $desc
				website: $website
				email: $email
				phone: $phone
				catalog: $catalog
				usdExchangeRateInRiel: $usdExchangeRateInRiel
				acceptingCurrency: $acceptingCurrency
				public: $publicStatus
			}
		) {
			id
			name
			desc
			phone
			email
			website
			profile
			cover
			bio
			createdAt
			public
			address
			latitude 
			longitude
			kind
			acceptingCurrency
    		usdExchangeRateInRiel
			catalog {
				id
				name
			}
		}
	}
`;

export const UPDATE_CHANNEL_ADDRESS_MUTATION = gql`
	mutation updateChannelAddress(
		$id: String!
		$address: String!
		$latitude: Float!
		$longitude: Float!
	) {
		updateChannelAddress(
			params: {
				id: $id
				address: $address
				latitude: $latitude
				longitude: $longitude
			}
		) {
			name
		}
	}
`;

export const UPDATE_CHANNEL_PROFILE_MUTATION = gql`
	mutation updateChannelProfile(
		$id: String!
		$profile: JSON!
	) {
		updateChannelProfile(
			params: {
				id: $id
				profile: $profile
			}
		) {
			name
		}
	}
`;

export const UPDATE_CHANNEL_COVER_MUTATION = gql`
	mutation updateChannelCover(
		$id: String!
		$cover: JSON!
	) {
		updateChannelCover(
			params: {
				id: $id
				cover: $cover
			}
		) {
			name
		}
	}
`;

export const GET_SEARCH_CHANNEL_QUERY = gql`
	query searchChannels($currentPage: Float!, $searchText: String!, $limit: Float!) {
		searchChannels(
			param: { currentPage: $currentPage, searchText: $searchText, limit: $limit }
		) {
			channelTotal
			pageTotal
			channels {
				id
				name
				desc
				phone
				email
				website
				bio
				profile
				catalog{
              id
              name
        }
				createdAt
				updatedAt
			}
		}
	}
`;




export const GET_CHANNEL_INFO_QUERY = gql`
	query channelInfo($id: String!) {
		channelInfo(
			id: $id
		) 
		{
			id
			name
			desc
			phone
			email
			website
			bio
			profile
			catalog
				{
					id
					name
				}
			createdAt
			updatedAt
		}
	}
`;
