<script>
    import PlayV3 from "$components/icons/Play/PlayV3.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    export let post;
    export let autoPlay = false;
    const playButton = document.getElementById("playButton");
    const videoPlayer = document.getElementById("videoPlayer");
    if (playButton) {
        playButton.addEventListener("click", function () {
            playButton.style.display = "none";
            videoPlayer.style.display = "block";
            videoPlayer.play();
        });
    }
    onMount(() => {
        const playButton = document.getElementById("playButton");
        const videoPlayer = document.getElementById("videoPlayer");
        if (playButton) {
            playButton.addEventListener("click", function () {
                playButton.style.display = "none";
                videoPlayer.style.display = "block";
                videoPlayer.play();
            });
        }
    });

    let imgLoaded = false;
</script>

<button class="w-full text-left" on:click={()=>{
    dispatch("select", {post});
}}>
    {#if post.content.text}
        <div class="p-3 pt-0 bg-white flex-wrap break-words overflow-hidden">
            <div>
                {post.content?.text || ""}
            </div>
        </div>
    {/if}
    <div class="flex items-center justify-center cursor-pointer relative">
        {#if autoPlay}
            <!-- <video class="w-full h-full" controls  id="videoPlayer"> -->
            <video class="w-full h-full" controls autoplay>
                <source src={post.content.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        {:else}
            <button id="playButton" class="bg-red-300 relative">
                <div
                    class="absolute w-full bg-gray-100/20 h-full flex justify-center items-center"
                >
                    <div
                        class="p-5 bg-gray-700/20 rounded-full flex items-center justify-center border-2 text-white"
                    >
                        <PlayV3 size={30}></PlayV3>
                    </div>
                </div>

                <div class="h-[400px] w-full overflow-hidden bg-gray-50">
                    <img
                        hidden={!imgLoaded}
                        src={post.content.thumbnail.url}
                        alt="Play Video"
                        class=" w-full h-full object-cover"
                        on:load={() => {
                            imgLoaded = true;
                        }}
                    />
                </div>
            </button>
        {/if}
    </div>
</button>
