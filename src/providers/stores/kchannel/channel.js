/**
 *  Create store in svelte
 */

import { channels, getAllChannels } from '$providers/actions/kchannel/channel';
import { writable } from 'svelte/store';

// const channel = writable({});
// const channelStore = {
// 	subscribe: channel.subscribe,
// 	reset: (channelStore) => channel.set(channelStore),
// };

const channels = writable([]);
const stored = localStorage.channel;
const channel = writable(stored ? JSON.parse(stored) : null);
channels.subscribe((value) => (localStorage.channel = JSON.stringify(value)));
const pageChannel = localStorage.pageDetail;
const pageDetail = writable(pageChannel ?? 1);
pageDetail.subscribe((value) => (localStorage.pageDetail = value * 1));
const channelsStore = {
	subscribe: channel.subscribe,
	getChannel: async () => {
		let data = await channels.load();
		channel.set(data);
		return data;
	},
	getAllChannels: (page) =>
		getAllChannels.load(page * 1).then((res) => channel.set(res.data)),
	// future data
	setPageDetail: ({ page: number }) => pageDetail.set({ page: number }),
	getPage: () => localStorage.pageDetail,
	reset: (channelData) => channel.set(channelData),
};

const channelStore = {
	subscribe: channel.subscribe,
	reset: (channelData) => channel.set(channelData)
};

export { channel, pageDetail, channelsStore, channelStore };
