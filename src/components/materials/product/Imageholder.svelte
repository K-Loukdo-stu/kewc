<script>
  import AddCircle from "$components/icons/add_tmp/AddCircle.svelte";
  import { EwcEvents } from "$lib/ewc-dispatch/events";
  import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  export let width = 192;
  export let height = 192;
  export let isRequiring = false;
  export let imgUrl;
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
      key: EwcEvents.lis.createProduct.ON_PARSE_BASE64,
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
        key: EwcEvents.pub.createProduct.ON_BROWSE_FILE,
        data: {},
      });
    }
  }}
  class="flex justify-center items-center rounded-lg bg-gray-100 hover:bg-gray-200 outline-dashed
  {isRequiring ? 'outline-yellow-500' : 'outline-gray-100'}
  "
  style="height: {height}px; width: {width}px"
>
  {#if avatar || imgUrl}
    <div class=" w-full h-full p-[2px]">
      <img
        class:hidden={!imgLoaded}
        class=" w-full h-full rounded-lg object-cover"
        src={avatar || imgUrl}
        alt="d"
        on:load={() => (imgLoaded = true)}
      />
    </div>
  {:else}
    <div class="text-gray-400">
      <div class=" flex justify-center"><AddCircle size={32} /></div>
      {#if !isRequiring}
        <div>Image</div>
      {:else}
        <div class=" text-yellow-500">Image is required</div>
      {/if}
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
