<script>
  import Reply from "$components/icons/Reply/Reply.svelte";
  import { timeFormat } from "$lib/utils/date";
  import NewsfeedComment from "./newsfeed-comment-input/NewsfeedCommentInput.svelte";
  export let comment;
  export let post;
  let isReply = false;
</script>

<div class="flex flex-row w-full space-x-2 pt-2">
  <div class="flex-grow-0 w-6 flex items-start cursor-pointer">
    <img
      class=" bg-gray-100 rounded-3xl"
      src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
      alt=""
    />
  </div>
  <div class="flex flex-col">
    <div class="flex-grow flex items-start flex-row space-x-2">
      <div class="flex-grow-0 bg-[#ECEFF1] rounded-lg p-2 pt-1">
        <div class="font-bold text-base">Name</div>
        <div class="flex flex-row items-center">
          <div class="text-gray-900">test</div>
        </div>
      </div>
      <div class=" flex-grow flex items-end h-full pl-2">
        <div class=" text-gray-600 text-sm">
          {timeFormat(comment.createdAt)}
        </div>
      </div>
    </div>
    <div class="flex flex-row space-x-2 text-base pl-3">
      <div class="hover:underline cursor-pointer">Like</div>
      <div
        class="hover:underline cursor-pointer"
        on:click={() => {
          isReply = true;
        }}
      >
        Reply
      </div>
    </div>
  </div>
</div>
<div class="flex flex-row pl-2 space-x-2 items-center">
  <div>
    <Reply />
  </div>
  <div class="hover:underline cursor-pointer text-gray-700">See more</div>
</div>
{#if isReply}
  <div class="w-full flex flex-col pt-2">
    <div class="flex flex-row p-2 max-w-[800px] border rounded-lg">
      <NewsfeedComment
        parent={comment}
        {post}
        on:create={async () => {
          // dispatch("createComment");
          // scrollToBottom(element);
        }}
      />
    </div>
  </div>
{/if}
