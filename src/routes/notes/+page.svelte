<script>
	import { user } from '@/state/user';
	import { onMount } from 'svelte';
	let loadingUser = true;
	let hasError = false;

	onMount(async () => {
		if ($user.loggedIn) {
			loadingUser = false;
		} else {
			const data = await fetch('https://bible-api.deno.dev/user', {
				method: 'GET',
				credentials: 'include'
			}).then((res) => {
				if (!res.ok) {
					hasError = true;
					return null;
				}
				return res.json();
			});

			if (!hasError) {
				loadingUser = false;
				user.set(data);
				return;
			} else {
				loadingUser = false;
			}
		}
	});
</script>

<h1>Notes</h1>

{#if loadingUser}
	<p>loading...</p>
{:else if !loadingUser && !hasError}
	<p>tag: {$user.tag}</p>
	<p>email: {$user.email}</p>
{/if}

{#if hasError}
	<p>Debes estar autenticado</p>
{/if}
