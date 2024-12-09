<script>
  import { afterUpdate } from "svelte";
  export let x = 0;
  export let y = 0;
  export let shown;
  export let duration = 500;
  export let enableAnimationOut = true;

  let initial;

  afterUpdate(() => {
    if (shown) initial = true;
    if (!shown) {
      if (enableAnimationOut) {
        const T = setTimeout(() => {
          initial = false;
          clearInterval(T);
        }, 100);
      } else {
        initial = false;
      }
    }
  });
</script>

{#if initial}
  <div class="overflow-x-hidden w-full h-full">
    <div
      class=" w-full h-full {shown
        ? 'flyIn'
        : enableAnimationOut
        ? 'flyOut'
        : ''}"
      style="--duration: {duration}ms;--x: {x}px;--y: {y}px;"
    >
      <slot />
    </div>
  </div>
{/if}

<style>
  .flyIn {
    /* Apply animation to this element */
    animation: example2 var(--duration, "500ms") ease-in;
  }
  /* Move it (define the animation) */
  @keyframes example2 {
    0% {
      transform: translate(var(--x, "50%"), var(--y, "50%"));
      opacity: 0;
    }
    100% {
      transform: translate(0%, 0%);
      opacity: 1;
    }
  }

  .flyOut {
    /* Apply animation to this element */
    animation: example3 var(--duration, "500ms") ease-out;
  }
  /* Move it (define the animation) */
  @keyframes example3 {
    0% {
      transform: translate(0%, 0%);
      opacity: 1;
    }
    100% {
      transform: translate(var(--x, "50%"), var(--y, "50%"));
      opacity: 0;
    }
  }
</style>
