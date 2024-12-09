<script>
  import { createEventDispatcher, onMount, tick } from "svelte";
  import UserListItem from "./UserListItem.svelte";
  const dispatch = createEventDispatcher();
  export let users = [];
  export let selectedUser;

  const onSelect = (user) => {
    selectedUser = user;
    dispatch("select", { user });
  };

  onMount(() => {
    tick().then(() => {
      if (users?.length > 0) {
        onSelect(users[0]);
      }
    });
  });
</script>

{#each users as user}
  <UserListItem
    {user}
    active={selectedUser?.id == user.id}
    on:select={() => onSelect(user)}
  />
{/each}
