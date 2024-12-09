<!-- <script src="https://unpkg.com/html5-qrcode"></script> -->
<script>
  import { page } from "$app/stores";
  import ProductSection from "$components/elements/channel/home-page/recent-post-list-section/ProductSection.svelte";
  import RecentPostListSection from "$components/elements/channel/home-page/recent-post-list-section/RecentPostListSection.svelte";
  import ChevronRight from "$components/icons/chevron_tmp/ChevronRight.svelte";
  import Info from "$components/icons/info/Info.svelte";
  import MapPin from "$components/icons/map/MapPin.svelte";
  import Link from "$components/icons/Media/Link/Link.svelte";
  import Qrcode from "$components/icons/qrcode/qrcode.svelte";
  import ShareBox from "$components/icons/share_tmp/ShareBox.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { EwcEvents } from "$lib/ewc-dispatch/events";
  import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
  import { APIs } from "$lib/statics/apis";
  import { getChannel } from "$providers/actions/kchannel/channel";
  import { getChannelExtensions } from "$providers/actions/kchannel/extension";
  import { afterUpdate, onMount } from "svelte";
  import { QRCodeImage } from "svelte-qrcode-image";
  import { fade } from "svelte/transition";

  let channelId = $page["params"]["cid"];
  const ewcDispatch = new EwcDispatch();

  let contentHeight = 0;
  let wrapperEle;
  let mapImgeLoaded = false;
  let channelUrlCopied = false;
  let channelQRcodeImgCopied = false;
  let qrCodeImageWrapperEle;
  let QRCodeImageEle;
  let qrcodeRendered = false;

  const loadChanneLState = {
    channel: null,
    loading: false,
    errMsg: "",
    loaded: false,
  };

  const loadChannelExtensionState = {
    extensions: [],
    loading: false,
    errMsg: "",
    loaded: false,
  };

  const onLoadChannelExtensions = async () => {
    try {
      loadChannelExtensionState.loading = true;
      const res = await getChannelExtensions.load({
        channel: channelId,
      });
      loadChannelExtensionState.extensions = res.data;
    } catch (error) {
      console.error(error);
      loadChannelExtensionState.errMsg = error.message;
    } finally {
      loadChannelExtensionState.loading = false;
    }
  };

  const onLoadChannel = async () => {
    try {
      loadChanneLState.loading = true;
      const res = await getChannel.load({
        id: channelId,
      });
      loadChanneLState.channel = res.data;
    } catch (err) {
      console.error(err);
      loadChanneLState.errMsg = err.message;
    } finally {
      loadChanneLState.loading = false;
    }
  };

  const onOpenFullMap = () => {
    ewcDispatch.publish({
      key: EwcEvents.pub.channelHome.ON_OPEN_MAP,
      data: { long: 1, lat: 2 },
    });
  };

  const onOpenProduct = (product) => {
    ewcDispatch.publish({
      key: EwcEvents.pub.channelHome.ON_PRODUCT_SELECTED,
      data: { product },
    });
  };

  const onOpenProductType = (type) => {
    ewcDispatch.publish({
      key: EwcEvents.pub.channelHome.ON_PRODUCT_TYPE_SELECTED,
      data: { type },
    });
  };

  const onCopyToClipboard = () => {
    const channelUrl = `http://www.kradass.com/kchannel/${channelId}`;
    navigator.clipboard
      .writeText(channelUrl)
      .then(() => {
        channelUrlCopied = true;
        channelQRcodeImgCopied = false;
        // delay 5s to reset the copied state
        const T = setTimeout(() => {
          channelUrlCopied = false;
          clearTimeout(T);
        }, 5000);
      })
      .catch((error) => {
        channelUrlCopied = false;
        console.error("Failed to copy text to clipboard:", error);
      });
  };

  const onCopyQRCodeToClipboard = () => {
    const dataURL = QRCodeImageEle.getImageURL();
    navigator.clipboard
      .writeText(dataURL)
      .then(() => {
        channelUrlCopied = false;
        channelQRcodeImgCopied = true;
        // delay 5s to reset the copied state
        const T = setTimeout(() => {
          channelQRcodeImgCopied = false;
          clearTimeout(T);
        }, 5000);
      })
      .catch((error) => {
        channelQRcodeImgCopied = false;
        console.error("Failed to copy text to clipboard:", error);
      });
  };

  $: chExtensionKeynames = loadChannelExtensionState.extensions.map(
    (ext) => ext["keyname"],
  );

  onMount(() => {
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen("on-page-reload");
    onLoadChannelExtensions();
    onLoadChannel();

    // delay 1s to render the qrcode
    const T = setTimeout(() => {
      qrcodeRendered = true;
      clearTimeout(T);
    }, 2000);
  });

  afterUpdate(() => {
    ewcDispatch.publish({
      key: EwcEvents.pub.channelHome.ON_SET_CONTENT_HEIGHT,
      data: { contentHeight: wrapperEle.clientHeight },
    });
  });
</script>

<div
  bind:this={wrapperEle}
  bind:clientHeight={contentHeight}
  class="bg-[#262626] w-full text-white"
>
  <div class="mx-auto max-w-lg p-[4px]">
    {#if chExtensionKeynames.includes("product-management")}
      <ProductSection
        on:onSelectProduct={(evt) => {
          onOpenProduct(evt.detail);
        }}
        on:onSelectType={(evt) => {
          onOpenProductType(evt.detail);
        }}
        bind:channelId
      />
    {/if}

    <!-- Channel recent posts -->
    <RecentPostListSection
      bind:channelId
      on:onSelectedPost={(evt) => {
        ewcDispatch.publish({
          key: EwcEvents.pub.channelHome.ON_POST_SELECTED,
          data: { post: evt.detail },
        });
      }}
    />

    <!-- Channel info -->
    {#if loadChanneLState.channel?.["desc"] || loadChanneLState.channel?.["phone"] || loadChanneLState.channel?.["email"] || loadChanneLState.channel?.["website"]}
      <div class="w-full bg-[#ededed] rounded-lg text-gray-700 p-2 shadow-sm">
        <div class="font-bold flex items-center">
          <div class="p-1 text-orange-400">
            <Info />
          </div>
          <div>អំពីឆាណែល</div>
        </div>
        <div class="w-full text-gray-800">
          <div class="py-2">
            {loadChanneLState.channel?.["desc"]}
          </div>
          <div class="h-1"></div>
          {#if loadChanneLState.channel?.["phone"]}
            <div class="flex">
              <div>Phone</div>
              <div>{loadChanneLState.channel?.["phone"]}</div>
            </div>
          {/if}
          {#if loadChanneLState.channel?.["email"]}
            <div class="flex">
              <div>Email</div>
              <div>{loadChanneLState.channel?.["email"]}</div>
            </div>
          {/if}
          {#if loadChanneLState.channel?.["website"]}
            <div class="flex">
              <div>Website</div>
              <div>{loadChanneLState.channel?.["website"]}</div>
            </div>
          {/if}
        </div>
      </div>
    {/if}

    <!-- Location -->
    {#if (loadChanneLState.channel?.["longtitude"] && loadChanneLState.channel?.["latitude"]) || loadChanneLState.channel?.["address"]}
      <div in:fade class="h-4"></div>
      <div class="w-full bg-[#ededed] rounded-lg text-gray-800 p-2 shadow-sm">
        <div class="font-bold flex items-center pb-2">
          <div>
            <div class="p-1 text-orange-400">
              <MapPin />
            </div>
          </div>
          <div>ទីតាំង</div>
          <div class="flex-grow"></div>
          <!-- <div>
          <div class="flex bg-white text-gray-700 p-1 rounded-md pl-4">
            <div>
              <button class="font-normal text-sm" on:click={onOpenFullMap}
                >Visit</button
              >
            </div>
            <div><ChevronRight /></div>
          </div>
        </div> -->
        </div>
        {#if loadChanneLState.channel?.["longtitude"] && loadChanneLState.channel?.["latitude"]}
          <div class="w-full x-h-32 text-gray-700">
            <button
              on:click={onOpenFullMap}
              class="flex w-full h-44 rounded-md overflow-hidden shadow-sm bg-gray-600"
            >
              <img
                hidden={!mapImgeLoaded}
                class="object-cover w-full h-full"
                src={`"http://${APIs.KSTORAGE.csr_uri}/kstorage/common/static-map-stream/0.213/0.43543/13"`}
                alt=""
                on:load={() => {
                  mapImgeLoaded = true;
                }}
              />
            </button>
          </div>
        {/if}

        {#if loadChanneLState.channel?.["address"]}
          <div class="pt-1 px-1">
            <span class="text-gray-700 text-xs font-semibold">
              {loadChanneLState.channel?.["address"]}
            </span>
          </div>
        {/if}
      </div>
    {/if}

    <div class="h-4"></div>
    <!-- Channel qrcode -->
    <div class="w-full bg-[#ededed] rounded-lg text-gray-800 p-2 shadow-sm">
      <div class="font-bold">
        <div class="flex items-center">
          <div class="p-1 text-orange-400">
            <ShareBox size={22} />
          </div>
          <div>ចែករំលែក</div>
          <div class="flex-grow"></div>
        </div>
      </div>
      <div class="h-2"></div>
      <div class="w-full flex text-gray-700">
        <div class="basis-1/2 flex justify-end">
          <div class="w-36 h-36 bg-white rounded-md overflow-hidden shadow-sm">
            <div
              bind:this={qrCodeImageWrapperEle}
              class="p-[2px] w-36 h-36 rounded-md overflow-hidden bg-gray-200 flex justify-center items-center"
            >
              {#if qrcodeRendered}
                <div in:fade class="">
                  <QRCodeImage
                    bind:this={QRCodeImageEle}
                    text={`https://www.kradass.com/kchannel/${channelId}`}
                    width="135"
                    height="135"
                  />
                </div>
              {:else}
                <div class=" h-full w-full flex justify-center items-center">
                  <SmfbLoading color="white" />
                </div>
              {/if}
            </div>
          </div>
        </div>
        <div class="basis-1/2 pl-4">
          <div class="font-bold px-2 text-lg">
            {`${loadChanneLState.channel?.["name"] || ""}`}
          </div>
          {#if qrcodeRendered}
            <div in:fade class="flex">
              <div class=" flex flex-col pt-2">
                <div class="flex">
                  <button
                    on:click={onCopyToClipboard}
                    class="flex items-center bg-white text-gray-700 p-1 rounded-md px-2"
                  >
                    <div class="pr-1">
                      <Link size={18} />
                    </div>
                    <div>
                      <div class="font-normal text-sm">
                        {channelUrlCopied ? "Copied" : "Copy URL"}
                      </div>
                    </div>
                  </button>
                </div>
                <div class="h-2"></div>
                <div class="flex">
                  <button
                    on:click={onCopyQRCodeToClipboard}
                    class="flex items-center bg-white text-gray-700 p-1 rounded-md px-2"
                  >
                    <div class="pr-1">
                      <Qrcode size={18} />
                    </div>
                    <div>
                      <div class="font-normal text-sm">
                        {channelQRcodeImgCopied ? "Copied" : "Copy QRCode"}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
