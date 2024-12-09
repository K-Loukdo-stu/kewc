<script>
  import OrderIcon from "$components/icons/Ordering/Order.svelte";
  import AcceptIcon from "$components/icons/Ordering/Accept.svelte";
  import RejectIcon from "$components/icons/Ordering/Reject.svelte";
  import LocationIcon from "$components/icons/Ordering/Location.svelte";
  import DoneIcon from "$components/icons/Ordering/Done.svelte";
  import EditIcon from "$components/icons/Ordering/Edit.svelte";
  import ArchiveIcon from "$components/icons/Ordering/Archive.svelte";
  import OrderList from "./OrderingList.svelte";
  import {
    getTimeCompareToCurrent,
    formatNumberOrder,
  } from "$lib/utils/OrderingUtil";
  import {
    loadOrderSummary,
    updateOrderStatus,
  } from "$providers/actions/kchannel/order/order";
  import { orderStatus } from "../variables";
  export let orderingSummary = {};
  export let indexOrder = 0;
  export let status = "";
  const dateInOrder = getTimeCompareToCurrent(orderingSummary?.lastModifyAt);

  const updateStatusOrderState = {
    loading: false,
    loaded: false,
    errMsg: "",
  };

  const updateStatusEvent = async (status) => {
    try {
      updateStatusOrderState.loading = true;
      updateStatusOrderState.loaded = false;
      updateStatusOrderState.errMsg = "";

      const id = orderingSummary?.id;

      await updateOrderStatus.load({
        id: id,
        status: status,
      });
      updateStatusOrderState.loaded = true;
    } catch (error) {
      updateStatusOrderState.errMsg = error.message;
    } finally {
      updateStatusOrderState.loading = false;
    }
  };

  const acceptOrder = async () => {
    updateStatusEvent(orderStatus.INPROCESSING);
  };

  const doneOrder = async () => {
    updateStatusEvent(orderStatus.DONE);
  };

  const rejectButton = async () => {
    updateStatusEvent(orderStatus.INPROCESSING);
  };

  const archiveEvent = async () => {
    updateStatusEvent(orderStatus.ARCHIVE);
  };
</script>

<div class="p- m-1 flex-start max-w-5xl flex justify-center">
  <div class="rounded-md bg-white flex flex-col border w-[94%] p-2 m-2">
    <div class=" h-[80px] w-full">
      <div class="relative flex flex-grow h-full w-full items-center">
        <div class="flex">
          <div class="h-14 w-14">
            <img
              class="h-full w-full object-cover rounded-full bg-gray-300"
              src={orderingSummary?.photo?.thumbnail?.url}
              alt=""
            />
            <!-- <div>{orderingSummary?.photo?.thumbnail?.url}</div> -->
          </div>
          <div class="w-25 h-full px-2 flex-col">
            <div class="text-xl font-semibold">
              {orderingSummary.user.firstName}
              {orderingSummary.user.lastName}
            </div>
            <div class="text-xs">{dateInOrder}</div>
          </div>
        </div>
        {#if status !== orderStatus.DONE}
          <div class="absolute right-2">
            <div
              class="flex bg-[#21C49D] items-center w-24 justify-center rounded-l p-1"
            >
              <div class="w-5 h-full mr-4">
                <OrderIcon />
              </div>
              <div class="font-bold text-white">
                {formatNumberOrder(indexOrder)}
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
    <div class=" h-auto p-2 border-solid border-2 border-indigo-600 rounded-xl">
      <OrderList orderLines={orderingSummary?.orderLines}></OrderList>

      <div class="mt-1 mb-2 relative w-full h-8">
        <div class="absolute left-2">Total price</div>
        <div class="absolute right-2 text-sm font-semibold">7.75$</div>
      </div>
    </div>
    <!-- <div class="h-auto w-full flex p-2 mb-2 items-center">
        <div class="w-8 h-8 ml-2 mr-4"><LocationIcon /></div>
        <div class="flex-grow w-12">
          No. 195, St. 2002, Borey Kammkor Village, Sangkat Teokthla, Khan Sen
          Sok, Phnom Penh, 12102
        </div>
      </div> -->

    {#if status == orderStatus.INORDER}
      <div class=" h-[48px] w-full flex flex-row-reverse mt-4">
        <button
          on:click={() => acceptOrder()}
          class=" ml-4 disabled:bg-gray-400 flex items-center border-2 justify-center h-10 w-26 rounded-md p-2 text-tertiary-3 active:text-tertiary-2"
        >
          <AcceptIcon />
          <span class="ml-1">Accept</span>
        </button>
        <button
          on:click={() => rejectButton()}
          class="  disabled:bg-gray-400 flex items-center border-2 justify-center h-10 w-26 rounded-md p-2 text-red-600 active:text-red-500"
        >
          <RejectIcon />
          <span class="ml-1">Reject</span>
        </button>

        <!-- <div class=" font-extrabold text-xl text-gray-600">button 2</div>
          <div class=" font-extrabold text-xl text-gray-600">button 1</div> -->
      </div>
    {:else if status == orderStatus.INPROCESSING}
      <div class=" h-[48px] w-full flex flex-row-reverse mt-4">
        <button
          on:click={() => doneOrder()}
          class=" ml-4 disabled:bg-gray-400 flex items-center border-2 justify-center h-10 w-26 bg-tertiary-3 rounded-md p-2 text-tertiary-3 active:text-tertiary-2"
        >
          <DoneIcon />
          <span class="ml-1 text-white">Done</span>
        </button>
      </div>
    {:else if status == orderStatus.DONE}
      <div class=" h-[48px] w-full flex flex-row-reverse mt-4">
        <button
          on:click={() => archiveEvent()}
          class="px-3 ml-4 disabled:bg-gray-400 flex items-center border-2 justify-center h-10 w-26 rounded-md p-2 text-[#696969] active:text-tertiary-2"
        >
          <ArchiveIcon />
          <span class="ml-1">Archive</span>
        </button>
        <!-- <button
          on:click={() => doneOrder()}
          class="px-3 ml-4 disabled:bg-gray-400 flex items-center border-2 justify-center h-10 w-26 rounded-md p-2 text-[#696969] active:text-tertiary-2"
        >
          <EditIcon />
          <span class="ml-1">Edit</span>
        </button> -->
      </div>
    {/if}
  </div>
</div>
