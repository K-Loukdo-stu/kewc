<script>
  import { createEventDispatcher, onMount } from "svelte";
  import ProductOptionMultipleChoiceListItem from "./ProductOptionMultipleChoiceListItem.svelte";

  const dispatch = createEventDispatcher();
  export let option;
  export let choices = [];
  export let selectedChoices = [];

  const onSelect = (choice) => {
    const found = selectedChoices.find((ch) => ch.id == choice?.id);
    if (!!found) {
      selectedChoices = selectedChoices.filter((ch) => ch.id != found.id);
    } else if (!!choice) {
      selectedChoices = [...selectedChoices, choice];
    }

    dispatch("change", {
      option: {
        ...option,
        choices: selectedChoices,
      },
    });
  };

  onMount(() => {
    onSelect(null);
  });
</script>

<div>
  <div>{option?.name || "--"}</div>
  <div class=" text-sm text-gray-600">ច្រើនជម្រើស</div>
  <div class="h-2" />
  <div class=" py-1">
    {#each choices as choice}
      <ProductOptionMultipleChoiceListItem
        on:select={(evt) => onSelect(evt.detail.choice)}
        active={!!selectedChoices.find((ch) => ch.id == choice.id)}
        {choice}
      />
    {/each}
  </div>
</div>
