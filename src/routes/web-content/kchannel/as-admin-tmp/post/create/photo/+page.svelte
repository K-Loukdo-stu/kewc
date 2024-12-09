<script>
	// import CreateNewFeed from '$components/elements/post/create/CreateNewFeed.svelte';
	import CloseX from '$components/icons/Close/CloseX.svelte';
	import Image from '$components/icons/Image/Image.svelte';
	import Cart from '$components/icons/Shop/Cart.svelte';
	import { onMount } from 'svelte';
	let selectedImages = [];
	let uploadedImages = [];
	let imageInputs = [{ id: 1, value: '' }];

	function addImageInput() {
		const newId = imageInputs.length + 1;
		imageInputs = [...imageInputs, { id: newId, value: '' }];
	}

	// function handleFileChange(event) {
	// 	const files = event.target.files;
	// 	selectedImages = Array.from(files);
	// }
	function handleImageChange(event, id) {
		const inputValue = event.target.value;
		imageInputs = imageInputs.map((input) => {
			if (input.id === id) {
				return { ...input, value: inputValue };
			}
			return input;
		});
		selectedImages = Array.from(files);
	}

	function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData();
		for (let i = 0; i < selectedImages.length; i++) {
			formData.append('images', selectedImages[i]);
		}

		fetch('/upload', {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				// Assuming the server responds with the URLs of the uploaded images
				uploadedImages = data.images;
			})
			.catch((error) => {
				console.error(error);
			});
	}
	function handleDelete(index) {
		const imageToDelete = uploadedImages[index];

		fetch(`/delete/${imageToDelete}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.ok) {
					uploadedImages.splice(index, 1);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}
	onMount(() => {
		// Fetch the initial set of upload images
		fetch('/upload-images')
			.then((response) => response.json())
			.then((data) => {
				uploadedImages = data.image;
			})
			.catch((error) => {
				console.error(error);
			});
	});
</script>

<!-- TODO: check by form -->
<div class=" w-full h-full bg-gray-300 flex justify-center">
	<!-- <CreateNewFeed /> -->
	<div class=" w-[650px] bg-[#F0F0F0]">
		<form on:submit={handleSubmit}>
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
			<div class=" w-full h-full px-4 pt-4">
				<div class=" text-gray-500">
					<div class=" flex items-center space-x-4">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Shop.svg/1200px-Shop.svg.png"
							alt="image"
							class="h-14 w-14 rounded-[20px] border"
						/>
						<div class=" text-xl text-gra">Sea Food</div>
					</div>
					<div class=" py-4">What's on your thought?</div>
					<div class=" w-full max-h-[70vh] overflow-y-auto">
						<!-- {#each selectedImages as image, index}
							<div class=" relative pb-4">
								<img
									src={URL.createObjectURL(image)}
									alt={`Image ${index}`}
									class="w-42 h-42 mr-2 rounded-md"
								/>
								<div class=" absolute top-2 right-3">
									<button
										on:click={() => handleDelete(index)}
										class="text-gray-500 relative p-1 bg-white rounded-full shadow hover:bg-slate-50 hover:text-gray-800 group"
										><CloseX />
										<div
											class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-focus:scale-100 group-focus:bg-black/10 rounded-full"
										/>
									</button>
								</div>
							</div>
						{/each} -->
						{#each imageInputs as input, index}
							<div class=" relative pb-4">
								<!-- <img
									src={URL.createObjectURL(input)}
									alt={`Image ${index}`}
									class="w-42 h-42 mr-2 rounded-md"
								/> -->
								<input
									type="file"
									on:change={(e) => handleImageChange(e, input.id)}
								/>
								<div class=" absolute top-2 right-3">
									<button
										on:click={() => handleDelete(index)}
										class="text-gray-500 relative p-1 bg-white rounded-full shadow hover:bg-slate-50 hover:text-gray-800 group"
										><CloseX />
										<div
											class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-focus:scale-100 group-focus:bg-black/10 rounded-full"
										/>
									</button>
								</div>
							</div>
						{/each}
						<button type="button" on:click={addImageInput}
							>Add More Images</button
						>
					</div>
				</div>

				<div
					class=" flex absolute bottom-4 left-0 right-0 justify-center space-x-3"
				>
					<!-- <input
						style="display:none"
						accept=".jpg, .jpeg, .png"
						type="file"
						multiple
						on:change={handleFileChange}
						bind:this={uploadedImages}
					/> -->
					<button
						on:click={() => {
							uploadedImages.click();
						}}
						class=" px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-500"
						><Image /></button
					>

					<button
						class=" px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-500"
					>
						<Cart />
					</button>
				</div>
			</div>
		</form>
	</div>
</div>

<!-- 
<script>
	
	import CloseX from '$components/icons/Close/CloseX.svelte';
	import Image from '$components/icons/Image/Image.svelte';
	import Cart from '$components/icons/Shop/Cart.svelte';
	import { onMount } from 'svelte';
	let selectedImages = [];
	let uploadedImages = [];
	// let selectedImages = [{ id: 1, value: '' }];

	// function addImageInput() {
	// 	const newId = selectedImages.length + 1;
	// 	selectedImages = [...selectedImages, { id: newId, value: '' }];
	// }

	function handleFileChange(event) {
		const files = event.target.files;
		selectedImages = Array.from(files);
	}
	// function handleFileChange(event, id) {
	// 	const files = event.target.value;
	// 	selectedImages = selectedImages.map((input) => {
	// 		if (input.id === id) {
	// 			return { ...input, value: files };
	// 		}
	// 		return input;
	// 	});
	// }

	function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData();
		for (let i = 0; i < selectedImages.length; i++) {
			formData.append('images', selectedImages[i]);
		}

		fetch('/upload', {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				// Assuming the server responds with the URLs of the uploaded images
				uploadedImages = data.images;
			})
			.catch((error) => {
				console.error(error);
			});
	}
	function handleDelete(index) {
		const imageToDelete = uploadedImages[index];

		fetch(`/delete/${imageToDelete}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.ok) {
					uploadedImages.splice(index, 1);
				}
			})
			.catch((error) => {
				console.error(error);
			});
		// imageToDelete.splice(index, 1);
	}
	onMount(() => {
		// Fetch the initial set of upload images
		fetch('/upload-images')
			.then((response) => response.json())
			.then((data) => {
				uploadedImages = data.image;
			})
			.catch((error) => {
				console.error(error);
			});
		// handleFileChange();
	});
</script>
 -->
<!-- TODO: check by form -->
<div class=" w-full h-full bg-gray-300 flex justify-center">
	<!-- <CreateNewFeed /> -->
	<div class=" w-[650px] bg-[#F0F0F0]">
		<form on:submit={handleSubmit}>
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
			<div class=" w-full h-full px-4 pt-4">
				<div class=" text-gray-500">
					<div class=" flex items-center space-x-4">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Shop.svg/1200px-Shop.svg.png"
							alt="image"
							class="h-14 w-14 rounded-[20px] border"
						/>
						<div class=" text-xl text-gra">Sea Food</div>
					</div>
					<div class=" py-4">What's on your thought?</div>
					<div class=" w-full max-h-[70vh] overflow-y-auto">
						{#each selectedImages as image, index}
							<div class=" relative pb-4">
								<img
									src={URL.createObjectURL(image)}
									alt={`Image ${index}`}
									class="w-42 h-42 mr-2 rounded-md"
								/>

								<div class=" absolute top-2 right-3">
									<button
										on:click={() => handleDelete(index)}
										class="text-gray-500 relative p-1 bg-white rounded-full shadow hover:bg-slate-50 hover:text-gray-800 group"
										><CloseX />
										<div
											class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-focus:scale-100 group-focus:bg-black/10 rounded-full"
										/>
									</button>
								</div>
							</div>
						{/each}
						<!-- <button type="button" on:click={addImageInput}
							>Add More Images</button
						> -->
					</div>
				</div>

				<div
					class=" flex absolute bottom-4 left-0 right-0 justify-center space-x-3"
				>
					<input
						style="display:none"
						accept=".jpg, .jpeg, .png"
						type="file"
						multiple
						on:change={handleFileChange}
						bind:this={uploadedImages}
					/>
					<button
						on:click={() => {
							uploadedImages.click();
						}}
						class=" px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-500"
						><Image /></button
					>

					<button
						class=" px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-500"
					>
						<Cart />
					</button>
				</div>
			</div>
		</form>
	</div>
</div>
