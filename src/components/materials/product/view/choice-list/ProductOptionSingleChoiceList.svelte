<script>
  import { createEventDispatcher, onMount } from "svelte";
  import ProductOptionSingleChoiceListItem from "./ProductOptionSingleChoiceListItem.svelte";
  const dispatch = createEventDispatcher();
  export let option;
  export let choices = [];
  export let selectedChoice = choices[0];

  const onSelect = (choice) => {
    selectedChoice = choice;
    const cloneOpt = structuredClone(option);
    delete cloneOpt["choices"];
    dispatch("select", {
      option: {
        ...cloneOpt,
        choice,
      },
    });
  };

  onMount(() => {
    onSelect(choices[0]);
  });
</script>

<div>
  <div>{option?.name || "--"}</div>
  <div class=" text-sm text-gray-600">ជ្រើសរើសមួយ</div>
  <div class="h-2" />
  <div class=" py-1">
    {#each choices as choice}
      <ProductOptionSingleChoiceListItem
        on:select={(evt) => onSelect(evt.detail.choice)}
        active={selectedChoice.id == choice.id}
        {choice}
      />
    {/each}
  </div>
</div>
