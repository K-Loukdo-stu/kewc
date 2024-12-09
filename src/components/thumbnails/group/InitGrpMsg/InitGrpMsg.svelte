<script>
  import { user } from "$providers/stores/user.js";

  export let message;

  $: isMine = $user.id == message?.user?.id;
  $: members = message?.content?.members || [];
</script>

<div class=" w-full py-1 pt-4 flex justify-center">
  <div
    class="max-w-sm px-3 py-1 rounded-full backdrop-blur-sm bg-white/30 text-gray-600 text-center break-words text-sm"
  >
    {`${
      isMine ? "You" : `${message?.user?.firstName} ${message?.user?.lastName}`
    } invited ${members
      .map((m) => `${m?.firstName} ${m?.lastName}`)
      ?.join(", ")}`}
  </div>
</div>
