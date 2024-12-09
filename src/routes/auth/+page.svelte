<script>
	import { goto } from '$app/navigation';
	import LockClosed from '$components/icons/LockClosed.svelte';
	import { signIn } from '$providers/actions/kauth';
	import { fade } from 'svelte/transition';

	let email = '';
	let password = '';
	let errMsg = '';

	const onSignIn = async () => {
		try {
			await signIn.load({ email, password });
			goto('/dashboard');
		} catch (err) {
			errMsg = err.message;
			password = '';
		}
	};
</script>

<div class="h-screen flex justify-center bg-gray-50">
	<div class="m-auto rounded-md bg-white shadow">
		<div class="flex justify-center bg-gray-200 rounded-tl-lg rounded-tr-lg py-4">
			<div class="animate-bounce mx-auto text-gray-500">
				<LockClosed />
			</div>
		</div>
		<form on:submit|preventDefault={onSignIn} method="post">
			<div class="flex flex-col p-10 space-y-5">
				<input
					bind:value={email}
					name="email"
					type="text"
					class="transition duration-100 ease-in-out bg-gray-100 border text-gray-600 border-gray-200 rounded-lg h-10 w-72 focus:outline-none focus:ring-2 focus:ring-pink-200 px-2"
					placeholder="Email"
				/>
				<input
					bind:value={password}
					name="password"
					type="password"
					class="transition duration-100 ease-in-out bg-gray-100 border text-gray-600 border-gray-200 rounded-lg h-10 w-72 focus:outline-none focus:ring-2 focus:ring-pink-200 px-2"
					placeholder="Password"
				/>
				{#if errMsg}
					<div transition:fade class=" flex flex-col py-1 rounded-lg m-auto px-2">
						<p class="truncate w-60 text-sm self-center text-yellow-600 text-center">{errMsg}</p>
					</div>
				{/if}
				<div class="flex flex-col space-y-1">
					<button
						type="submit"
						class="transition duration-100 ease-in-out hover:bg-gray-700 w-full mx-auto bg-gray-600 px-10 py-2 font-bold text-white rounded-lg"
						>Sign In</button
					>
					<a
						href="#"
						class="transition duration-100 ease-in-out text-gray-400 text-sm self-end hover:text-gray-700 "
					>
						How can I create an account?
					</a>
				</div>
			</div>
		</form>
	</div>
</div>
