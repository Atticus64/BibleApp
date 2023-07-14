<script>
	import { user } from '@/state/user';
	import { onMount } from 'svelte';
	import { toastAlert } from '../alert';
	import { notes } from '@/state/notes';
	let loadingNotes = true;
	let hasError = false;

	onMount(async () => {
		loadingNotes = false;

		if (!$user.loggedIn) {
			hasError = true;
			return;
		}

		await fetch('https://bible-api.deno.dev/notes', {
			headers: {
				'Content-Type': 'application/json',
				WithCredentials: 'include'
			},
			credentials: 'include'
		})
			.then(async (res) => {
				if (res.ok) {
					const info = await res.json();
					notes.set(info);
				} else {
					hasError = true;
				}
			})
			.catch((err) => {
				hasError = true;
				toastAlert(err, 'error');
				return;
			});

		loadingNotes = false;
	});
</script>

{#if loadingNotes}
	<p>loading...</p>
{:else if !loadingNotes && !hasError}
	{#if $notes.length === 0}
		<p>No hay notas</p>
	{:else}
		{#each $notes as note}
			<h4>{note.title}</h4>
			<p>{note.description}</p>
			<p>{note.body}</p>
			<p>{note.id}</p>
		{/each}
	{/if}
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
