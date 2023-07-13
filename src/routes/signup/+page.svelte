<script>
	const onSubmit = async (e) => {
		const formData = Object.fromEntries(new FormData(e.target));

		const response = await fetch('https://bible-api.deno.dev/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				credentials: 'same-origin'
			},
			body: JSON.stringify(formData)
		});

		console.log(await response.json());
	};
</script>

<section class="flex justify-center align-middle">
	<div class="flex flex-col w-4/5 items-center">
		<h1>Signup</h1>

		<form class="flex flex-col" on:submit|preventDefault={onSubmit}>
			<label for="user">Username</label>
			<input id="user" name="user" placeholder="Username" />
			<label for="email">Email</label>
			<input id="email" type="email" name="email" placeholder="Enter your email" />
			<label for="password">Password</label>
			<input id="password" type="password" name="password" placeholder="Enter your password" />
			<input type="submit" value="create" />
		</form>
	</div>
</section>
