<script>
  import Right from "./right.svelte";
  import Left from "./left.svelte";

  export let isMine;
</script>

<div class="relative max-w-sm">
  {#if isMine}
    <Right />
  {:else}
    <Left />
  {/if}
</div>
