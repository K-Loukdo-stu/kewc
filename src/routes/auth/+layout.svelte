<script>
	import { goto } from "$app/navigation";
	import { ensureSigned } from "$lib/middleware/auth";
	import { onMount } from "svelte";

	let ready = false;
	onMount(async () => {
		try {
			await ensureSigned();
			goto("/dashboard");
		} catch (error) {
			ready = true;
		}
	});
</script>

<div>
	{#if ready}
		<slot />
	{/if}
</div>
