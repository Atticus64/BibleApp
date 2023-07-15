<script>
	import { user } from '@/state/user';
	import { onMount } from 'svelte';
	import { toastAlert } from '../alert';
	import { notes } from '@/state/notes';
	import Button from '@/components/Button.svelte';
	let loadingNotes = true;
	let hasError = false;

	onMount(async () => {
		if ($user.loggedIn) {
			loadingNotes = false;
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
		<ul>
			{#each $notes as note}
				<li
					class="base-card block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
				>
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{note.title}
					</h5>
					<p class="font-normal text-gray-700 dark:text-gray-400">
						{note.description}
					</p>
					<div class="flex align-middle justify-end gap-4 m-4">
						<Button>Eliminar nota</Button>
						<Button>Ver nota</Button>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
{/if}

{#if hasError}
	<section class="flex justify-center align-middle">
		<div class="flex flex-col">
			<h1 class="text-xl font-semibold">No puedes acceder a tus notas</h1>
			<p>Debes estar autenticado</p>

			<a
				href="/login"
				class="self-center my-4 bg-green-300 font-semibold hover:bg-green-200 dark:bg-teal-200 dark:hover:bg-teal-400 text-black transition-colors', p-5"
				>Go to Login</a
			>
		</div>
	</section>
{/if}

<style>
	.base-card {
		list-style: none;
	}
</style>
