<script>
	import SignOutIcon from '$components/icons/SignOut.svelte';
	import { goto } from '$app/navigation';
	import { user } from '$providers/stores/kauth/user';
	import { signOut } from '$providers/actions/kauth/auth';

	const onSignOut = async () => {
		const data = await signOut.load(fetch)

		if(data.success)
			goto('/auth');
		
	};
</script>

<div class="absolute left-0 right-0 top-0 z-50 bg-gray-50 p-2 shadow">
	<div class="flex relative">
		<div class=" flex m-auto font-bold text-gray-600 text-xl space-x-2">
			<span class=" bg-gray-700 text-gray-100 px-2 rounded ">KEWC</span>
			<div>Dashboard</div>
		</div>
		<div class="absolute right-5 top-0 bottom-0">
			<div class=" flex flex-row space-x-4">
				{#if $user && $user.firstName && $user.lastName}
					<button disabled class=" cursor-default font-semibold text-gray-700"
						>{$user.firstName + ' ' + $user.lastName}</button
					>
				{/if}
				<button on:click={onSignOut}>
					<div class="text-gray-500 hover:text-gray-700">
						<SignOutIcon/>
					</div>
				</button>
			</div>
		</div>
	</div>
</div>
