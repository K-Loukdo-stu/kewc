<script>

    import NewsfeedCommentListItem from "./NewsfeedCommentListItem.svelte";

    export let comments = [];
    export let post;
    export let user;
    export let channelOwnership;
</script>

<div class="w-full">
    {#each comments as comment}
        <NewsfeedCommentListItem {comment} {post} {user} {channelOwnership} />
    {/each}
</div>
