<script>
	import AddCircle from "$components/icons/add_tmp/AddCircle.svelte";
	import Next from "$components/icons/Next/Next.svelte";
	import { EwcBasicListenerEvents } from "$lib/ewc-dispatch/events/basic";
	import { EwcDispatch, EwcFrames } from "$lib/ewc-dispatch/ewc-dispatch";
	import { onMount } from "svelte";

	const ewcDispatch = new EwcDispatch(EwcFrames.PRODUCT_MANAGEMENT);
	onMount(() => {
		ewcDispatch.setPageLoaded();
		ewcDispatch.listen(EwcBasicListenerEvents.ON_PAGE_RELOAD);
	});

	let categories = [
		{ id: 1, name: "Category 1", items: ["Item 1", "Item 2", "Item 3"] },
		{ id: 2, name: "Category 2", items: ["Item 4", "Item 5", "Item 6"] },
		{ id: 3, name: "Category 3", items: ["Item 7", "Item 8", "Item 9"] },
	];

	let currentCategory = categories[0];

	function nextCategory() {
		const currentIndex = categories.findIndex(
			(category) => category.id === currentCategory.id,
		);
		const nextIndex = (currentIndex + 1) % categories.length;
		currentCategory = categories[nextIndex];
	}

	function previousCategory() {
		const currentIndex = categories.findIndex(
			(category) => category.id === currentCategory.id,
		);
		const previousIndex =
			(currentIndex - 1 + categories.length) % categories.length;
		currentCategory = categories[previousIndex];
	}
</script>

<div class=" flex justify-center w-full h-full bg-gray-100">
	<div class=" w-[600px] h-full bg-red-100 p-3">
		<!-- header -->
		<div class=" flex w-full h-16 bg-gray-700 rounded-l-3xl rounded-r-2xl">
			<div
				class=" flex justify-between items-center w-full h-full bg-white rounded-2xl px-4"
			>
				<button on:click={previousCategory}>
					<div class=" text-gray-600"><Next rotate="180" /></div>
				</button>
				<div class=" relative w-full h-full">
					<button
						class="  px-5 py-2 rounded-full text-gray-600 p-2 bg-gray-200 shadow hover:bg-slate-50 hover:text-gray-800 group"
					>
						loop
						<div
							class=" duration-100 inset-0 w-full h-full transition-all scale-0 group-focus:scale-100 group-focus:bg-black/10 rounded-full"
						/>
					</button>
				</div>

				<div class=" text-gray-700"><Next rotate="0" /></div>
			</div>
			<div class=" flex items-center justify-center w-2/12 text-white">
				<div class=" w-10 h-10">
					<AddCircle />
				</div>
			</div>
		</div>
		<button
			on:click={() => {
				ewcDispatch.publish({ key: "on-create-product" });
			}}>Create new product</button
		>
	</div>
</div>
