<script>
  import PersonalProfile from "$components/elements/Profiles/PersonalProfile.svelte";
  import Modal from "$components/modals/wide/Modal.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let message;
  export let type;
  export let isMine;

  let imgLoaded;
  let personalProfileShown = false;

  $: friend = message?.content;
  $: photo = message?.content?.photo;

  const onOpenProfile = () => {
    personalProfileShown = true;
  };
</script>

<div
  on:contextmenu|preventDefault={(evt) => {
    let pos = { x: evt.clientX, y: evt.clientY };
    dispatch("rightClick", { pos, message, type });
  }}
  class="  relative flex flex-col items-center bg-white rounded-lg border border-gray-300/50 p-4 py-6"
>
  <div class=" flex justify-center">
    <div
      class="w-16 h-16 border border-[#f0f0f0] rounded-2xl overflow-hidden bg-gray-50"
    >
      <img
        class:invisible={!imgLoaded}
        class="w-full h-full object-cover"
        src={photo?.thumbnail?.url}
        alt=""
        on:load={() => (imgLoaded = true)}
      />
    </div>
  </div>
  <div class="h-4" />
  <div>
    <div class=" text-gray-700">
      {`${friend?.firstName || ""} ${friend?.lastName || ""}`}
    </div>
  </div>
  <div>
    <div class=" text-gray-500 text-sm">{`@${friend?.username || ""}`}</div>
  </div>
  <div class=" h-4" />
  <div>
    <button
      on:click={() => onOpenProfile()}
      style=" border-color: transparent; "
      class=" bg-tertiary-5/20 text-tertiary-4 border-tertiary-5 border rounded-md p-1 px-4"
    >
      View profile
    </button>
  </div>
</div>

<!-- Friend Profile -->
<Modal shown={!!personalProfileShown}>
  {#if personalProfileShown}
    <PersonalProfile
      user={friend}
      on:close={() => {
        personalProfileShown = false;
      }}
    />
  {/if}
</Modal>
