<script>
  import Add from "$components/icons/add_tmp/Add.svelte";
  import Pen from "$components/icons/pen_tmp/Pen.svelte";
  import Trash from "$components/icons/Trash.svelte";
  import { createEventDispatcher, tick } from "svelte";
  import SmfbLoading from "../spinners/fbLoading/SMFBLoading.svelte";
  import { fade } from "svelte/transition";
  import {
    deleteProductSubOption,
    updateProductSubOption,
  } from "$providers/actions/kchannel/product";
  import { Currency } from "$components/elements/product/variable";
  const dispatch = createEventDispatcher();

  export let choice;
  export let price;
  export let name;
  export let currency;
  export let isInEditionMode = false;

  let nameInputEle;
  let editable = false;
  let deleteSubOptState = {
    errMsg: "",
    deleting: false,
  };
  let updateSubOptState = {
    errMsg: "",
    updating: false,
  };

  const onUpdateProductSubOpt = async () => {
    try {
      updateSubOptState.updating = true;
      const res = await updateProductSubOption.load({
        id: choice.id,
        name,
        price,
        currency,
      });
      const updatedOption = res.data;
      dispatch("updated", { choice: updatedOption });

      editable = false;
      onEndEditing();
    } catch (err) {
      // to do
      console.log(err);
    } finally {
      updateSubOptState.updating = false;
    }
  };

  const onDeleteSubOpt = async () => {
    try {
      deleteSubOptState.deleting = true;
      const res = await deleteProductSubOption.load({ id: choice.id });
      const option = res.data;
      dispatch("removed", { choice: option });
      onEndEditing();
    } catch (err) {
      // to do
    } finally {
      deleteSubOptState.deleting = false;
    }
  };

  const onEdit = () => {
    editable = true;
    dispatch("edit", { choice });
    tick().then(() => {
      nameInputEle?.focus();
    });
  };

  const onEndEditing = () => {
    dispatch("endEditing", { choice });
  };
</script>

<div class="flex bg-white p-2 shadow-sm rounded-lg">
  {#if !editable}
    <div in:fade class="flex flex-grow">
      <div class=" basis-1/2 truncate">{name}</div>
      <div class=" basis-1/2 truncate font-semibold">
        +{price}{Currency[currency].symbol}
      </div>
    </div>
    <div class="flex px-2">
      <div>
        <button
          class=" disabled:text-gray-200"
          disabled={isInEditionMode}
          on:click={onDeleteSubOpt}
        >
          {#if deleteSubOptState.deleting}
            <SmfbLoading color="gray" />
          {:else}
            <Trash />
          {/if}
        </button>
      </div>
      <div class="w-3" />
      <div>
        <button
          class=" disabled:text-gray-200"
          disabled={isInEditionMode}
          on:click={onEdit}><Pen w={5} h={5} /></button
        >
      </div>
    </div>
  {:else}
    <div in:fade class=" w-full">
      <div class=" w-full">
        <input
          required
          placeholder="Name"
          bind:this={nameInputEle}
          bind:value={name}
          class="rounded-md p-3 w-full bg-gray-100 text-gray-600"
          type="text"
        />
      </div>
      <div class="flex py-2">
        <div class="flex items-center px-2">
          <Add w={5} h={5} />
        </div>
        <div class="flex bg-gray-300 rounded-lg overflow-hidden">
          <div>
            <input
              required
              placeholder="Price"
              bind:value={price}
              class="rounded-md p-3 max-w-[156px] w-full bg-gray-100 text-gray-600"
              type="number"
              min="0"
              step="0.01"
            />
          </div>
          <div class="flex items-center px-4">{Currency[currency].symbol}</div>
        </div>
        <div class=" flex-grow" />
        <div class="flex items-end">
          {#if updateSubOptState.updating}
            <div class="py-2 px-4"><SmfbLoading color="gray" /></div>
          {:else}
            <button
              on:click={() => onUpdateProductSubOpt()}
              class=" bg-tertiary-3 text-white h-10 px-4 rounded-lg"
              >Done</button
            >
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>
