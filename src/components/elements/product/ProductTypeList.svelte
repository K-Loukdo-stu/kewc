<script>
  import AddCircle from "$components/icons/add_tmp/AddCircle.svelte";
  import ArrowLeft from "$components/icons/arrow_tmp/ArrowLeft.svelte";
  import ArrowRight from "$components/icons/arrow_tmp/ArrowRight.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { getProductTypesByChannel } from "$providers/actions/kchannel/product";
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { createProductType } from "$providers/actions/kchannel/product";

  const dispatch = createEventDispatcher();

  export let height;
  export let channelId;
  export let defaultProductTypeId;
  export let selectedProductType;
  export let editMode = true;
  let scrollableEle;
  let scrollableEleLeftClipped = false;
  let scrollableEleRightClipped = false;
  const scrollSensitivity = 15;
  const moveSensitivity = 50;
  let productTypes = [];
  let productTypesState = {
    loading: false,
    loaded: false,
  };

  let createProductTypeState = {
    creating: false,
    errMsg: "",
  };

  const onClickProductType = (type) => {
    selectedProductType = type;
    dispatch("select", { type });

    scrollToEle({ id: `product-type-${type?.id}` });
  };

  const onLoadProcutTypes = async () => {
    try {
      productTypesState.loading = true;
      productTypesState.loaded = false;

      const res = await getProductTypesByChannel.load({ channel: channelId });
      productTypes = [...res.data];

      // select default product type
      productTypes = [
        { id: "", name: "All", channel: channelId },
        ...productTypes,
      ];

      if (defaultProductTypeId) {
        const defaultType = productTypes.find(
          (pt) => pt.id == defaultProductTypeId,
        );
        if (defaultType) {
          onClickProductType(defaultType);
        }else{
          onClickProductType(productTypes[0]);
        }
      } else {
        onClickProductType(productTypes[0]);
      }

      productTypesState.loaded = true;
    } catch (err) {
      console.log(err);
    } finally {
      productTypesState.loading = false;
    }
  };

  const onCreateProductType = async ({ channelId }) => {
    const generateTypeName = (count = 1) => {
      const prefix = "New type";
      const i = productTypes.findIndex((pt) => pt.name == `${prefix} ${count}`);
      if (i > 0) return generateTypeName(++count);
      return `${prefix} ${count}`;
    };

    try {
      createProductTypeState.creating = true;
      const newName = generateTypeName();
      const res = await createProductType.load({
        name: newName,
        icon: {},
        channel: channelId,
      });
      const createdProductType = res.data;
      productTypes = [...productTypes, createdProductType];
      scrollToEle({ id: `product-type-${createdProductType?.id}` });
      onClickProductType(createdProductType);
      dispatch("productTypeCreated", { productType: createdProductType });
    } catch (err) {
      console.log(err);
    } finally {
      createProductTypeState.creating = false;
    }
  };

  const onRemoveProductType = (type) => {
    const pre = [...productTypes];
    productTypes = productTypes.filter((pt) => pt.id != type.id);
    if (pre.length != productTypes.length) {
      onClickProductType(productTypes[0]);
    }
  };

  const onUpdateProductType = (type) => {
    const index = productTypes.findIndex((pt) => pt.id == type.id);
    if (index !== -1) {
      productTypes[index] = { ...type };
      onClickProductType(type);
    }
  };

  onMount(() => {
    dispatch("setup", { onRemoveProductType, onUpdateProductType });

    onLoadProcutTypes();

    scrollableEle.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      if (evt.deltaX !== 0) {
        scrollableEle.scrollLeft += evt.deltaX;
      } else {
        var direction = evt.deltaY > 0 ? 1 : -1;
        scrollableEle.scrollLeft += direction * scrollSensitivity;
      }
    });

    tick().then(() => checkScrollClip());
  });

  const checkScrollClip = () => {
    if (!scrollableEle) return;
    const { width } = scrollableEle.getBoundingClientRect();
    scrollableEleLeftClipped = scrollableEle.scrollLeft > 0;
    scrollableEleRightClipped =
      scrollableEle.scrollLeft + width + 2 < scrollableEle.scrollWidth;
  };

  let t;
  const scrollToEle = ({ id }) => {
    clearTimeout(t);
    t = setTimeout(() => {
      tick().then(() => {
        const ele = document.getElementById(id);
        ele?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      });
    }, 200);
  };
</script>

<div bind:clientHeight={height} class="w-full">
  <div class=" flex w-full bg-white p-1 shadow-sm">
    <div class=" flex flex-grow rounded-md border">
      <button
        on:click={() => {
          scrollableEle.scrollTo({
            left: scrollableEle.scrollLeft - moveSensitivity * 2,
            behavior: "smooth",
          });
        }}
        class=" bg-white flex items-center cursor-pointer text-gray-600 hover:text-black hover:bg-gray-200 px-1 py-2 rounded-l-md
        {scrollableEleLeftClipped ? 'right-border text-gray-100' : ''}"
      >
        <ArrowLeft />
      </button>
      <div class="relative flex-grow">
        <div
          bind:this={scrollableEle}
          on:scroll={(evt) => checkScrollClip()}
          class="flex w-full absolute inset-0 overflow-x-scroll"
        >
          {#if productTypes.length}
            {#each productTypes as type}
              <div
                id={`product-type-${type?.id}`}
                class="  h-full px-[2px] py-[6px]"
              >
                <div
                  on:click={() => onClickProductType(type)}
                  class=" max-w-[150px] px-4 h-full flex items-center rounded-full cursor-pointer {selectedProductType?.id ==
                  type.id
                    ? 'bg-tertiary-2/20 text-tertiary-2'
                    : 'text-gray-700 hover:bg-gray-100'}"
                >
                  <div class="overflow-hidden">
                    <span class="truncate"> {type.name}</span>
                  </div>
                </div>
              </div>
            {/each}
          {/if}

          {#if productTypesState.loading}
            <div class="flex items-center px-2">
              <SmfbLoading color="gray" />
            </div>
          {/if}
        </div>
      </div>
      <button
        on:click={() => {
          scrollableEle.scrollTo({
            left: scrollableEle.scrollLeft + moveSensitivity * 2,
            behavior: "smooth",
          });
        }}
        class="bg-white flex items-center cursor-pointer text-gray-600 hover:text-black hover:bg-gray-200 px-1 py-2 rounded-r-md
        {scrollableEleRightClipped ? 'left-border' : ''}"
      >
        <ArrowRight />
      </button>
    </div>
    {#if editMode}
      <div class=" flex-grow-0 flex items-center px-2 pl-3">
        <button
          disabled={createProductTypeState.creating}
          class=" bg-tertiary-3 hover:bg-tertiary text-white rounded-full disabled:bg-gray-300"
          on:click={() => {
            onCreateProductType({ channelId });
          }}
        >
          <div class=" flex items-center p-[3px] px-1">
            {#if createProductTypeState.creating}
              <div class="p-1 px-2">
                <SmfbLoading color="gray" />
              </div>
            {:else}
              <div><AddCircle /></div>
              <div class="px-1 text-sm">Type</div>
            {/if}
          </div>
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .right-border {
    border-right: 1px solid rgb(230, 229, 229);
  }
  .left-border {
    border-left: 1px solid rgb(230, 229, 229);
  }
</style>
