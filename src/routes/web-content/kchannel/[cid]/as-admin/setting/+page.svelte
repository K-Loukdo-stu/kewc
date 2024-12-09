<script>
  import { page } from "$app/stores";
  import Image from "$components/icons/Image/Image.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { isEwcMode } from "$lib/statics";
  import {
    getChannel,
    updateChannelAddress,
    updateChannelCover,
    updateChannelInfo,
    updateChannelProfile,
  } from "$providers/actions/kchannel/channel";
  import { createEventDispatcher, onMount } from "svelte";
  import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
  import { editChannelEwcEvent } from "$lib/ewc-dispatch/events/edit-post-evt";
  import DropdownIcon from "$components/icons/Dropdown/DropdownIcon.svelte";
  import SelectCatalog from "$components/elements/dashboard/channel/setting/dropdown/SelectCatalog.svelte";
  import SelectPublic from "$components/elements/dashboard/channel/setting/dropdown-visibility/SelectPublic.svelte";
  import SelectedModal from "$components/elements/dashboard/channel/setting/modal/SelectedModal.svelte";
  import { uploadChannelProfile } from "$providers/actions/storage/channel-profile";
  import ImageUploadHolder from "$components/materials/image/ImageUploadHolder.svelte";

  const dispatch = createEventDispatcher();

  let channelId = $page.params.cid;
  let newPhoto = {};
  let newProfile = {};
  let newCover = {};
  let base64;
  let disabledPost = true;
  let channel = {
    name: "",
    desc: "",
    phone: "",
    email: "",
    website: "",
    profile: "",
    cover: "",
    bio: "",
    createdAt: "",
    public: false,
    catalog: {},
    kind: "",
    acceptingCurrency: "",
    usdExchangeRateInRiel: 0,
  };
  let channelAddress = {
    address: "",
    latitude: 0,
    longitude: 0,
  };
  let enableDropdown = false;
  let visibilityStatus = false;

  let loadChannelState = {
    channel: {},
    loading: false,
    errMsg: "",
    loaded: false,
  };

  let updateChannelInfoState = {
    loading: false,
    errMsg: "",
    updated: false,
  };

  let updateChannelAddressState = {
    loading: false,
    errMsg: "",
    updated: false,
  };
  let updateChannelCoverState = {
    loading: false,
    errMsg: "",
    updated: false,
  };

  let updateChannelProfileState = {
    loading: false,
    errMsg: "",
    updated: false,
  };

  async function handleImageUploadCover({ file, base64 }) {
    newCover = { id: Date.now(), data: base64, name: file.name };
    if (newCover.data) {
      updateChannelCoverState.loading = true;
      await uploadChannelProfile.load({
        base64: newCover.data,
        name: newCover.name,
        onComplete: async (res) => {
          try {
            updateChannelCoverState.loading = true;
            await updateChannelCover.load({
              id: channelId,
              cover: res.response,
            });

            base64 = "";
          } catch (error) {
            updateChannelCoverState.errMsg = error.message;
          } finally {
            updateChannelCoverState.loading = false;
          }
        },
        onError: (err) => {
          updateChannelCoverState.errMsg = err.message;
        },
        onProgress: ({ params, loaded, total }) => {
          // to do
        },
      });
    }
  }

  async function handleImageUploadProfile({ file, base64 }) {
    newProfile = { id: Date.now(), data: base64, name: file.name };
    if (newProfile.data) {
      updateChannelProfileState.loading = true;
      await uploadChannelProfile.load({
        base64: newProfile.data,
        name: newProfile.name,
        onComplete: async (res) => {
          try {
            updateChannelProfileState.loading = true;
            await updateChannelProfile.load({
              id: channelId,
              profile: res.response,
            });

            base64 = "";
          } catch (error) {
            updateChannelProfileState.errMsg = error.message;
          } finally {
            updateChannelProfileState.loading = false;
          }
        },
        onError: (err) => {
          updateChannelProfileState.errMsg = err.message;
        },
        onProgress: ({ params, loaded, total }) => {
          // to do
        },
      });
    }
  }

  const onLoadChannel = async () => {
    if (loadChannelState.loading == true) return;
    try {
      loadChannelState.errMsg = "";
      loadChannelState.loading = true;
      loadChannelState.loaded = false;
      const res = await getChannel.load({
        id: channelId,
      });
      loadChannelState.channel = res.data;
      loadChannelState.loaded = true;
      channel = {
        name: loadChannelState.channel.name,
        desc: loadChannelState.channel.desc,
        phone: loadChannelState.channel.phone,
        email: loadChannelState.channel.email,
        website: loadChannelState.channel.website,
        profile: loadChannelState.channel.profile,
        cover: loadChannelState.channel.cover,
        bio: loadChannelState.channel.bio,
        createdAt: loadChannelState.channel.createdAt,
        public: loadChannelState.channel.public,
        catalog: loadChannelState.channel.catalog,
        kind: loadChannelState.channel.kind,
        acceptingCurrency: loadChannelState.channel.acceptingCurrency,
        usdExchangeRateInRiel: loadChannelState.channel.usdExchangeRateInRiel,
      };
      channelAddress = {
        address: loadChannelState.channel.address,
        latitude: loadChannelState.channel.latitude,
        longitude: loadChannelState.channel.longitude,
      };
    } catch (err) {
      loadChannelState.errMsg = err.message;
    } finally {
      loadChannelState.loading = false;
    }
  };

  const onUpdateInfo = async ({ onDoneCb }) => {
    updateChannelInfoState.updated = false;
    updateChannelInfoState.loading = true;
    try {
      await updateChannelInfo
        .load({
          id: channelId,
          name: channel.name,
          desc: channel.desc,
          phone: channel.phone,
          email: channel.email,
          website: channel.website,
          bio: channel.bio,
          publicStatus: channel.public,
          acceptingCurrency: channel.acceptingCurrency,
          usdExchangeRateInRiel: channel.usdExchangeRateInRiel,
          catalog: channel?.catalog?.id || null,
        })
        .then((res) => {
          // to do
          updateChannelInfoState.updated = true;
          onDoneCb?.();
        });
    } catch (error) {
      console.error("Error updating address:", error);
      updateChannelInfoState.errMsg = error.message;
    } finally {
      updateChannelInfoState.loading = false;
    }
  };

  const onUpdateAddress = async ({ onDoneCb }) => {
    try {
      updateChannelAddressState.loading = true;
      updateChannelAddressState.updated = false;
      await updateChannelAddress.load({
        id: channelId,
        address: channelAddress.address,
        latitude: parseFloat(channelAddress.latitude),
        longitude: parseFloat(channelAddress.longitude),
      });
      updateChannelAddressState.updated = true;
      onDoneCb?.();
    } catch (error) {
      console.error("Error updating address:", error);
      updateChannelAddressState.errMsg = error.message;
    } finally {
      updateChannelAddressState.loading = false;
    }
  };

  const ewcDispatch = new EwcDispatch();
  onMount(async () => {
    ewcDispatch.setPageLoaded();
    await onLoadChannel();
    ewcDispatch.listen({
      key: editChannelEwcEvent.channel.ON_PARSE_BASE64,
      cb: (data) => {
        if (data?.data) {
          const base64 = data.data;
          newPhoto = { id: Date.now(), data: base64, name: "Unknown" };
          photos = [...photos, newPhoto];
        }
      },
    });
  });
</script>

<!-- TODO: check by form -->
<div class="relative w-full h-screen flex justify-center">
  <!-- <CreateNewFeed /> -->
  <form
    class="absolute flex w-full h-full max-w-[650px]"
    on:submit|preventDefault={() => {
      onUpdateInfo({
        onDoneCb: () => {
          ewcDispatch.publish({
            key: editChannelEwcEvent.channel.ON_POSTED,
            data: {},
          });
        },
      });
    }}
    method="post"
  >
    <div class=" flex flex-col w-full bg-[#F0F0F0]">
      <div class=" flex-grow relative w-full bg-white overflow-auto">
        <div class=" flex flex-col text-gray-700 w-full h-full">
          <div class=" flex-grow-0">
            <div
              class="bg-[#4B4B4B]/70 h-[200px] w-full flex justify-center items-center relative"
            >
              <div class="w-full h-full cursor-pointer relative">
                <ImageUploadHolder
                  ewcKeySuffix="cover"
                  imgUrl={loadChannelState?.channel?.cover?.url}
                  on:choose={(evt) => {
                    handleImageUploadCover({
                      file: evt.detail.file,
                      base64: evt.detail.base64,
                    });
                  }}
                />
                {#if updateChannelCoverState.loading}
                  <div
                    class=" absolute inset-0 flex justify-center items-center"
                  >
                    <SmfbLoading />
                  </div>
                {/if}
                <div
                  class="absolute flex items-center justify-center bg-gray-500 rounded-full border-white border-2 top-2 right-2 p-2 select-none pointer-events-none"
                >
                  <div class="text-white">
                    <Image size={20}></Image>
                  </div>
                </div>
              </div>
              <div
                class="w-[75px] h-[75px] absolute bg-gray-500 border-white border-2 rounded-full bottom-[-35px] left-5 cursor-pointer"
              >
                <div
                  class="relative w-full h-full rounded-full overflow-hidden"
                >
                  <ImageUploadHolder
                    ewcKeySuffix="profile"
                    imgUrl={loadChannelState?.channel?.profile?.thumbnail?.url}
                    on:choose={(evt) => {
                      handleImageUploadProfile({
                        file: evt.detail.file,
                        base64: evt.detail.base64,
                      });
                    }}
                  />
                  {#if updateChannelProfileState.loading}
                    <div
                      class=" absolute inset-0 flex justify-center items-center"
                    >
                      <SmfbLoading />
                    </div>
                  {/if}
                </div>

                <div
                  class="absolute flex items-center justify-center bg-gray-500 rounded-full border-white border-2 bottom-0 right-[-2px] p-2"
                >
                  <div class="text-white">
                    <Image size={12}></Image>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10">
            {#if updateChannelCoverState.errMsg || updateChannelCoverState.errMsg}
              <div class="text-red-500 truncate text-center">
                {updateChannelCoverState.errMsg ||
                  updateChannelCoverState.errMsg}
              </div>
            {/if}
          </div>
          <div class="flex-grow w-full p-4 pb-2">
            <div class="w-full h-full bg-[#F8F8F9] p-5 rounded-md border-2">
              <div class=" w-full flex space-y-2 flex-col">
                <!-- body -->
                <div class="flex flex-col w-full space-y-1">
                  <div class="text-base">Name</div>
                  <div class="w-full">
                    <input
                      type="text"
                      bind:value={channel.name}
                      class="w-full p-2 pl-4 rounded-md flex items-center border-[#B5B5B5] border-[1px] outline-none"
                    />
                  </div>
                </div>
                <div class="flex flex-col w-full space-y-1">
                  <div class="text-base">Bio</div>
                  <div class="w-full">
                    <input
                      type="text"
                      bind:value={channel.bio}
                      class="w-full p-2 pl-4 rounded-md flex items-center border-[#B5B5B5] border-[1px] outline-none"
                    />
                  </div>
                </div>
                <div class="flex flex-col w-full space-y-1">
                  <div class="text-base">Visibility</div>
                  <button
                    class="cursor-pointer relative w-full p-2 pl-4 rounded-md flex items-center border-[#B5B5B5] border-[1px] outline-none"
                    on:click|preventDefault={() => {
                      visibilityStatus = true;
                    }}
                  >
                    <div>
                      <input type="hidden" bind:value={channel.public} />
                      {#if channel.public}
                        Public
                      {:else}
                        Private
                      {/if}
                    </div>
                    <div class="absolute right-2">
                      <DropdownIcon></DropdownIcon>
                    </div>
                  </button>
                </div>
                <div class="flex flex-col w-full space-y-1">
                  <div class="text-base">Phone Number</div>
                  <div class="w-full">
                    <input
                      type="text"
                      bind:value={channel.phone}
                      class="w-full p-2 pl-4 rounded-md flex items-center border-[#B5B5B5] border-[1px] outline-none"
                    />
                  </div>
                  <div class="text-[#828282] text-sm">
                    Example: +855-XXXXXXX
                  </div>
                </div>
                <div class="flex flex-col w-full space-y-1">
                  <div class="text-base">Email</div>
                  <div class="w-full">
                    <input
                      type="text"
                      bind:value={channel.email}
                      class="w-full p-2 pl-4 rounded-md flex items-center border-[#B5B5B5] border-[1px] outline-none"
                    />
                  </div>
                  <div class="text-[#828282] text-sm">
                    Example: XXXX@gmail.com
                  </div>
                </div>
                <div class="flex flex-col w-full space-y-1">
                  <div class="text-base">Website</div>
                  <div class="w-full">
                    <input
                      type="text"
                      bind:value={channel.website}
                      class="w-full p-2 pl-4 rounded-md flex items-center border-[#B5B5B5] border-[1px] outline-none"
                    />
                  </div>
                </div>
                <div class="flex flex-col w-full space-y-1">
                  <div class="text-base">Kind</div>
                  <div
                    class="w-full p-2 pl-4 rounded-md flex items-center bg-[#828282]/30"
                  >
                    {#if channel.kind}
                      {channel.kind}
                    {:else}
                      None
                    {/if}
                  </div>
                </div>
                <div class="flex flex-col w-full space-y-1">
                  <div class="text-base">
                    Accepting Currency: {channel.acceptingCurrency}
                  </div>
                  <div class="w-full flex flex-row space-x-5">
                    <button
                      class={"cursor-pointer p-2 w-[75px] h-[35px] flex items-center justify-center rounded-md " +
                        (channel.acceptingCurrency == "USD"
                          ? " bg-[#4a48b9] text-white"
                          : "bg-[#4E4E4E]/50 text-white")}
                      on:click|preventDefault={() => {
                        channel.acceptingCurrency = "USD";
                      }}
                    >
                      USD
                    </button>
                    <button
                      class={"cursor-pointer p-2 w-[75px] h-[35px] flex items-center justify-center rounded-md " +
                        (channel.acceptingCurrency == "KHR"
                          ? " bg-[#4a48b9] text-white"
                          : "bg-[#4E4E4E]/50 text-white")}
                      on:click|preventDefault={() => {
                        channel.acceptingCurrency = "KHR";
                      }}
                    >
                      KHR
                    </button>
                  </div>
                </div>
                <div class="flex flex-col w-full space-y-1">
                  <div class="text-base">USD Exchange Rate In Riel</div>
                  <div class="w-full">
                    <input
                      type="text"
                      bind:value={channel.usdExchangeRateInRiel}
                      class="w-full p-2 pl-4 rounded-md flex items-center border-[#B5B5B5] border-[1px] outline-none"
                    />
                  </div>
                </div>
                <div class="flex flex-col w-full space-y-1">
                  <div class="text-base">Catalog</div>
                  <button
                    class="cursor-pointer relative w-full p-2 pl-4 rounded-md flex items-center border-[#B5B5B5] border-[1px] outline-none"
                    on:click|preventDefault={() => {
                      enableDropdown = true;
                    }}
                  >
                    {#if channel.catalog}
                      <div>{channel.catalog.name}</div>
                    {:else}
                      <div>Select Catalog</div>
                    {/if}
                    <div class="absolute right-2">
                      <DropdownIcon></DropdownIcon>
                    </div>
                  </button>
                </div>
                <div class="flex flex-col w-full space-y-1">
                  <div class="text-base">Description</div>
                  <div class="w-full">
                    <textarea
                      type="text"
                      bind:value={channel.desc}
                      class="w-full p-2 pl-4 rounded-md flex items-center border-[#B5B5B5] border-[1px] outline-none"
                    />
                  </div>
                </div>
                {#if updateChannelInfoState.errMsg}
                  <div class="text-red-500">
                    {updateChannelInfoState.errMsg}
                  </div>
                {/if}
                <div class="h-2"></div>
                <div class="flex w-full justify-end h-[40px]">
                  {#if updateChannelInfoState.loading}
                    <div
                      class="py-2 px-6 bg-blue-600 text-white rounded-lg h-full flex items-center justify-center"
                    >
                      <SmfbLoading />
                    </div>
                  {:else}
                    <button
                      type="submit"
                      disabled={updateChannelInfoState.loading}
                      class="disabled:bg-gray-200 disabled:text-black/25 disabled:font-bold py-2 px-6 bg-blue-600 text-white rounded-lg h-full flex items-center justify-center"
                      >Save</button
                    >
                  {/if}
                </div>
              </div>
            </div>
          </div>

          <form
            class="flex-grow w-full p-4 pt-2"
            on:submit|preventDefault={() => {
              onUpdateAddress({
                onDoneCb: () => {
                  ewcDispatch.publish({
                    key: editChannelEwcEvent.channel.ON_POSTED,
                    data: {},
                  });
                },
              });
            }}
            method="post"
          >
            <div class="">
              <div class="w-full h-full bg-[#F8F8F9] p-5 rounded-md border-2">
                <div class=" w-full flex space-y-2 flex-col">
                  <!-- body -->
                  <div class="flex flex-col w-full space-y-1">
                    <div class="text-base">Address</div>
                    <div class="w-full">
                      <input
                        required
                        type="text"
                        bind:value={channelAddress.address}
                        class="w-full p-2 pl-4 rounded-md flex items-center border-[#B5B5B5] border-[1px] outline-none"
                      />
                    </div>
                  </div>
                  <div class="flex flex-rol w-full space-x-2">
                    <div class="flex flex-col w-full space-y-1">
                      <div class="text-base">Latitute</div>
                      <div class="w-full">
                        <input
                          required
                          type="number"
                          step="any"
                          bind:value={channelAddress.latitude}
                          class="w-full p-2 pl-4 rounded-md flex items-center border-[#B5B5B5] border-[1px] outline-none"
                        />
                      </div>
                    </div>
                    <div class="flex flex-col w-full space-y-1">
                      <div class="text-base">Longtitute</div>
                      <div class="w-full">
                        <input
                          required
                          type="number"
                          step="any"
                          bind:value={channelAddress.longitude}
                          class="w-full p-2 pl-4 rounded-md flex items-center border-[#B5B5B5] border-[1px] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  {#if updateChannelAddressState.errMsg}
                    <div class="text-red-500">
                      {updateChannelAddressState.errMsg}
                    </div>
                  {/if}
                  <div class="h-2"></div>
                  <div class="flex w-full justify-end h-[40px]">
                    {#if updateChannelAddressState.loading}
                      <div
                        class="py-2 px-6 bg-blue-600 text-white rounded-lg h-full flex items-center justify-center"
                      >
                        <SmfbLoading />
                      </div>
                    {:else}
                      <button
                        type="submit"
                        disabled={updateChannelAddressState.loading}
                        class="disabled:bg-gray-200 disabled:text-black/25 disabled:font-bold py-2 px-6 bg-blue-600 text-white rounded-lg h-full flex items-center justify-center"
                        >Save</button
                      >
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </form>
</div>

<SelectedModal shown={enableDropdown}>
  <SelectCatalog
    catalog={channel?.catalog}
    on:close={() => {
      dispatch("close");
      enableDropdown = false;
    }}
    on:selected={(evt) => {
      enableDropdown = false;
      channel.catalog = evt.detail;
    }}
  />
</SelectedModal>

<SelectedModal shown={visibilityStatus}>
  <SelectPublic
    {channelId}
    on:close={() => {
      dispatch("close");
      visibilityStatus = false;
    }}
    on:public={() => {
      visibilityStatus = false;
      channel.public = true;
    }}
    on:private={() => {
      visibilityStatus = false;
      channel.public = false;
    }}
  />
</SelectedModal>

<style>
  /* Style for the hover display */
  .hover-button:hover::after {
    content: attr(data-name); /* Display the 'data-name' attribute value */
    display: flex;
    justify-content: center;
    background-color: #34495e;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    position: absolute;
    margin-top: -70px; /* Adjust as needed to position the hover display */
    margin-left: -35px; /* Adjust as needed to position the hover display */
    z-index: 1;
  }
</style>
