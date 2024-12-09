<script>
  import Exclamation from "$components/icons/Exclamation/Exclamation.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let title = "Something went wrong!";
  export let msg = "Unknown error";
</script>

<div class=" w-full h-full flex justify-center items-center bg-gray-600/40">
  <div class=" w-80 py-2 shadow-sm border bg-white border-gray-100 rounded-2xl">
    <div class=" h-full w-full flex flex-col">
      <div class=" flex flex-grow-0">
        <div class=" w-full flex justify-center py-4 text-warning">
          <Exclamation h={10} w={10} />
        </div>
      </div>
      <div class=" w-full flex flex-grow py-2 pb-4">
        <div class=" w-full flex flex-col space-y-2">
          <div class=" text-gray-700 text-center py-1 font-semibold">
            {title}
          </div>
          <div class=" text-gray-500 text-center">{msg}</div>
        </div>
      </div>
      <div class=" w-full flex flex-grow-0">
        <div class=" flex flex-col w-full">
          <div class=" w-full py-2 px-6">
            <div class=" border-t border-gray-200" />
          </div>
          <div class=" w-full flex justify-center py-1">
            <div
              on:click={() => dispatch("ok")}
              class=" cursor-pointer py-1 text-center rounded-full w-24 bg-warning text-white"
            >
              OK
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
