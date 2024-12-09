<script>
  import { navigatorRoute } from "$providers/stores/state/route.js";
  export let x = 200;
  export let duration = 500;

  $: isBackward = !!$navigatorRoute.pre?.includes?.($navigatorRoute.path);
</script>

<div class="overflow-x-hidden w-full h-full">
  <div
    class=" w-full h-full {!isBackward ? 'fly' : 'fade'}"
    style="--duration: {duration}ms;--x: {x}px;"
  >
    <slot />
  </div>
</div>

<style>
  .fly {
    /* Apply animation to this element */
    animation: example2 var(--duration, "500ms") ease-out;
  }
  /* Move it (define the animation) */
  @keyframes example2 {
    0% {
      transform: translateX(var(--x, "50%"));
      opacity: 0;
    }
    100% {
      transform: translateX(0%);
      opacity: 1;
    }
  }

  .fade {
    animation: fadeKeyframes var(--duration, "500ms") ease-out;
  }
  @keyframes fadeKeyframes {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
