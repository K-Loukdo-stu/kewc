<script>
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();
	export let checked = false;
</script>

<div class="flex items-center">
	<div class="flex items-center">
		<input
			type="checkbox"
			{checked}
			on:click={() => {
				checked = !checked;
				if (checked) {
					dispatch("check");
				} else {
					dispatch("uncheck");
				}
			}}
			class="w-7 h-7 cursor-pointer"
		/>
	</div>
</div>
