<script>
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { IN_DEV } from "$lib/statics";
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import ReloadButton from "$components/materials/buttons/ReloadButton.svelte";
  import { searchUsers } from "$providers/actions/kauth";
  import UserSearchInput from "$components/materials/dashboard/user/UserSearchInput.svelte";
  import UserList from "./user-list/UserList.svelte";
  const dispatch = createEventDispatcher();


  let searchUserState = {
    searchText: "",
    users: [],
    pageNum: 0,
    userTotal: 0,
    pageTotal: 0,
    limit: 10,
    loading: false,
    loaded: false,
    errMsg: "",
  };

  const onSearchUser = async () => {
    try {
      searchUserState.loading = true;
      searchUserState.loaded = false;
      const res = await searchUsers.load({
        searchText: searchUserState.searchText,
        pageNum: searchUserState.pageNum,
      });
      searchUserState.users = res.data.users;
      searchUserState.userTotal = res.data.usersCount;
      searchUserState.pageTotal = searchUserState.pageNum;
      searchUserState.loaded = true;
    } catch (err) {
      searchUserState.errMsg = err?.message || "Unable to load users";
      if (IN_DEV) console.log(err);
    } finally {
      searchUserState.loading = false;
    }
  };

  onMount(() => {
    onSearchUser();
  });
</script>

<div class=" p-4">
  <div
    class=" flex flex-col h-96 w-full bg-gray-100 border shadow-sm rounded-xl p-3 pb-1"
  >
    <div class=" w-full pb-2">
      <UserSearchInput
        bind:searchText={searchUserState.searchText}
        bind:userTotal={searchUserState.users.length}
        on:search={onSearchUser}
      />
    </div>
    <div class=" w-full flex-grow overflow-y-auto">
      {#if !searchUserState.loading && searchUserState.errMsg}
        <div class=" flex text-warning justify-center text-sm py-2 text-center">
          <div>
            <div class="py-2">{searchUserState.errMsg}</div>
            <ReloadButton on:click={() => onSearchUser()} />
          </div>
        </div>
      {:else if searchUserState.loaded && searchUserState.users.length == 0}
        <div class=" text-center py-2 text-gray-400 font-semibold">
          Not found
        </div>
      {/if}

      {#if searchUserState.users.length}
        <UserList
          bind:users={searchUserState.users}
          on:select={(evt) => {
            const user = evt.detail.user;
            dispatch("select", { user });
          }}
        />
      {/if}
    </div>

    <!-- search found status -->
    <div class="py-1">
      {#if searchUserState.loading}
        <div in:fade={{ duration: 200 }} class=" flex justify-end py-2 px-2">
          <SmfbLoading color="gray" />
        </div>
      {:else}
        <h2 in:fade={{ duration: 200 }} class=" text-gray-600 text-right">
          {searchUserState.users?.length} Users found
          <!-- {searchUserState.users?.length}/{searchUserState.userTotal} Users found -->
        </h2>
      {/if}
    </div>
  </div>
</div>
