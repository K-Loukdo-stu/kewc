<script>
	import PlusCircle from '$components/icons/add_tmp/PlusCircle.svelte';
	import CloseX from '$components/icons/Close/CloseX.svelte';
	import Image from '$components/icons/Image/Image.svelte';
	import Cart from '$components/icons/Shop/Cart.svelte';
	let photos = [];

	function handleImageUpload(event) {
		const files = event.target.files;
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();
			reader.onload = () => {
				const newPhoto = { id: Date.now(), data: reader.result };
				photos = [...photos, newPhoto];
			};
			reader.readAsDataURL(file);
		}
	}

	function deletePhoto(index) {
		photos = photos.filter((_, i) => i !== index);
	}

	// myChannels.load().then((res) => {
	// 	if (!res.success) return;
	// 	myChannel = res.data;
	// });
</script>

<!-- TODO: check by form -->
<div class=" w-full h-full bg-gray-300 flex justify-center">
	<!-- <CreateNewFeed /> -->
	<form class=" ">
		<div class=" w-[650px] bg-[#F0F0F0]">
			<div class="w-full h-14 flex px-4 items-center bg-white">
				<div class=" w-full flex justify-between items-center space-x-4">
					<div class=" text-gray-500">
						<CloseX />
					</div>
					<div class=" text-gray-500">New Post</div>
					<!-- check button change bg and color when require -->
					<button
						type="submit"
						class=" py-2 px-6 bg-blue-600 text-white rounded-lg">Post</button
					>
				</div>
			</div>
			<hr />
			<div class=" relative w-full h-full px-4 pt-4 bg-white">
				<div class=" text-gray-500">
					<div class=" flex items-center space-x-4">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Shop.svg/1200px-Shop.svg.png"
							alt="image"
							class="h-14 w-14 rounded-[20px] border"
						/>
						<div class=" text-xl text-gra">Sea Food</div>
					</div>
					<div class=" py-4">
						<input
							type="text"
							class=" text-gray-600 px-4 p-2 border-none outline-none appearance-none focus:outline-none focus:ring-0 w-full rounded-md leading-normal"
							placeholder="What's on your thought?"
						/>
					</div>
					<div
						class=" w-full h-[calc(40vh_-_20px)] min-h-[calc(85vh_-_80px)] overflow-y-auto"
					>
						<main class="">
							<ul class="">
								{#each photos as photo, index (photo.id)}
									<li class="relative pb-4">
										<img
											src={photo.data}
											alt="Photo"
											class="w-full h-full object-cover rounded-lg shadow"
										/>
										<button
											type="button"
											class="absolute top-2 right-2 px-2 rounded-full text-gray-500 p-2 bg-white shadow hover:bg-slate-50 hover:text-gray-800 group"
											on:click={() => deletePhoto(index)}
										>
											<CloseX />
											<div
												class="absolute duration-100 inset-0 w-full h-full transition-all scale-0 group-focus:scale-100 group-focus:bg-black/10 rounded-full"
											/>
										</button>
									</li>
								{/each}
								<li class=" flex relative justify-center py-8">
									{#if photos.length !== 0}
										<button
											on:click={() => {
												const fileInput = document.getElementById('photoInput');
												if (fileInput) {
													fileInput.click();
												}
											}}
											type="button"
											class=" flex items-center border-2 bg-white hover:bg-gray-100 text-gray-600 px-4 py-2 rounded-xl"
										>
											<div class=" text-gray-600">
												<PlusCircle />
											</div>
											<div class=" pl-2">Add more</div>
										</button>
									{/if}
								</li>
							</ul>
						</main>
					</div>
				</div>
				<input
					style="display:none"
					id="photoInput"
					type="file"
					accept="image/*"
					multiple
					on:change={handleImageUpload}
				/>

				<div
					class=" flex absolute bottom-4 left-0 right-0 justify-center space-x-3"
				>
					{#if photos.length === 0}
						<button
							on:click={() => {
								const fileInput = document.getElementById('photoInput');
								if (fileInput) {
									fileInput.click();
								}
							}}
							type="button"
							class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
						>
							<Image />
						</button>
						<button
							class=" px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-500"
						>
							<Cart />
						</button>
					{/if}
				</div>
			</div>
		</div>
	</form>
</div>
