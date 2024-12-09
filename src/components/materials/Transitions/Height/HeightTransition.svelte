<script>
  let contentHeight;
</script>

<div style="max-height: {contentHeight}px;" class=" max-size-transition w-full">
  <div bind:clientHeight={contentHeight}>
    <slot />
  </div>
</div>

<style>
  .max-size-transition {
    transition: max-height 400ms;
    height: 100vh;
  }
</style>
