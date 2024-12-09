<script>
  import { goto } from "$app/navigation";
  import { chHeaderMenuTypes } from "$components/elements/channel/channel-header/variables";
  import { onMount } from "svelte";
  import ChannelMenuButton from "./ChannelMenuButton.svelte";
  let selectedType = chHeaderMenuTypes.PRODUCT;
  const onSelect = (type) => {
    selectedType = type;
    goto(type);
  };

  onMount(() => {
    // onSelect(selectedType);
  });
</script>

<div class=" flex text-center text-gray-700">
  <ChannelMenuButton
    type={chHeaderMenuTypes.HOME}
    {selectedType}
    on:select={() => onSelect(chHeaderMenuTypes.HOME)}
    title="Home"
  />
  <ChannelMenuButton
    type={chHeaderMenuTypes.NEWSFEED}
    {selectedType}
    on:select={() => onSelect(chHeaderMenuTypes.NEWSFEED)}
    title="Newsfeed"
  />
  <ChannelMenuButton
    type={chHeaderMenuTypes.PRODUCT}
    {selectedType}
    on:select={() => onSelect(chHeaderMenuTypes.PRODUCT)}
    title="Product"
  />
  <ChannelMenuButton
    type={chHeaderMenuTypes.ABOUT}
    {selectedType}
    on:select={() => onSelect(chHeaderMenuTypes.ABOUT)}
    title="About"
  />
</div>
