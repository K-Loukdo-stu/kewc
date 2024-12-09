<script>
  import { createEventDispatcher } from "svelte";
  import Right from "./right.svelte";
  import Left from "./left.svelte";
  const dispatch = createEventDispatcher();

  export let message;
  export let type;
  export let isMine;
  $: hasThumbnail = !!message?.content?.thumbnail;

  const onRightClick = (evt) => {
    const { pos } = evt.detail;
    dispatch("rightClick", { pos, message, type });
  };
</script>

<div class="  relative max-w-[300px]">
  {#if isMine}
    <Right {hasThumbnail} {message} on:rightClick={(evt) => onRightClick(evt)} />
  {:else}
    <Left {hasThumbnail} {message} on:rightClick={(evt) => onRightClick(evt)} />
  {/if}
</div>
