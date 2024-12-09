<script>
  import ProductOptionQuantityChoiceListItem from "./ProductOptionQuantityChoiceListItem.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let option;
  export let choices = [];
  export let selectedChoice = choices[0];

  const onSetQuantity = (choice, qty) => {
    selectedChoice = choice;
    const index = choices.findIndex((ch) => ch.id == choice.id);
    if (index >= 0) {
      const chosenChoice = choices[index];
      choices[index] = {
        ...chosenChoice,
        quantity: qty,
      };

      dispatch("change", { option: { ...option, choices } });
    }
  };
</script>

<div>
  <div>{option?.name || "--"}</div>
  <div class=" text-sm text-gray-600">ជ្រើសដោយចំនួន</div>
  <div class="h-2" />
  <div class=" py-1">
    {#each choices as choice}
      <ProductOptionQuantityChoiceListItem
        on:setQty={(evt) => {
          onSetQuantity(choice, evt.detail.quantiy);
        }}
        active={selectedChoice.id == choice.id}
        {choice}
      />
    {/each}
  </div>
</div>
