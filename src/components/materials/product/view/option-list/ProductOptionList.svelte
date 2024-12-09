<script>
  import { createEventDispatcher } from "svelte";
  import ProductOptionListItem from "./ProductOptionListItem.svelte";
  const dispatch = createEventDispatcher();
  export let options = [];
  let orderedOpts = [];

  const onOptionChanged = (evt) => {
    const opt = evt.detail.option;
    const foundIndex = orderedOpts.findIndex(
      (orderedOpt) => orderedOpt?.id == opt.id
    );
    if (foundIndex >= 0) {
      orderedOpts[foundIndex] = opt;
    } else {
      orderedOpts = [...orderedOpts, opt];
    }

    dispatch("update", { options: orderedOpts });
  };
</script>

<div class="">
  {#each options as opt}
    <div class=" w-full">
      <div class=" h-2" />
      <div class="w-full bg-white max-w-md m-auto">
        <div class="px-4">
          <ProductOptionListItem
            on:optionChanged={onOptionChanged}
            option={opt}
            choices={opt.subOptions}
          />
        </div>
      </div>
    </div>
  {/each}
</div>
