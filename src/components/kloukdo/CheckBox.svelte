<script>
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	export let title;
	export let checked = false;
</script>

<div class="flex items-center">
	<div class="flex items-center">
		<input
        name="discount"
			type="checkbox"
			{checked}
			on:click={() => {
				checked = !checked;
				if (checked) {
					dispatch('check');
				} else {
					dispatch('uncheck');
				}
			}}
			class="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 cursor-pointer"
		/>
		<label
			for="discount"
			class="ml-2 text-sm font-medium text-gray-600 cursor-pointer"
			>{title}</label
		>
	</div>
</div>
