<script>
  import OrderboardHeaderMenuItem from "$components/materials/ordering-board/orderboard-header-menu-item/OrderboardHeaderMenuItem.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { chOrderboardTabs } from "./variables.js";
  import ComeIn from "$components/icons/ordering-board/come-in/ComeIn.svelte";
  import Processing from "$components/icons/ordering-board/processing/Processing.svelte";
  import History from "$components/icons/ordering-board/history/History.svelte";
  // import Delivery from "$components/icons/ordering-board/Delivery/Delivery.svelte";

  const dispatch = createEventDispatcher();

  let selectedTab;

  const onSelectTab = (tab) => {
    selectedTab = tab;
    dispatch("tab", { tab });
  };

  onMount(() => {
    onSelectTab(chOrderboardTabs.WAITING);
  });
</script>

<div class=" w-full bg-white pt-1">
  <div class="flex w-full h-[52px]">
    <div class=" relative h-full flex flex-grow">
      <div class=" absolute left-3 bottom-1 flex items-center">
        <div class=" font-extrabold text-3xl text-gray-600">Order</div>
      </div>
    </div>
    <div class=" h-full flex flex-grow-0">
      <div class=" flex space-x-1 pr-1">
        <OrderboardHeaderMenuItem
          active={chOrderboardTabs.WAITING == selectedTab}
          on:click={() => onSelectTab(chOrderboardTabs.WAITING)}
          title="Waiting"
        >
          <ComeIn />
        </OrderboardHeaderMenuItem>
        <OrderboardHeaderMenuItem
          active={chOrderboardTabs.PROCESSING == selectedTab}
          on:click={() => onSelectTab(chOrderboardTabs.PROCESSING)}
          title="Processing"
        >
          <Processing />
        </OrderboardHeaderMenuItem>
        <!-- <OrderboardHeaderMenuItem
          active={chOrderboardTab.DELIVERY == selectedTab}
          on:click={() => onSelectTab(chOrderboardTab.DELIVERY)}
          title="Delivery"
        >
          <Delivery />
        </OrderboardHeaderMenuItem> -->
        <OrderboardHeaderMenuItem
          active={chOrderboardTabs.HISTORY == selectedTab}
          on:click={() => onSelectTab(chOrderboardTabs.HISTORY)}
          title="History"
        >
          <History />
        </OrderboardHeaderMenuItem>
      </div>
    </div>
  </div>
</div>
