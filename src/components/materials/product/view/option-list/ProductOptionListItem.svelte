<script>
  import { choiceSelectorTypes } from "$components/elements/product/variable";
  import { createEventDispatcher } from "svelte";
  import ProductOptionMultipleChoiceList from "../choice-list/ProductOptionMultipleChoiceList.svelte";
  import ProductOptionQuantityChoiceList from "../choice-list/ProductOptionQuantityChoiceList.svelte";
  import ProductOptionSingleChoiceList from "../choice-list/ProductOptionSingleChoiceList.svelte";
  const dispatch = createEventDispatcher();
  export let option;
  export let choices = [];

  const onOptionChanged = (option) => {
    dispatch("optionChanged", { option });
  };
</script>

{#if choices?.length}
  <div class=" py-2">
    {#if option.type == choiceSelectorTypes.SINGLE.type}
      <ProductOptionSingleChoiceList
        {option}
        {choices}
        on:select={(evt) => onOptionChanged(evt.detail.option)}
      />
    {:else if option.type == choiceSelectorTypes.MULTIPLE.type}
      <ProductOptionMultipleChoiceList
        {option}
        {choices}
        on:change={(evt) => onOptionChanged(evt.detail.option)}
      />
    {:else if option.type == choiceSelectorTypes.QUANTITY.type}
      <ProductOptionQuantityChoiceList
        {option}
        {choices}
        on:change={(evt) => onOptionChanged(evt.detail.option)}
      />
    {:else}
      <div class=" text-gray-500 py-2 text-sm">Choice type is not defined</div>
    {/if}
  </div>
{:else}
  <div class="py-2">
    <div>{option?.name || "--"}</div>
    <div class="h-1" />
    <div class=" text-sm text-gray-600 py-2">No choice</div>
  </div>
{/if}
