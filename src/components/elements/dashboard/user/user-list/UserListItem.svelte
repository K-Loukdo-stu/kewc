<script>
  import TimeIcon from "$components/icons/Time.svelte";
  // import TagIcon from "$components/icons/tag/Tag.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let user;
  export let active = false;
  let imgLoaded = false;
</script>

<button class=" w-full" disabled={active} on:click={() => dispatch("select", { user })}>
  <label
    for={`${user.id}`}
    class="flex bg-white p-1 px-3 mt-2 space-x-4 items-center rounded-2xl border-2 cursor-pointer"
  >
    <div class=" flex justify-center items-center">
      <div class="h-14 w-14 rounded-[20px] bg-gray-200 border">
        <img
          class:invisible={!imgLoaded}
          src={user?.profile?.thumbnail?.url}
          alt=""
          class=" w-full h-full"
          on:load={() => (imgLoaded = true)}
        />
      </div>
    </div>
    <div class=" flex w-full justify-between">
      <div>
        <h2 class=" text-gray-600 font-medium text-lg">
          {`${user.username}`}
        </h2>
        <div class=" flex items-center">
          <div class="flex items-center w-4 h-4 font-thin text-gray-400">
            <TimeIcon />
          </div>
          <p class="text-gray-400 cursor-pointer text-sm pl-1">
            {`${new Date(user?.createdAt).toLocaleDateString()}`}
          </p>
        </div>
        <!-- <div class=" flex items-center">
          <div class="flex items-center w-4 h-4 font-thin text-gray-400">
            <TagIcon />
          </div>
          <p class="text-gray-400 text-sm pl-1">
            {`${user.catalog?.name || "---"}`}
          </p>
        </div> -->
      </div>
      <div class=" flex justify-end items-center">
        <p class=" text-gray-600 select-text px-2">{`${user.id}`}</p>
        <div class=" pl-4 flex items-center">
          {#if active}
            <div class=" w-6 h-6 p-[2px] border-2 border-gray-300 rounded-full">
              <div class="  w-full h-full rounded-full bg-tertiary-3" />
            </div>
          {:else}
            <div
              class=" w-6 h-6 p-[2px] border-2 border-gray-300 rounded-full"
            />
          {/if}
        </div>
      </div>
    </div>
  </label>
</button>
