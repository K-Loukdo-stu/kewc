<script>
  import { afterUpdate, onMount } from "svelte";

  export let shown;
  export let duration = 100;
  export let forceReload = true;
  export let delay = 0;
  let initial;

  const setVisible = () => {
    setTimeout(() => {
      initial = true;
    }, delay);
  };

  afterUpdate(() => {
    if (forceReload) {
      if (shown) setVisible();
      if (!shown) {
        const T = setTimeout(() => {
          initial = false;
          clearInterval(T);
        }, 200);
      }
    } else {
      setVisible();
    }
  });
</script>

{#if initial}
  <div
    style="--duration:{duration}ms;"
    class={`${shown ? "fadeIn" : "fadeOut"} absolute inset-0`}
  >
    <slot />
  </div>
{/if}

<style>
  .fadeIn {
    animation: fadeIn var(--duration, 100ms);
    animation-fill-mode: forwards;
  }

  .fadeOut {
    animation: fadeOut var(--duration, 100ms);
    animation-fill-mode: forwards;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      height: 100%;
      width: 100%;
    }
    100% {
      opacity: 1;
      z-index: 5;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    90% {
      opacity: 0;
      height: 100%;
      width: 100%;
    }
    100% {
      opacity: 0;
      height: 0;
      width: 0;
    }
  }
</style>
