<script>
  import { afterUpdate } from "svelte";
  export let shown;
  export let isBlur = true;
  export let tranparent = 0.1;
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
    style="background-color: rgba(156, 163, 175, {tranparent});"
    class={`${shown ? "fadeIn" : "fadeOut"} ${
      isBlur ? "modal-blur" : "modal"
    } absolute top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center`}
  >
    <slot />
  </div>
{/if}

<style>
  .modal-blur {
    backdrop-filter: blur(4px);
    animation: fadeIn 100ms;
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
