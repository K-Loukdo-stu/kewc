<script>
  import { cubicIn } from "svelte/easing";
  import fadeScale from "$lib/utils/transitionFadeScale.js";

  export let message;

  $: sending = message?.sending
</script>

<div
  in:fadeScale={{
    delay: 0,
    duration: sending ? 250 : 0,
    easing: cubicIn,
    baseScale: 0.5,
  }}
>
  <slot />
</div>
