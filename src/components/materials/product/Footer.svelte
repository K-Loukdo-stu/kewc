<script>
  import { createProductSteps } from "$components/elements/product/variable";

  export let step = createProductSteps.CREATE;
</script>

<div class=" flex w-full text-center py-1 bg-slate-50 border-t border-gray-50">
  <div class=" basis-1/2">
    <div class="px-4 pr-2">
      <div
        class=" h-[2px] rounded-full {step == createProductSteps.CREATE
          ? 'bg-primary'
          : 'bg-gray-300'}"
      />
    </div>
    <div
      class="text-sm {step == createProductSteps.CREATE
        ? 'text-primary'
        : 'text-gray-300'}"
    >
      Create
    </div>
  </div>
  <div class=" basis-1/2">
    <div class=" basis-1/2">
      <div class="px-4 pl-2">
        <div
          class=" h-[2px] rounded-full {step ==
          createProductSteps.ADDITIONAL_OPTIONS
            ? 'bg-primary'
            : 'bg-gray-300'}"
        />
      </div>
      <div
        class="text-sm {step == createProductSteps.ADDITIONAL_OPTIONS
          ? 'text-primary'
          : 'text-gray-300'}"
      >
        Additional options
      </div>
    </div>
  </div>
</div>
