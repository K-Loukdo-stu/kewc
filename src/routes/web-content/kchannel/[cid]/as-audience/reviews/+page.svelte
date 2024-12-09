<script>
  import { page } from "$app/stores";
  import { isEwcMode } from "$lib/statics";
  import { createEventDispatcher, onMount } from "svelte";
  import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
  import StarIcon from "$components/icons/star-icon/StarIcon.svelte";
  import Edit from "$components/icons/Edit.svelte";
  import { channelRatingEwcEvent } from "$lib/ewc-dispatch/events/channel-rating-evt";
  import { goto } from "$app/navigation";
  import {
    channelRate,
    channelReview,
  } from "$providers/actions/kchannel/review";
  import { timeFormat } from "$lib/utils/date";
  import StarFillIcon from "$components/icons/star-icon/StarFillIcon.svelte";
  import { EwcEvents } from "$lib/ewc-dispatch/events";
  let channelId = $page.params.cid;

  let loadChannelState = {
    reviews: [],
    loading: false,
    errMsg: "",
    loaded: false,
  };

  const onLoadChannelReview = async () => {
    if (loadChannelState.loading == true) return;
    try {
      loadChannelState.errMsg = "";
      loadChannelState.loading = true;
      loadChannelState.loaded = false;
      const res = await channelReview.load({
        channelId,
      });
      loadChannelState.reviews = res.data;
      loadChannelState.loaded = true;
    } catch (err) {
      loadChannelState.errMsg = err.message;
    } finally {
      loadChannelState.loading = false;
    }
  };

  let loadChannelRateState = {
    rate: {},
    loading: false,
    errMsg: "",
    loaded: false,
  };

  const onLoadChannelRate = async () => {
    if (loadChannelRateState.loading == true) return;
    try {
      loadChannelRateState.errMsg = "";
      loadChannelRateState.loading = true;
      loadChannelRateState.loaded = false;
      const res = await channelRate.load({
        channelId,
      });
      loadChannelRateState.rate = res.data;
      loadChannelRateState.loaded = true;
    } catch (err) {
      loadChannelRateState.errMsg = err.message;
    } finally {
      loadChannelRateState.loading = false;
    }
  };

  let createRatingEvent = () => {
    if (!isEwcMode()) {
      goto(
        `/web-content/kchannel/${channelId}` + `/as-audience/reviews/create`,
      );
    } else {
      ewcDispatch.publish({
        key: EwcEvents.pub.channelReview.ON_CREATE_REVIEW,
        data: { channelId },
      });
    }
  };

  const ewcDispatch = new EwcDispatch();
  onMount(async () => {
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen({
      key: EwcEvents.lis.channelReview.ON_RELOAD_REVIEWS,
      callback: () => {
        onLoadChannelReview();
      },
    });

    await onLoadChannelRate();
    await onLoadChannelReview();
  });

  // let imgLoaded = false;
  const starNumbers = [1, 2, 3, 4, 5];
</script>

<!-- TODO: check by form -->
<div class="relative w-full h-screen flex justify-center overflow-auto">
  <div class="absolute flex w-full h-full max-w-[650px]">
    <div class="w-full flex-col">
      <div class="h-4"></div>
      <div class="text-2xl font-bold p-2 text-end">Ratings & Reviews</div>
      <div class="flex flex-col w-full items-center p-2 relative">
        <div class="flex flex-row w-full items-center justify-between p-2 pb-0">
          <div class="flex flex-col items-center space-y-1 p-2 justify-center">
            <div class="text-5xl font-bold text-[#504F52]">
              {loadChannelRateState?.rate?.avgTotal || 0}
            </div>
            <div class="text-[#818181] text-base font-bold">out of 5</div>
          </div>
          <div class="flex flex-col items-end space-y-1">
            <div class="flex flex-row items-center space-x-2">
              <div class="flex space-x-1">
                {#each starNumbers as number}
                  <div style="color: #FFD700">
                    <StarFillIcon size={10}></StarFillIcon>
                  </div>
                {/each}
              </div>
              <div class="relative w-[150px] h-1 rounded-lg bg-[#D0D0D0]">
                <div
                  class="bg-[#8E8E8E] absolute left-0 top-0 bottom-0"
                  style={`width: ${loadChannelRateState.rate.percentageRate5Reviews}%;`}
                />
              </div>
            </div>
            <div class="flex flex-row items-center space-x-2">
              <div class="flex space-x-1">
                {#each starNumbers.slice(0, 4) as number}
                  <div style="color: #FFD700">
                    <StarFillIcon size={10}></StarFillIcon>
                  </div>
                {/each}
              </div>
              <div class="relative w-[150px] h-1 rounded-lg bg-[#D0D0D0]">
                <div
                  class="bg-[#8E8E8E] absolute left-0 top-0 bottom-0"
                  style={`width: ${loadChannelRateState.rate.percentageRate4Reviews}%;`}
                />
              </div>
            </div>
            <div class="flex flex-row items-center space-x-2">
              <div class="flex space-x-1">
                {#each starNumbers.slice(0, 3) as number}
                  <div style="color: #FFD700">
                    <StarFillIcon size={10}></StarFillIcon>
                  </div>
                {/each}
              </div>
              <div class="relative w-[150px] h-1 rounded-lg bg-[#D0D0D0]">
                <div
                  class="bg-[#8E8E8E] absolute left-0 top-0 bottom-0"
                  style={`width: ${loadChannelRateState.rate.percentageRate3Reviews}%;`}
                />
              </div>
            </div>
            <div class="flex flex-row items-center space-x-2">
              <div class="flex space-x-1">
                {#each starNumbers.slice(0, 2) as number}
                  <div style="color: #FFD700">
                    <StarFillIcon size={10}></StarFillIcon>
                  </div>
                {/each}
              </div>
              <div class="relative w-[150px] h-1 rounded-lg bg-[#D0D0D0]">
                <div
                  class="bg-[#8E8E8E] absolute left-0 top-0 bottom-0"
                  style={`width: ${loadChannelRateState.rate.percentageRate2Reviews}%;`}
                />
              </div>
            </div>
            <div class="flex flex-row items-center space-x-2">
              <div class="flex space-x-1">
                {#each starNumbers.slice(0, 1) as number}
                  <div style="color: #FFD700">
                    <StarFillIcon size={10}></StarFillIcon>
                  </div>
                {/each}
              </div>
              <div class="relative w-[150px] h-1 rounded-lg bg-[#D0D0D0]">
                <div
                  class="bg-[#8E8E8E] absolute left-0 top-0 bottom-0"
                  style={`width: ${loadChannelRateState.rate.percentageRate1Reviews}%;`}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row w-full items-center justify-end p-2 pt-0">
          <div class="flex flex-col items-end">
            <div class="flex items-end text-[#504F52] text-lg">
              {loadChannelRateState?.rate?.total || 0} Rating
            </div>
          </div>
        </div>
      </div>
      <div class=" p-2 w-full">
        <div class="border-b-2 border-[#D0D0D0]"></div>
      </div>

      <div
        class="flex flex-row items-center w-full p-2 space-x-1 cursor-pointer"
      >
        <button
          on:click={() => {
            createRatingEvent();
          }}
        >
          <Edit currentColor={"#147BE5"}></Edit>
        </button>
        <button
          class="text-[#147BE5] hover:border-b hover:border-[#147BE5]"
          on:click={() => {
            createRatingEvent();
          }}
        >
          Write a Review
        </button>
      </div>
      <div class="w-full p-2 relative flex justify-center flex-col space-y-4">
        {#each loadChannelState.reviews as review}
          <div
            class="flex-grow w-full p-2 bg-[#EBEBEB] rounded-lg flex flex-col space-y-4 h-full"
          >
            <div class="flex flex-row justify-between">
              <div class="flex flex-col space-y-1">
                <div class="font-bold">{review.createdBy.username}</div>
                <div class="flex space-x-1">
                  {#each Array.from({ length: 5 }, (_, i) => i + 1) as starNum}
                    {#if review.rate < starNum}
                      <div style="color: #D0D0D0">
                        <StarIcon size={12}></StarIcon>
                      </div>
                    {:else}
                      <div style="color: #FFD700">
                        <StarFillIcon size={12}></StarFillIcon>
                      </div>
                    {/if}
                  {/each}
                </div>
              </div>
              <div class="flex flex-col">
                <div class="text-[#B3B3B3]">{timeFormat(review.createdAt)}</div>
              </div>
            </div>
            {#if review.feedback}
              <div class="">
                {review.feedback}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
