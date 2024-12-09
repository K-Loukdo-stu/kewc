<script>
  import Search from "$components/icons/Search.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let searchText;
  export let channelTotal;
  let searchDelayT;
</script>

<form>
  <div class="relative">
    <div
      class="flex absolute inset-y-[2px] left-0 items-center pl-4 pointer-events-none text-gray-500 w-12 h-12"
    >
      <Search />
    </div>
    <input
      bind:value={searchText}
      on:input={() => {
        if (searchDelayT) clearTimeout(searchDelayT);
        searchDelayT = setTimeout(async () => {
          dispatch("search");
        }, 500);
      }}
      hideLabel
      type="search"
      id="title_total"
      class="block p-3 pl-14 w-full text-gray-900 rounded-full border-2 border-gray-300 dark:bg-white dark:placeholder-gray-400 dark:text-gray-700 peer px-2 outline-none focus:outline-none focus:ring-0"
      placeholder="Search {channelTotal} channels"
      required
    />
  </div>
</form>
