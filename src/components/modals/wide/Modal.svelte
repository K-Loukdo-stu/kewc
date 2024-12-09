<script>
  import { afterUpdate } from "svelte";

  export let shown;
  export let isBlur = true;
  export let isGrayBg = true;
  let initial;

  afterUpdate(() => {
    if (shown) initial = true;
    if (!shown) {
      const T = setTimeout(() => {
        initial = false;
        clearInterval(T);
      }, 200);
    }
  });
</script>

{#if initial}
  <div
    class={`${shown ? "fadeIn" : "fadeOut"} ${
      isBlur ? "modal-blur" : "modal"
    } ${isGrayBg && "bg-gray-400/40"} fixed top-0 left-0 bottom-0 right-0 z-50 `}
  >
    <slot />
  </div>
{/if}

<style>
  .modal-blur {
    backdrop-filter: blur(4px);
  }

  .modal-clear {
    animation: fadeIn 100ms;
  }

  .fadeIn {
    animation: fadeIn 100ms;
    animation-fill-mode: forwards;
  }

  .fadeOut {
    animation: fadeOut 100ms;
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
