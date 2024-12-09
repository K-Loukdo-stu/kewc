<script>
	// import CreateNewFeed from '$components/elements/post/create/CreateNewFeed.svelte';
	import CloseX from '$components/icons/Close/CloseX.svelte';
	import Image from '$components/icons/Image/Image.svelte';
	import Cart from '$components/icons/Shop/Cart.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();

	let todos = [];
	let todoText = '';
	let todoImages = [];
	let selectedTodo = null;
	let updateTodoText = '';

	function createTodo() {
		const newTodo = { id: Date.now(), text: todoText, images: [...todoImages] };
		todos = [...todos, newTodo];
		todoText = '';
		todoImages = [];
	}

	function deleteTodoImage(todoId, imageIndex) {
		todos = todos.map((todo) => {
			if (todo.id === todoId) {
				todo.images.splice(imageIndex, 1);
			}
			return todo;
		});
	}

	function deleteTodo(id) {
		todos = todos.filter((todo) => todo.id !== id);
	}

	function updateTodo() {
		if (selectedTodo) {
			selectedTodo.text = updateTodoText;
			todos = todos.map((todo) =>
				todo.id === selectedTodo.id ? selectedTodo : todo
			);
			selectedTodo = null;
			updateTodoText = '';
		}
	}

	function handleImageUpload(event) {
		const files = event.target.files;
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();
			reader.onload = () => {
				todoImages = [...todoImages, reader.result];
			};
			reader.readAsDataURL(file);
		}
	}

	function addMorePhotos() {
		if (selectedTodo) {
			const files = event.target.files;
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				const reader = new FileReader();
				reader.onload = () => {
					selectedTodo.images = [...selectedTodo.images, reader.result];
				};
				reader.readAsDataURL(file);
			}
		}
	}
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
			<div class=" w-full h-full px-4 pt-4 bg-white">
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
							class=" text-gray-600 px-4 p-2 border-none outline-none appearance-none focus:outline-none focus:ring-0 w-full rounded-md"
							placeholder="Enter a new todo..."
							bind:value={todoText}
						/>
					</div>
					<div class=" w-full max-h-[70vh] overflow-y-auto">
						<main class="p-4">
							{#if todos.length === 0}
								<p>No todos found.</p>
							{:else}
								<ul class="space-y-4">
									{#each todos as todo (todo.id)}
										<li class="flex flex-col items-center space-x-4">
											<div class=" space-x-2">
												{#each todo.images as image, index (image)}
													<div class="mr-2 rounded-md">
														<img
															src={image}
															alt="Todo Image"
															class="w-full h-full object-cover rounded-md"
														/>
														<button
															type="button"
															class="text-red-500"
															on:click={() => deleteTodoImage(todo.id, index)}
														>
															Delete
														</button>
													</div>
												{/each}
											</div>

											<div class="flex-1">
												{#if selectedTodo && selectedTodo.id === todo.id}
													<input
														type="text"
														class="rounded-lg p-2 w-full"
														bind:value={updateTodoText}
													/>
												{:else}
													<div class="font-semibold">{todo.text}</div>
												{/if}
												<div class="text-sm text-gray-500">ID: {todo.id}</div>
											</div>

											<div class="flex space-x-2">
												{#if selectedTodo && selectedTodo.id === todo.id}
													<button
														type="button"
														class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
														on:click={updateTodo}
														disabled={updateTodoText}
													>
														Save
													</button>
													<!-- <button
														type="button"
														class="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg"
														on:click={() => {
															selectedTodo = null;
															updateTodoText = '';
														}}
													>
														Cancel
													</button> -->
												{:else}
													<button
														type="button"
														class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg"
														on:click={() => {
															selectedTodo = todo;
															updateTodoText = todo.text;
														}}
													>
														Update
													</button>
													<button
														type="button"
														class="text-red-500"
														on:click={() => deleteTodo(todo.id)}
													>
														Delete
													</button>
												{/if}
											</div>
										</li>
									{/each}
								</ul>
							{/if}

							<input
								type="file"
								accept="image/*"
								multiple
								on:change={handleImageUpload}
							/>

							{#if selectedTodo}
								<input
									type="file"
									accept="image/*"
									multiple
									on:change={addMorePhotos}
								/>
								<button
									type="button"
									class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
									on:click={updateTodo}
									disabled={updateTodoText}
								>
									Update
								</button>
							{:else}
								<button
									type="button"
									class="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg"
									on:click={createTodo}
									disabled={!todoText || todoImages.length === 0}
								>
									Add
								</button>
							{/if}
						</main>
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
						on:click={createTodo}
						class=" px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-500"
						><Image /></button
					>

					<button
						on:click={selectedTodo}
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
		</div>
	</form>
</div>
