<script>
  import AddCircle from "$components/icons/add_tmp/AddCircle.svelte";
  import Pen from "$components/icons/pen_tmp/Pen.svelte";
  import Trash from "$components/icons/Trash.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { clickOutside } from "$lib/utils/click-outside";
  import {
    deleteProductType,
    updateProductType,
  } from "$providers/actions/kchannel/product";
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { fade } from "svelte/transition";
  const dispatch = createEventDispatcher();

  export let productType;
  export let name;
  export let hasProduct = false;
  export let hasEdit = true;
  let deleteProductTypeState = {
    deleting: false,
    errMsg: "",
  };
  let updateProductTypeState = {
    updating: false,
    errMsg: "",
  };
  let productTypeNameInput;
  let editable = false;

  const onEdit = () => {
    editable = true;
    tick().then(() => {
      productTypeNameInput?.focus();
    });
  };

  const onUpdate = async () => {
    try {
      updateProductTypeState.updating = true;
      const res = await updateProductType.load({
        id: productType.id,
        name: name,
        icon: {},
      });
      const updatedProductType = res.data;

      editable = false;
      dispatch("updated", { productType: updatedProductType });
    } catch (error) {
    } finally {
      updateProductTypeState.updating = false;
    }
  };

  const onReset = () => {
    editable = false;
    name = productType.name;
  };

  const onDelete = async () => {
    try {
      deleteProductTypeState.deleting = true;
      const res = await deleteProductType.load({ id: productType.id });
      const deletedProductType = res.data;
      dispatch("deleted", { productType: deletedProductType });
      onReset();
    } catch (err) {
      deleteProductTypeState.errMsg = err.message;
    } finally {
      deleteProductTypeState.deleting = false;
    }
  };

  $: actionLoading =
    deleteProductTypeState.deleting || updateProductTypeState.updating;
</script>

<div class=" w-full py-1">
  <div
    use:clickOutside
    on:click_outside={() => onReset()}
    class=" flex bg-white p-2 rounded-lg"
  >
    {#if !editable}
      <div in:fade class=" flex-grow relative">
        <div
          class=" absolute inset-0 flex items-center font-semibold text-gray-700 justify-center overflow-hidden"
        >
          <span class="truncate">{productType?.name ?? ""}</span>
        </div>
      </div>
      <div class=" flex-grow-0">
        <button
          class="flex bg-tertiary-3 hover:bg-tertiary-4 p-1 px-1 rounded-full text-white"
          on:click={() => dispatch("createProduct")}
        >
          <div><AddCircle /></div>
          <div class="px-1 pr-2">Product</div>
        </button>
      </div>
      {#if hasEdit}
        <div class="flex-grow-0 px-1">
          <button
            class="flex h-full bg-gray-300 hover:bg-gray-200 px-2 rounded-full text-white items-center"
            on:click={() => onEdit()}
          >
            <div class=" text-gray-600"><Pen w={5} h={5} /></div>
          </button>
        </div>
      {/if}
    {:else}
      <div in:fade class="w-full p-1">
        <div class="bg-red-300 w-full rounded-md">
          <input
            bind:this={productTypeNameInput}
            bind:value={name}
            class="w-full bg-gray-100 outline-none border-none p-2 text-center rounded-md font-semibold text-gray-600 text-lg"
            placeholder="Type name"
            type="text"
          />
        </div>
        <div class="h-2" />
        <div class="flex">
          {#if hasProduct}
            <div class="flex-grow-0">
              <div
                class="flex text-gray-400 text-xs items-center bg-gray-100 rounded-md p-1"
              >
                <div class="px-1 pr-2">
                  <Trash />
                </div>
                <div class=" max-w-[200px]">
                  To delete this type; all products must be removed first
                </div>
              </div>
            </div>
          {:else}
            <button
              disabled={actionLoading}
              on:click={() => onDelete()}
              class=" disabled:bg-gray-200 flex items-center bg-gray-100 hover:bg-gray-200 rounded-md p-1 px-2 text-gray-600"
            >
              {#if deleteProductTypeState.deleting}
                <div class=" p-1 px-3">
                  <SmfbLoading color="gray" />
                </div>
              {:else}
                <div><Trash /></div>
                <div class="w-1" />
                <div>Delete</div>
              {/if}
            </button>
          {/if}
          <div class="flex-grow" />
          <div class=" w-1" />
          <div class="flex-grow-0 flex items-center">
            <button
              disabled={actionLoading}
              on:click={() => onUpdate()}
              class="disabled:bg-gray-200 hover:bg-tertiary-4 bg-tertiary-3 p-[6px] px-4 rounded-lg text-white"
            >
              {#if updateProductTypeState.updating}
                <div class=" p-1 px-3">
                  <SmfbLoading color="gray" />
                </div>
              {:else}
                <div>Done</div>
              {/if}
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
