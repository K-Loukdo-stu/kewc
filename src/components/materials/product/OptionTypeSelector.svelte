<script>
  import { choiceSelectorTypes } from "$components/elements/product/variable";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let index = choiceSelectorTypes.SINGLE.index;

  const onSelect = (index) => {
    if (index == choiceSelectorTypes.MULTIPLE.index) {
      dispatch("select", choiceSelectorTypes.MULTIPLE);
    } else if (index == choiceSelectorTypes.QUANTITY.index) {
      dispatch("select", choiceSelectorTypes.QUANTITY);
    } else {
      dispatch("select", choiceSelectorTypes.SINGLE);
    }
  };
</script>

<div class="flex text-center bg-gray-200 rounded-lg overflow-hidden">
  <div
    class=" basis-1/3 {index == choiceSelectorTypes.SINGLE.index
      ? ' bg-tertiary-3 text-white'
      : ''}"
  >
    <label class="text-sm">
      <div class="py-2 cursor-pointer">
        <input
          hidden
          type="radio"
          bind:group={index}
          name="opt-type"
          value={1}
          on:change={() => onSelect(1)}
        />
        Single
      </div>
    </label>
  </div>
  <div
    class=" basis-1/3 {index == choiceSelectorTypes.MULTIPLE.index
      ? ' bg-tertiary-3 text-white'
      : ''}"
  >
    <label class="text-sm">
      <div class="py-2 cursor-pointer">
        <input
          hidden
          type="radio"
          bind:group={index}
          name="opt-type"
          value={2}
          on:change={() => onSelect(2)}
        />
        Multiple
      </div>
    </label>
  </div>
  <div
    class=" basis-1/3 {index == choiceSelectorTypes.QUANTITY.index
      ? ' bg-tertiary-3 text-white'
      : ''}"
  >
    <label class="text-sm">
      <div class="py-2 cursor-pointer">
        <input
          hidden
          type="radio"
          bind:group={index}
          name="opt-type"
          value={3}
          on:change={() => onSelect(3)}
        />
        Quantity
      </div>
    </label>
  </div>
</div>
