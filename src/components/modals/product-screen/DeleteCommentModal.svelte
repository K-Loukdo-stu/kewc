<script>
  export let shown;
  export let tranparent = 0.2;
</script>

{#if shown}
  <div
    class="fixed inset-0 z-50 right-0"
    style="background-color: rgba(156, 163, 175, {tranparent});"
  >
    <slot />
  </div>
{/if}
