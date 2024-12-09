<script>
  import { page } from "$app/stores";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { isEwcMode } from "$lib/statics";
  import { createEventDispatcher, onMount } from "svelte";
  import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
  import { channelRatingEwcEvent } from "$lib/ewc-dispatch/events/channel-rating-evt";
  import StarIcon from "$components/icons/star-icon/StarIcon.svelte";
  import {
    channelReview,
    createReviewChannel,
  } from "$providers/actions/kchannel/review";
  import StarFillIcon from "$components/icons/star-icon/StarFillIcon.svelte";
  import { EwcEvents } from "$lib/ewc-dispatch/events";
  let channelId = $page.params.cid;
  let review = {
    feedback: "",
    rate: 0,
  };

  const onChannelRating = async ({ onDoneCb }) => {
    isPosting = true;
    try {
      await createReviewChannel
        .load({
          feedback: review.feedback,
          channel: channelId,
          rate: rating,
        })
        .then((data) => {
          // to do
          isPosting = false;
          onDoneCb?.(data);
          rating = 0;
          review.feedback = "";
        });
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  $: enablePostBtn = rating != 0;

  let isPosting = false;
  let rating = 1;

  const ewcDispatch = new EwcDispatch();
  onMount(async () => {
    ewcDispatch.setPageLoaded();
  });
</script>

<!-- TODO: check by form -->
<div class="relative w-full h-screen flex justify-center">
  <!-- <CreateNewFeed /> -->
  <form
    class="absolute flex w-full h-full max-w-[650px]"
    on:submit|preventDefault={() => {
      onChannelRating({
        onDoneCb: (data) => {
          ewcDispatch.publish({
            key: EwcEvents.pub.channelReview.ON_CREATED_REVIEW,
            data: { review: data },
          });
        },
      });
    }}
    method="post"
  >
    <div class=" flex flex-col w-full bg-white">
      <div class=" flex-grow-0 w-full h-[50px] flex px-4 items-center bg-white">
        {#if isPosting}
          <div class=" w-full flex justify-end items-center">
            <div class="">
              <SmfbLoading color={"#147BE5"} />
            </div>
          </div>
        {:else}
          <div class=" w-full flex justify-between items-center space-x-4 mt-5">
            <div
              class="{isEwcMode()
                ? 'invisible pointer-events-none'
                : ''} text-gray-500 hover:text-gray-600 cursor-pointer"
            >
              Cancel
            </div>
            <div class=" text-gray-800 text-lg font-semibold">Write a Review</div>
            <!-- check button change bg and color when require -->
            <button
              type="submit"
              disabled={!enablePostBtn}
              class=" disabled:text-black/25 disabled:font-bold text-blue-600"
              >Send</button
            >
          </div>
        {/if}
        <hr />
      </div>
      <div
        class="flex flex-row w-full items-center justify-center space-x-4 pt-5"
      >
        {#each Array.from({ length: 5 }, (_, i) => i + 1) as starNum}
          <button
            on:click|preventDefault={() => {
              rating = starNum;
            }}
          >
            {#if rating < starNum}
              <div style="color: #D0D0D0">
                <StarIcon size={25}></StarIcon>
              </div>
            {:else}
              <div style="color: #FFD700">
                <StarFillIcon size={25}></StarFillIcon>
              </div>
            {/if}
          </button>
        {/each}
      </div>
      <div
        class="flex flex-row w-full items-center justify-center pt-2 text-gray-500"
      >
        Tap a Star to Rate
      </div>
      <div class="p-4 pt-2 pb-2 w-full">
        <div class="border-b-2 border-[#D0D0D0]"></div>
      </div>
      <div class="p-4 pt-0 w-full">
        <textarea
          type="text"
          bind:value={review.feedback}
          class="w-full bg-white p-2 rounded-lg outline-none pl-0"
          placeholder="Review (Optional)"
        />
      </div>
    </div>
  </form>
</div>
