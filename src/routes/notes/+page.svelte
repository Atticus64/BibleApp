<script>
	import { user } from '@/state/user';
	import { onMount } from 'svelte';
	let loadingUser = true;
	let hasError = false;

	onMount(async () => {
		if ($user.loggedIn) {
			loadingUser = false;
		} else {
			loadingUser = false;
			hasError = true;
		}
	});
</script>

{#if loadingUser}
	<p>loading...</p>
{:else if !loadingUser && !hasError && $user.loggedIn}
	<p>tag: {$user.tag}</p>
	<p>email: {$user.email}</p>
{/if}

{#if hasError}
	<section class="flex justify-center align-middle">
		<div class="flex flex-col">
			<h1 class="text-xl font-semibold">No puedes acceder a tus notas</h1>
			<p>Debes estar autenticado</p>

			<a href="/login" class="self-center my-4 bg-green-300 hover:bg-green-200 p-5">Go to Login</a>
		</div>
	</section>
{/if}
