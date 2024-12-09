<script>
  import { goto } from "$app/navigation";
  import ChannelSearchBox from "$components/elements/dashboard/channel/ChannelSearchBox.svelte";
</script>

<div class=" w-full h-full overflow-y-auto">
  <div class="w-full">
    <ChannelSearchBox
      on:select={(evt) => {
        goto(`/dashboard/kchannel/profile/as-admin/${evt.detail.channel.id}`);
      }}
    />
  </div>
  <div class=" w-full">
    <slot />
  </div>
</div>
