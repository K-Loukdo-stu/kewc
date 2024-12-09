<script>
	import { page } from '$app/stores';
	import DesktopComputer from '$components/icons/DesktopComputer.svelte';
	import { afterUpdate } from 'svelte';
  
	export let href = '';
	export let tailwindClass = '';

	let active = false;
	afterUpdate(() => {
		active = $page.url.pathname == href;
	});
</script>

<a sveltekit:prefetch {href}>
	<div
		class={'transition duration-150 ease-in-out   p-2 px-4 w-full rounded-md hover:bg-gray-600 hover:text-white text-lg mb-1 ' +
			tailwindClass +
			' ' +
			(active ? 'bg-gray-600 text-white' : 'bg-white text-gray-600')}
	>
		<div class="flex">
			<div class="mx-auto">
				<DesktopComputer />
			</div>
		</div>
	</div>
</a>
