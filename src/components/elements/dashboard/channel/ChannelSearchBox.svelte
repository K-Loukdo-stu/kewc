<script>
  import ChannelSearchInput from "$components/materials/dashboard/channel/ChannelSearchInput.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { IN_DEV } from "$lib/statics";
  import { getSearchChannels } from "$providers/actions/kchannel/channel";
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import ChannelList from "./channel-list/ChannelList.svelte";
  import ReloadButton from "$components/materials/buttons/ReloadButton.svelte";
    import { searchUsers } from "$providers/actions/kauth";
  const dispatch = createEventDispatcher();

  let searchChannelState = {
    searchText: "",
    channels: [],
    pageNum: 0,
    channelTotal: 0,
    pageTotal: 0,
    limit: 10,
    loading: false,
    loaded: false,
    errMsg: "",
  };

  const onSearchChannel = async () => {
    try {
      searchChannelState.loading = true;
      searchChannelState.loaded = false;
      const res = await getSearchChannels.load({
        searchText: searchChannelState.searchText,
        pageNum: searchChannelState.pageNum,
        limit: searchChannelState.limit,
      });
      searchChannelState.channels = res.data.channels;
      searchChannelState.channelTotal = res.data.channelTotal;
      searchChannelState.pageTotal = res.data.pageTotal;
      searchChannelState.loaded = true;
    } catch (err) {
      searchChannelState.errMsg = err?.message || "Unable to load channels";
      if (IN_DEV) console.log(err);
    } finally {
      searchChannelState.loading = false;
    }
  };

  onMount(() => {
    onSearchChannel();
  });
</script>

<div class=" p-4">
  <div
    class=" flex flex-col h-96 w-full bg-gray-100 border shadow-sm rounded-xl p-3 pb-1"
  >
    <div class=" w-full pb-2">
      <ChannelSearchInput
        bind:searchText={searchChannelState.searchText}
        bind:channelTotal={searchChannelState.channelTotal}
        on:search={onSearchChannel}
      />
    </div>
    <div class=" w-full flex-grow overflow-y-auto">
      {#if !searchChannelState.loading && searchChannelState.errMsg}
        <div class=" flex text-warning justify-center text-sm py-2 text-center">
          <div>
            <div class="py-2">{searchChannelState.errMsg}</div>
            <ReloadButton on:click={() => onSearchChannel()} />
          </div>
        </div>
      {:else if searchChannelState.loaded && searchChannelState.channels.length == 0}
        <div class=" text-center py-2 text-gray-400 font-semibold">
          Not found
        </div>
      {/if}

      {#if searchChannelState.channels.length}
        <ChannelList
          bind:channels={searchChannelState.channels}
          on:select={(evt) => {
            const channel = evt.detail.channel;
            dispatch("select", { channel });
          }}
        />
      {/if}
    </div>

    <!-- search found status -->
    <div class="py-1">
      {#if searchChannelState.loading}
        <div in:fade={{ duration: 200 }} class=" flex justify-end py-2 px-2">
          <SmfbLoading color="gray" />
        </div>
      {:else}
        <h2 in:fade={{ duration: 200 }} class=" text-gray-600 text-right">
          {searchChannelState.channels
            ?.length}/{searchChannelState.channelTotal} Channels found
        </h2>
      {/if}
    </div>
  </div>
</div>
