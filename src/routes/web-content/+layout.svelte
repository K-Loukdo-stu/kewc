<script>
	import { onMount } from "svelte";
	import { ensureSigned } from "$lib/middleware/auth";
	import { goto } from "$app/navigation";

	let signedIn = false;

	onMount(() => {
		ensureSigned()
			.then(() => {
				signedIn = true;
			})
			.catch(() => {
				goto("/auth");
			});
	});
</script>

{#if signedIn}
	<div class=" flex flex-col relative bg-gray-100 h-screen">
		<slot />
	</div>
{/if}
