<script>
  import TimeIcon from "$components/icons/Time.svelte";
  import TagIcon from "$components/icons/tag/Tag.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { getChannel } from "$providers/actions/kchannel/channel";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  export let channelId;
  let imgLoaded = false;
  let loadChannelState = {
    channel: null,
    loading: false,
    loaded: false,
    errMsg: "",
  };

  $: onLoadChannel({ channelId });

  const onLoadChannel = async ({ channelId }) => {
    if (!channelId) return;
    try {
      loadChannelState.loaded = false;
      loadChannelState.loading = true;
      const res = await getChannel.load({ id: channelId });
      loadChannelState.channel = res.data;
      loadChannelState.loaded = true;
    } catch (err) {
      loadChannelState.errMsg = err.message;
    } finally {
      loadChannelState.loading = false;
    }
  };

  onMount(() => {
    onLoadChannel({ channelId });
  });
</script>

<div class=" pt-4 px-4">
  {#if loadChannelState.loading}
    <div in:fade={{ duration: 200 }} class=" flex py-2 justify-center">
      <SmfbLoading color="gray" />
    </div>
  {:else if loadChannelState.loaded}
    <div in:fade={{ duration: 200 }} class=" w-full">
      <div
        for=""
        class="flex bg-white p-1 px-3 mt-2 space-x-4 rounded-2xl border-2 cursor-pointer justify-between py-3"
      >
        <div>
          <p
            class=" px-6 py-1 rounded-full bg-tertiary-3 text-white select-text"
          >
            {`${loadChannelState.channel?.id}`}
          </p>
          <div class=" flex pt-3">
            <div class=" flex justify-center items-center">
              <div class="h-14 w-14 rounded-[20px] bg-gray-200 border">
                <img
                  class:invisible={true}
                  src={loadChannelState.channel?.profile?.thumbnail?.url}
                  alt=""
                  class=" w-full h-full"
                  on:load={() => (imgLoaded = true)}
                />
              </div>
            </div>
            <div class=" flex w-full px-3">
              <div>
                <h2 class=" text-gray-600 font-medium text-lg">
                  {`${loadChannelState.channel?.name}`}
                </h2>
                <div class=" flex items-center">
                  <div
                    class="flex items-center w-4 h-4 font-thin text-gray-400"
                  >
                    <TagIcon />
                  </div>
                  <p class="text-gray-400 text-sm pl-1">
                    {`${loadChannelState.channel?.catalog?.name || "---"}`}
                  </p>
                </div>
                <div class=" flex items-center">
                  <div
                    class="flex items-center w-4 h-4 font-thin text-gray-400"
                  >
                    <TimeIcon />
                  </div>
                  <p class="text-gray-400 cursor-pointer text-sm pl-1">
                    {`${new Date(
                      loadChannelState.channel?.createdAt
                    ).toLocaleDateString()}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=" flex flex-col space-y-3 justify-center">
          <slot />
        </div>
      </div>
    </div>
  {/if}
</div>
