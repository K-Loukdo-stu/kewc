<script>
  import Pen from "$components/icons/pen_tmp/Pen.svelte";
  import Trash from "$components/icons/Trash.svelte";
  import { createEventDispatcher, tick } from "svelte";
  import { fade } from "svelte/transition";
  import OptionTypeSelector from "./OptionTypeSelector.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import ChoiceItem from "./ChoiceItem.svelte";
  import AddChoiceButton from "./AddChoiceButton.svelte";
  import { choiceSelectorTypes } from "$components/elements/product/variable";
  import {
    createProductSubOption,
    deleteProductOption,
    updateProductOption,
  } from "$providers/actions/kchannel/product";
  import { flip } from "svelte/animate";
  const dispatch = createEventDispatcher();

  export let option;
  export let currency;
  export let name;
  export let type;
  export let isInEditionMode = false;
  export let subOptions = [];

  let choices = subOptions?.length ? subOptions : [];
  let optNameInputEle;
  let selectedType = choiceSelectorTypes[type];
  let editable = false;
  let deleteProductOptState = {
    errMsg: "",
    deleting: false,
  };
  let updateProductOptState = {
    errMsg: "",
    updating: false,
  };
  let addProductSubOptState = {
    errMsg: "",
    adding: false,
  };

  const onDeleteProductOpt = async ({ optId }) => {
    try {
      deleteProductOptState.deleting = true;
      const res = await deleteProductOption.load({ id: optId });
      const option = res.data;
      dispatch("removed", { option: option });
      onEndEditing();
    } catch (err) {
      // to do
    } finally {
      deleteProductOptState.deleting = false;
    }
  };

  const onUpdateProductOpt = async () => {
    try {
      updateProductOptState.updating = true;
      const res = await updateProductOption.load({
        id: option.id,
        name,
        type: selectedType.type,
      });
      editable = false;
      const updatedOption = res.data;
      dispatch("updated", { option: updatedOption });
      onEndEditing();
    } catch (err) {
      // to do
      console.log(err);
    } finally {
      updateProductOptState.updating = false;
    }
  };

  const onAddSubOption = async () => {
    try {
      addProductSubOptState.adding = true;
      addProductSubOptState.load = false;
      const res = await createProductSubOption.load({
        name: "Choice",
        price: 0,
        option: option.id,
        currency: currency,
        product: option.product,
      });
      const newSubPrice = res.data;
      choices = [...choices, newSubPrice];

      scrollToEle({ id: `sub-opt-${newSubPrice["id"]}` });
    } catch (err) {
      addProductSubOptState.errMsg = err.message;
      console.log(err);
    } finally {
      addProductSubOptState.adding = false;
    }
  };

  const onEdit = () => {
    editable = true;
    dispatch("edit", { option });
    tick().then(() => {
      optNameInputEle.focus();
    });
  };

  const onEndEditing = () => {
    dispatch("endEditing", {
      option,
    });
  };

  const scrollToEle = ({ id }) => {
    setTimeout(() => {
      tick().then(() => {
        const ele = document.getElementById(id);
        ele?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }, 200);
  };
</script>

<div class="w-full p-2 bg-gray-100 rounded-xl text-gray-500">
  <form on:submit|preventDefault={onUpdateProductOpt}>
    <div class=" p-3 pb-0 rounded-lg {editable ? 'bg-white shadow-sm' : ''}">
      <div class="flex items-center">
        <div class=" flex flex-grow items-center">
          <div class=" flex-grow">
            {#if editable}
              <div>
                <input
                  maxlength="20"
                  required
                  placeholder="Name"
                  bind:this={optNameInputEle}
                  bind:value={name}
                  class="rounded-md p-3 max-w-[192px] bg-gray-100 text-gray-600"
                  type="text"
                />
              </div>
            {:else}
              <div>
                <div>
                  <span class=" font-bold">{name == "" ? "Unknown" : name}</span
                  >
                </div>
                <div><span class=" text-sm">{type || ""}</span></div>
              </div>
            {/if}
          </div>
          <div class="w-5" />
        </div>
        {#if !editable}
          <div class="">
            <button
              disabled={isInEditionMode}
              class=" cursor-pointer disabled:text-gray-300"
              on:click={onEdit}
            >
              <Pen w={5} h={5} />
            </button>
          </div>
        {:else}
          <button
            on:click={() => {
              onDeleteProductOpt({ optId: option.id });
            }}
            in:fade={{ delay: 500 }}
            class=""
          >
            <div class="text-gray-500 hover:text-gray-600 cursor-pointer">
              {#if deleteProductOptState.deleting}
                <SmfbLoading color="gray" />
              {:else}
                <Trash />
              {/if}
            </div>
          </button>
        {/if}
      </div>
      {#if editable}
        <div class="p-1 pt-3">
          <OptionTypeSelector
            index={selectedType?.index || choiceSelectorTypes.SINGLE.index}
            on:select={(evt) => {
              selectedType = evt.detail;
              type = selectedType.type;
            }}
          />
        </div>
      {/if}
      <!-- Edit buttons -->
      {#if editable}
        <div in:fade class=" flex items-center py-3">
          <div>
            <button
              on:click={() => {
                editable = false;
                dispatch("cancel");
                onEndEditing();
              }}
              class="bg-gray-200 py-2 px-3 rounded-md cursor-pointer"
              disabled={updateProductOptState.updating}
            >
              Cancel
            </button>
          </div>
          <div class="flex-grow" />
          <div>
            {#if updateProductOptState.updating}
              <div class="py-2 px-4"><SmfbLoading color="gray" /></div>
            {:else}
              <button
                type="submit"
                class=" bg-tertiary-3 disabled:bg-gray-200 text-white py-2 px-4 rounded-md cursor-pointer"
              >
                Save
              </button>
            {/if}
          </div>
        </div>
      {/if}
    </div>
    <div class=" py-2">
      {#if choices?.length}
        {#each choices as choice (choice.id)}
          <div
            animate:flip={{ duration: 200 }}
            id={`sub-opt-${choice.id}`}
            in:fade
            class=" py-1"
          >
            <ChoiceItem
              bind:choice
              bind:isInEditionMode
              on:done={() => {}}
              on:edit={() => {
                isInEditionMode = true;
              }}
              on:removed={(evt) => {
                const choice = evt.detail.choice;
                choices = choices.filter((c) => c.id != choice.id);
              }}
              on:endEditing={() => (isInEditionMode = false)}
              name={choice.name}
              price={choice.price}
              bind:currency
            />
          </div>
        {/each}
      {/if}
    </div>
    <AddChoiceButton
      bind:isDisabled={isInEditionMode}
      bind:loading={addProductSubOptState.adding}
      on:click={() => {
        onAddSubOption();
      }}
    />
  </form>
</div>
