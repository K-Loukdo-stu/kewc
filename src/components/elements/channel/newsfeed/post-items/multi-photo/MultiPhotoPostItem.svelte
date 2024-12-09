<script>
    import ArrowLeft from "$components/icons/arrow_tmp/ArrowLeft.svelte";
    import ArrowRight from "$components/icons/arrow_tmp/ArrowRight.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let post;
    export let isDetail = false;
    let imgIndex = 0;
</script>

<button
    class="w-full h-full text-start"
    on:click={() => {
        dispatch("select", { post });
    }}
>
    {#if post.content.text}
        <div
            class="p-3 pl-6 pt-0 bg-white flex-wrap break-words overflow-hidden"
        >
            {post.content?.text || ""}
        </div>
    {/if}
    <div class=" w-full h-full">
        {#if post.content.photos.length == 2}
            <div class="flex flex-row space-x-1 w-full">
                {#each post.content.photos as photo}
                    <div class="w-full flex items-center justify-center">
                        <img src={photo.url} alt="object-cover w-full" />
                    </div>
                {/each}
            </div>
            <!-- <div class="flex flex-row">
                <div class="pr-1">
                    <img
                        src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium"
                        alt=""
                    />
                </div>
            </div> -->
        {:else if post.content.photos.length == 3}
            <div class="w-full flex flex-row">
                <img
                    class="w-2/3 pr-1"
                    src={post.content.photos[0].url}
                    alt=""
                />
                <div class="w-1/3 flex flex-col">
                    <div class="pb-1 w-full">
                        <img class="" src={post.content.photos[1].url} alt="" />
                    </div>
                    <div class="w-full">
                        <img class="" src={post.content.photos[2].url} alt="" />
                    </div>
                </div>
                <!-- <div class="w-1/3 bg-red-900 h-full flex">
                    <div class="pb-1 w-full">
                        <img
                            class=""
                            src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium"
                            alt=""
                        />
                    </div>
                    <div class="w-full">
                        <img
                            class=""
                            src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium"
                            alt=""
                        />
                    </div>
                </div> -->
                <!-- <div class="flex flex-col flex-grow-0">
                    <div class="pb-1 w-[167px]">
                        <img
                            class=""
                            src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium"
                            alt=""
                        />
                    </div>
                    <div class="w-[167px]">
                        <img
                            src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium"
                            alt=""
                        />
                    </div>
                </div> -->
            </div>
        {:else if post.content.photos.length > 3}
            {#if isDetail}
                <div
                    class="w-full flex flex-row relative justify-center h-[375px]"
                >
                    <div
                        class="absolute h-full bg-gray-400/5 hover:bg-gray-400/20 pl-2 pr-2 left-0 cursor-pointer flex items-center"
                        on:click={() => {
                            if (imgIndex === 0) {
                                imgIndex = post.content.photos?.length || 0;
                            }
                            imgIndex--;
                        }}
                    >
                        <div
                            class=" p-2 rounded-full text-gray-500 bg-white/50 hover:text-gray-700 hover:bg-white/75"
                        >
                            <ArrowLeft></ArrowLeft>
                            <!-- <TopArrow></TopArrow> -->
                        </div>
                    </div>
                    <img
                        class="object-cover"
                        src={post.content.photos[imgIndex].url}
                        alt=""
                    />
                    <div
                        class="absolute h-full bg-gray-400/5 hover:bg-gray-400/20 pl-2 pr-2 bg-blue-200 right-0 cursor-pointer flex items-center"
                        on:click={() => {
                            if (
                                imgIndex >= 0 &&
                                imgIndex < (post.content.photos?.length || 0)
                            ) {
                                imgIndex++;
                                if (
                                    imgIndex >=
                                    (post.content.photos?.length || 0)
                                ) {
                                    imgIndex = 0; // Reset imgIndex back to 0
                                }
                            }
                        }}
                    >
                        <div
                            class=" p-2 rounded-full text-gray-500 bg-white/50 hover:text-gray-700 hover:bg-white/75"
                        >
                            <ArrowRight></ArrowRight>
                        </div>
                    </div>
                    <!-- <div class="w-1/3 flex flex-col">
                        <div class="pb-1 w-full">
                            <img
                                class=""
                                src={post.content.photos[1].url}
                                alt=""
                            />
                        </div>
                        <div class="w-full relative">
                            <div
                                class="w-full h-full absolute bg-black/30 text-white text-[24pt] flex items-center justify-center"
                            >
                                +{post.content.photos.length - 2}
                            </div>
                            <img
                                class=""
                                src={post.content.photos[2].url}
                                alt=""
                            />
                        </div>
                    </div> -->
                </div>
            {:else}
                <div class="w-full flex flex-row">
                    <img
                        class="w-2/3 pr-1"
                        src={post.content.photos[0].url}
                        alt=""
                    />
                    <div class="w-1/3 flex flex-col">
                        <div class="pb-1 w-full">
                            <img
                                class=""
                                src={post.content.photos[1].url}
                                alt=""
                            />
                        </div>
                        <div class="w-full relative">
                            <div
                                class="w-full h-full absolute bg-black/30 text-white text-[24pt] flex items-center justify-center"
                            >
                                +{post.content.photos.length - 2}
                            </div>
                            <img
                                class=""
                                src={post.content.photos[2].url}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            {/if}
        {/if}
    </div>
</button>
