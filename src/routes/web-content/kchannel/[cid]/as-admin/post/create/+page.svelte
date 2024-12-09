<script>
  import { page } from "$app/stores";
  import CheckBox from "$components/elements/CheckBox/CheckBox.svelte";
  import ChoosePostProduct from "$components/elements/post/create/choose-post-product/ChoosePostProduct.svelte";
  import ProductPostThumbnail from "$components/elements/post/create/thumbnails/ProductPostThumbnail.svelte";
  import CloseX from "$components/icons/Close/CloseX.svelte";
  import Image from "$components/icons/Image/Image.svelte";
  import PlayV3 from "$components/icons/Play/PlayV3.svelte";
  import Cart from "$components/icons/Shop/Cart.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import Modal from "$components/modals/product-screen/Modal.svelte";
  import { isEwcMode } from "$lib/statics";
  import { getChannel } from "$providers/actions/kchannel/channel";
  import { createPost, getLink } from "$providers/actions/kchannel/post";
  import { getBase64VideoThumbnail } from "$providers/actions/storage";
  import {
    uploadPostMultiPhoto,
    uploadPostPhoto,
    uploadPostVideo,
  } from "$providers/actions/storage/post/post";
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
  import { createPostEwcEvent } from "$lib/ewc-dispatch/events/create-post-evt";
  import PhotoPostThumbnail from "$components/elements/post/create/thumbnails/PhotoPostThumbnail.svelte";

  const dispatch = createEventDispatcher();

  let channelId = $page.params.cid;
  let photos = [];
  let videos = [];
  let selectedProducts = [];
  let newPhoto = {};
  let newVideo = {};
  let newVideoPhoto = {};
  let base64;
  let postCaptionText;
  let isVdo = false;
  let isPhoto = false;
  let isProduct = false;
  let onProduct = false;
  let isPosting = false;
  let disabledPost = true;

  let loadChannelState = {
    channel: {},
    loading: false,
    errMsg: "",
    loaded: false,
  };

  let loadLinkInfoState = {
    link: {},
    loading: false,
    errMsg: "",
    loaded: false,
  };

  function isVideoFile(file) {
    // List of video MIME types
    const videoMimeTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/mpeg",
    ];
    // Check if the file type is in the list of video MIME types
    return videoMimeTypes.includes(file.type);
  }

  function handleImageUpload(event) {
    disabledPost = false;
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (isVideoFile(file)) {
        isVdo = true;
      } else {
        isPhoto = true;
        isVdo = false;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        if (isVdo) {
          isLink = false;
          const getVideoThumbnail = await getBase64VideoThumbnail(
            reader.result,
          );
          newVideoPhoto = { id: Date.now(), data: getVideoThumbnail };
          newVideo = { id: Date.now(), data: reader.result, name: file.name };
          videos = [...videos, newVideoPhoto];
        } else if (isPhoto) {
          isVdo = false;
          newPhoto = { id: Date.now(), data: reader.result, name: file.name };
          photos = [...photos, newPhoto];
        }
      };

      reader.readAsDataURL(file);
    }
  }

  function deletePhoto(index) {
    photos = photos.filter((_, i) => i !== index);
    if (photos.length === 0) {
      disabledPost = true;
      isPhoto = false;
      photos = photos;
    }
  }

  function deleteVdo(index) {
    videos = videos.filter((_, i) => i !== index);
    if (videos.length === 0) {
      disabledPost = true;
    }
  }

  function deleteProduct(index) {
    selectedProducts = selectedProducts.filter((_, i) => i !== index);
    if (selectedProducts.length === 0) {
      selectedProducts = selectedProducts;
      disabledPost = true;
    }
  }

  // Upload Image to S3
  const onUpload = async ({ onDoneCb }) => {
    isPosting = true;
    if (isPhoto) {
      if (photos.length > 1) {
        await uploadPostMultiPhoto.load({
          photos,
          onComplete: (res) => {
            // to do
            let postImage = res.response;
            createPost
              .load({
                channel: channelId,
                type: "muti-photo",
                content: { photos: postImage, text: postCaptionText },
              })
              .then((res) => {
                // to do
                base64 = "";
                postCaptionText = "";
                photos = [];
                isPhoto = false;
                isPosting = false;
                isLink = false;

                onDoneCb?.();
              });

            // upload to create
          },
          onError: (err) => {
            // to do
          },
          onProgress: ({}) => {
            // to do
          },
        });
      } else {
        await uploadPostPhoto.load({
          name: photos[0].name,
          base64: photos[0].data,
          onComplete: async (res) => {
            // to do
            try {
              isPosting = true;
              let postImage = res.response;
              postImage.text = postCaptionText;
              await createPost.load({
                channel: channelId,
                type: "photo",
                content: postImage,
              });

              // to do
              base64 = "";
              postCaptionText = "";
              photos = [];
              isPhoto = false;
              isPosting = false;
              isLink = false;

              onDoneCb?.();
            } catch (err) {
              console.log(err);
            } finally {
              isPosting = false;
            }
            // upload to create
          },
          onError: (err) => {
            console.log(err);
          },
          onProgress: (param) => {
            // to do
            console.log(param?.loaded + "/" + param?.total);
          },
        });
      }
    } else if (isVdo) {
      await uploadPostVideo.load({
        name: newVideo.name,
        base64: newVideo.data,
        onComplete: (res) => {
          // to do
          let postImage = res.response;
          postImage.text = postCaptionText;
          createPost
            .load({
              channel: channelId,
              type: "video",
              content: postImage,
            })
            .then((res) => {
              // to do
              base64 = "";
              postCaptionText = "";
              videos = [];
              isVdo = false;
              isPosting = false;
              isLink = false;

              onDoneCb?.();
            });

          // upload to create
        },
        onError: (err) => {
          // to do
        },
        onProgress: ({}) => {
          // to do
        },
      });
    } else if (isProduct) {
      if (selectedProducts.length === 1) {
        selectedProducts[0]["text"] = postCaptionText;
        createPost
          .load({
            channel: channelId,
            type: "product",
            content: selectedProducts[0],
          })
          .then((res) => {
            // to do
            postCaptionText = "";
            selectedProducts = [];
            isProduct = false;
            isPosting = false;
            isLink = false;

            onDoneCb?.();
          });
      } else if (selectedProducts.length > 1) {
        createPost
          .load({
            channel: channelId,
            type: "muti-product",
            content: { product: selectedProducts, text: postCaptionText },
          })
          .then((res) => {
            // to do
            postCaptionText = "";
            selectedProducts = [];
            isProduct = false;
            isPosting = false;
            isLink = false;

            onDoneCb?.();
          });
      }
    } else if (isLink) {
      createPost
        .load({
          channel: channelId,
          type: "link",
          content: loadLinkInfoState.link,
        })
        .then((res) => {
          // to do
          postCaptionText = "";
          isLink = false;
          isPosting = false;

          onDoneCb?.();
        });
    } else {
      createPost
        .load({
          channel: channelId,
          type: "text",
          content: { text: postCaptionText },
        })
        .then((res) => {
          // to do
          postCaptionText = "";
          isPosting = false;
          isLink = false;

          onDoneCb?.();
        });
    }
  };

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
    } catch (err) {
      loadChannelState.errMsg = err.message;
    } finally {
      loadChannelState.loading = false;
    }
  };

  function containsLink(text) {
    // Regular expression for matching URLs
    const urlRegex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g;

    // Check if the text contains any URLs
    return urlRegex.test(text);
  }

  let isLink = false;
  let timeout;
  const onLinkInfo = async (text) => {
    if (!text.trim()) {
      disabledPost = true;
    } else {
      disabledPost = false;
    }
    clearTimeout(timeout);
    timeout = setTimeout(async function () {
      isLink = containsLink(text);
      if (loadLinkInfoState.loading == true) return;
      try {
        loadLinkInfoState.errMsg = "";
        loadLinkInfoState.loading = true;
        loadLinkInfoState.loaded = false;
        const res = await getLink.load({
          text,
        });
        loadLinkInfoState.link = res.data;
        delete loadLinkInfoState.link.__typename;
        loadLinkInfoState.loaded = true;
      } catch (err) {
        loadLinkInfoState.errMsg = err.message;
      } finally {
        loadLinkInfoState.loading = false;
      }
    }, 1000);
  };

  const onLoadImage = () => {
    if (!ewcDispatch.isFlutterEwc()) {
      const fileInput = document.getElementById("photoInput");
      if (fileInput) {
        fileInput.click();
      }
    } else {
      ewcDispatch.publish({
        key: createPostEwcEvent.post.ON_UPLOAD_FILE,
        data: {},
      });
    }
  };

  $: enablePostBtn =
    selectedProducts?.length > 0 ||
    postCaptionText ||
    photos?.length > 0 ||
    videos?.length > 0;

  const ewcDispatch = new EwcDispatch();
  onMount(async () => {
    tick().then(() => {
      ewcDispatch.setPageLoaded();
      ewcDispatch.listen({ key: "on-page-reload" });

      ewcDispatch.listen({
        key: createPostEwcEvent.post.ON_PARSE_BASE64,
        cb: (data) => {
          if (data?.data) {
            const base64 = data.data;
            newPhoto = { id: Date.now(), data: base64, name: "Unknown" };
            photos = [...photos, newPhoto];
            isPhoto = true;
          }
        },
      });
    });

    await onLoadChannel();
  });

  let imgLoaded = false;
</script>

<!-- TODO: check by form -->
<div class="relative w-full h-screen flex justify-center">
  <!-- <CreateNewFeed /> -->
  <form
    class="absolute flex w-full h-full max-w-[650px]"
    on:submit|preventDefault={() => {
      onUpload({
        onDoneCb: () => {
          ewcDispatch.publish({
            key: createPostEwcEvent.post.ON_POSTED,
            data: {},
          });
        },
      });
    }}
    method="post"
  >
    <div class=" flex flex-col w-full bg-[#F0F0F0]">
      <div class=" flex-grow-0 w-full h-[80px] flex px-4 items-center bg-white">
        {#if isPosting}
          <div class=" w-full flex justify-end items-center">
            <div class=" py-2 px-6 bg-blue-600 text-white rounded-lg">
              <SmfbLoading />
            </div>
          </div>
        {:else}
          <div class=" w-full flex justify-between items-center space-x-4">
            <div
              class="{isEwcMode()
                ? 'invisible pointer-events-none'
                : ''} text-gray-500 hover:bg-gray-100 hover:rounded-lg cursor-pointer"
            >
              <CloseX />
            </div>
            <div class=" text-gray-700">New Post</div>
            <!-- check button change bg and color when require -->
            <button
              type="submit"
              disabled={!enablePostBtn}
              class="disabled:bg-gray-200 disabled:text-black/25 disabled:font-bold py-2 px-6 bg-blue-600 text-white rounded-lg"
              >Post</button
            >
          </div>
        {/if}
        <hr />
      </div>
      <div class=" flex-grow relative w-full px-4 pt-2 bg-white">
        <div class=" flex flex-col text-gray-700 w-full h-full">
          <div class=" flex-grow-0">
            <div class=" flex items-center space-x-4">
              <div
                class="h-14 w-14 rounded-[20px] border bg-gray-200 overflow-hidden"
              >
                <img
                  hidden={!imgLoaded}
                  src={loadChannelState?.channel?.profile?.url}
                  alt="image1"
                  class=" w-full h-full object-cover"
                  on:load={() => (imgLoaded = true)}
                />
              </div>

              <div class=" text-xl text-gra">
                {loadChannelState?.channel?.name || ""}
              </div>
            </div>
            <div class=" py-4">
              <input
                type="text"
                bind:value={postCaptionText}
                on:input={() => {
                  onLinkInfo(postCaptionText);
                }}
                class=" text-gray-600 px-4 p-2 border-none outline-none appearance-none focus:outline-none focus:ring-0 w-full rounded-md leading-normal"
                placeholder="What's on your thought?"
              />
            </div>
          </div>
          <div class=" flex-grow relative w-full h-full">
            <div class=" absolute inset-0 overflow-y-auto">
              <ul class=" w-full h-full">
                {#if isVdo}
                  {#each videos as photo, index (photo.id)}
                    <li class="relative pb-4">
                      <div
                        class="absolute w-full bg-gray-100/20 h-full flex justify-center items-center"
                      >
                        <div
                          class="p-5 bg-gray-700/20 rounded-full flex items-center justify-center border-2 text-white"
                        >
                          <PlayV3 size={30}></PlayV3>
                        </div>
                      </div>
                      <img
                        src={photo.data}
                        alt="Photo1"
                        class="w-full h-full object-cover rounded-lg shadow"
                      />
                      <button
                        type="button"
                        class="absolute top-2 right-2 px-2 rounded-full text-gray-500 p-2 bg-white shadow hover:bg-slate-50 hover:text-gray-800 group"
                        on:click={() => deleteVdo(index)}
                      >
                        <CloseX />
                        <div
                          class="absolute duration-100 inset-0 w-full h-full transition-all scale-0 group-focus:scale-100 group-focus:bg-black/10 rounded-full"
                        />
                      </button>
                    </li>
                  {/each}
                {/if}

                {#if isLink}
                  <li class="relative pb-4">
                    <div
                      class="relative flex items-center justify-center cursor-pointer flex-col"
                    >
                      {#if loadLinkInfoState.link.data}
                        {#if loadLinkInfoState.link.data.ogImage}
                          <img
                            src={loadLinkInfoState.link.data.ogImage}
                            alt=""
                          />
                        {/if}
                        <div
                          class="flex flex-col p-2 border rounded-b-md w-full"
                        >
                          <div class="text-gray-700/70">
                            {loadLinkInfoState.link.data.uri}
                          </div>
                          <div class="font-bold">
                            {loadLinkInfoState.link.data.title}
                          </div>
                        </div>
                      {/if}
                    </div>
                  </li>
                {/if}

                {#if isPhoto}
                  <PhotoPostThumbnail
                    bind:photos
                    on:upload={(evt) => {
                      onLoadImage();
                    }}
                    on:deletePhoto={(evt) => {
                      const { index } = evt.detail;
                      deletePhoto(index);
                    }}
                  />
                {/if}

                {#if isProduct}
                  <ProductPostThumbnail
                    products={selectedProducts}
                    on:remove={(evt) => {
                      const { index } = evt.detail;
                      deleteProduct(index);
                    }}
                  />
                {/if}
              </ul>
            </div>
          </div>
        </div>

        <div
          class=" flex absolute bottom-7 left-0 right-0 justify-center space-x-3"
        >
          <input
            style="display:none"
            id="photoInput"
            type="file"
            accept="*/*"
            multiple
            on:change={handleImageUpload}
          />
          {#if selectedProducts.length > 0}
            <button
              on:click={() => {
                // onLoadProducts();
                onProduct = true;
              }}
              type="button"
              class=" bg-white shadow-sm px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-500 hover:text-gray-700 hover-button"
              data-name="Product"
            >
              <Cart />
            </button>
          {/if}
          {#if photos.length === 0 && selectedProducts.length === 0}
            <button
              on:click={() => {
                onLoadImage();
              }}
              type="button"
              class="  shadow-sm px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-500 hover:text-gray-700 hover-button"
              data-name="Photo/video"
            >
              <Image />
            </button>
            <button
              on:click={() => {
                onProduct = true;
              }}
              type="button"
              class=" bg-white shadow-sm px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-500 hover:text-gray-700 hover-button"
              data-name="Product"
            >
              <Cart />
            </button>
          {/if}
        </div>
      </div>
    </div>
  </form>
</div>

<Modal shown={onProduct}>
  <ChoosePostProduct
    {channelId}
    on:close={() => {
      dispatch("close");
      onProduct = false;
    }}
    on:add={(evt) => {
      const { products } = evt.detail;
      dispatch("save");
      onProduct = false;
      isProduct = true;
      selectedProducts = products;
      // if (products?.length != 0) {
      //   disabledPost = false;
      // }
    }}
  />
</Modal>

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
