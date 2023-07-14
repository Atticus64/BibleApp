<script>
	import { goto } from '$app/navigation';
	import { user } from '@/state/user';
	import { toastAlert } from '../alert';

	const onSubmit = async (e) => {
		const formData = Object.fromEntries(new FormData(e.target));

		const response = await fetch('https://bible-api.deno.dev/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(formData)
		});

		if (response.ok) {
			await fetch('https://bible-api.deno.dev/user', {
				method: 'GET',
				credentials: 'include'
			})
				.then(async (res) => {
					if (res.ok) {
						const info = await res.json();
						user.set({
							email: info.email,
							tag: info.tag,
							loggedIn: true
						});
					}
				})
				.catch((err) => {
					return null;
				});

			goto('/');
		} else {
			const error = await response.json();
			if (error.message) {
				if (error.message.includes('User')) {
					toastAlert('El usuario ya existe, cambie el email or username', 'error');
					return;
				} else if (error.message.includes('Email')) {
				}
				toastAlert(error.message, 'error');
			}
			const message = error.issues
				? `Error en el campo ${error.issues[0].path[0]}`
				: 'Error al autenticarse';
			toastAlert(message, 'error');
		}
	};
</script>

<section class="dark:bg-gray-900">
	<wc-toast />
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
		<div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Crea tu cuenta
				</h1>
				<form class="space-y-4 md:space-y-6" on:submit|preventDefault={onSubmit}>
					<div>
						<label for="user" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Nombre de usuario
						</label>
						<input
							type="text"
							name="user"
							id="user"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="jorge"
							required
						/>
						<label
							for="email"
							class="block mb-2 my-2 text-sm font-medium text-gray-900 dark:text-white"
							>Tu correo</label
						>
						<input
							type="email"
							name="email"
							id="email"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="jorge@gmail.com"
							required
						/>
						<div>
							<label
								for="password"
								class="block mb-2 text-sm my-2 font-medium text-gray-900 dark:text-white"
								>Contraseña</label
							>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								required
							/>
						</div>
					</div>

					<button
						type="submit"
						class="w-full text-white bg-green-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-teal-700 dark:focus:ring-primary-800"
						>Create account</button
					>
				</form>
			</div>
		</div>
	</div>
</section>
