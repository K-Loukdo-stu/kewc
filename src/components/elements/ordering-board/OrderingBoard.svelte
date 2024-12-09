<script>
  import HistoryTab from "./tabs/history/index.svelte";
  import WatingTab from "./tabs/waiting/Waiting.svelte";
  import ProcessingTab from "./tabs/processing/index.svelte";
  import DeliveryTab from "./tabs/delivery/index.svelte";
  import OrderboardHeader from "./OrderboardHeader.svelte";
  import FadeTransition from "$components/materials/Transitions/Fade/FadeTransition.svelte";
  import TransitionWrapper from "$components/materials/Transitions/TransitionWrapper.svelte";
  import { chOrderboardTabs } from "./variables.js";

  let selectedTab;
</script>

<div class=" flex flex-col w-full h-full">
  <div class=" flex flex-grow-0">
    <OrderboardHeader
      on:tab={(evt) => {
        const { tab } = evt.detail;
        selectedTab = tab;
      }}
    />
  </div>
  <div class=" relative flex flex-grow bg-gray-100">
    <TransitionWrapper>
      <FadeTransition
        duration={100}
        shown={selectedTab == chOrderboardTabs.WAITING}
      >
        <WatingTab />
      </FadeTransition>
      <FadeTransition
        duration={100}
        shown={selectedTab == chOrderboardTabs.PROCESSING}
      >
        <ProcessingTab />
      </FadeTransition>
      <FadeTransition
        duration={100}
        shown={selectedTab == chOrderboardTabs.DELIVERY}
      >
        <DeliveryTab />
      </FadeTransition>
      <FadeTransition
        duration={100}
        shown={selectedTab == chOrderboardTabs.HISTORY}
      >
        <HistoryTab />
      </FadeTransition>
    </TransitionWrapper>
  </div>
</div>
