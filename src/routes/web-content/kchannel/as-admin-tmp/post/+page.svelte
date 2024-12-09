<script>
	import Image from "$components/icons/Image/Image.svelte";
	import Cart from "$components/icons/Shop/Cart.svelte";
	import { EwcBasicListenerEvents } from "$lib/ewc-dispatch/events/basic";
	import { EwcDispatch, EwcFrames } from "$lib/ewc-dispatch/ewc-dispatch";
	import { onMount } from "svelte";
	const ewcDispatch = new EwcDispatch(EwcFrames.PRODUCT_MANAGEMENT);
	onMount(() => {
		ewcDispatch.setPageLoaded();
		ewcDispatch.listen(EwcBasicListenerEvents.ON_PAGE_RELOAD);
	});
</script>

<div class=" w-full h-full bg-gray-300 flex justify-center">
	<div class=" w-[650px] bg-[#F0F0F0]">
		<!-- <div>Post</div>
	<button
		on:click={() => {
			ewcDispatch.publish({ key: 'on-create-product' });
		}}>Create new feed</button
	> -->

		<div class="w-full h-16 flex px-4 items-center bg-white">
			<div class=" w-full flex items-center space-x-4">
				<div class=" text-gray-500">
					<Image />
				</div>
				<div class=" text-gray-500">
					<Cart />
				</div>
				<input
					type="text"
					class=" box-border text-gray-600 px-4 p-2 border-none outline-none appearance-none focus:outline-none focus:ring-0 w-full bg-[#F0F0F0] rounded-md"
					placeholder="Search ..."
					id=""
				/>
			</div>
		</div>
		<div class=" w-full h-full flex items-center justify-center">
			<div class=" text-gray-500">No post</div>
		</div>
	</div>
</div>
