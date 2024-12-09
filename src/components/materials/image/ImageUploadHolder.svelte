<script>
  import AddCircle from "$components/icons/add_tmp/AddCircle.svelte";
  import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  export let isRequiring = false;
  export let imgUrl;
  export let ewcKeySuffix = "";
  let imgLoaded = false;
  let avatar, fileinput;
  const ewcDispatch = new EwcDispatch();

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    if (!image) return;

    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      avatar = e.target.result;
      dispatch("choose", { base64: avatar, file: image });
    };
  };

  onMount(() => {
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen({ key: "on-page-reload" });
    ewcDispatch.listen({
      key: `on-parse-base64${ewcKeySuffix ? `-${ewcKeySuffix}` : ""}`,
      cb: (data) => {
        if (data?.data) {
          const base64 = data.data;
          const file = {
            id: Date.now(),
            name: "Unknown",
            size: 0,
          };
          avatar = base64;
          dispatch("choose", { base64, file });
        }
      },
    });
  });
</script>

<button
  type="button"
  on:click={() => {
    if (!ewcDispatch.isFlutterEwc()) {
      fileinput.click();
    } else {
      ewcDispatch.publish({
        key: `on-browse-file${ewcKeySuffix ? `-${ewcKeySuffix}` : ""}`,
        data: {},
      });
    }
  }}
  class=" w-full h-full flex justify-center items-center bg-gray-100 hover:bg-gray-200 outline-dashed
  {isRequiring ? 'outline-yellow-500' : 'outline-gray-100'}
  "
>
  {#if avatar || imgUrl}
    <div class=" w-full h-full">
      <img
        class:hidden={!imgLoaded}
        class=" w-full h-full object-cover"
        src={avatar || imgUrl}
        alt="d"
        on:load={() => (imgLoaded = true)}
      />
    </div>
  {:else}
    <div class="text-gray-400">
      <div class=" flex justify-center"><AddCircle size={32} /></div>
    </div>
  {/if}
  <input
    style="display:none"
    type="file"
    accept=".jpg, .jpeg, .png"
    on:change={(e) => onFileSelected(e)}
    bind:this={fileinput}
  />
</button>
