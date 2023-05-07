<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	let mobileMenu = false;
	function handleClick() {
		mobileMenu = !mobileMenu;
	}
</script>

<header>
	<div class="corner">
		<a href="/"
			><svg
				width="2rem"
				stroke-width="1.5"
				height="2rem"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				color="#000000"
				><path
					d="M4 19V5a2 2 0 012-2h13.4a.6.6 0 01.6.6v13.114"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
				/><path
					d="M8 3v8l2.5-1.6L13 11V3"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><path
					d="M6 17h14M6 21h14"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
				/><path
					d="M6 21a2 2 0 110-4"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/></svg
			></a
		>
	</div>

	<button class="btn-mobile" on:click={handleClick}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-menu-2"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M4 6l16 0" />
			<path d="M4 12l16 0" />
			<path d="M4 18l16 0" />
		</svg>
	</button>

	<a href="/login" class="login-a"
		>Login <svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-login"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
			<path d="M20 12h-13l3 -3m0 6l-3 -3" />
		</svg></a
	>

	<div class={`flex flex-row nav-menu`}>
		<nav>
			<ul>
				<li aria-current={$page.url.pathname === '/search' ? 'page' : undefined}>
					<a href="/search"
						>Buscar <svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon icon-tabler icon-tabler-search"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
							<path d="M21 21l-6 -6" />
						</svg></a
					>
				</li>
				<li aria-current={$page.url.pathname.includes('/chapter') ? 'page' : undefined}>
					<a href="/chapter/rv1960/genesis/1"
						>Read <svg
							width="24px"
							height="24px"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
							<path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
							<path d="M3 6l0 13" />
							<path d="M12 6l0 13" />
							<path d="M21 6l0 13" />
						</svg></a
					>
				</li>
				<li aria-current={$page.url.pathname === '/notes' ? 'page' : undefined}>
					<a href="/notes"
						>Notes <svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M13 20l7 -7" />
							<path
								d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7"
							/>
						</svg></a
					>
				</li>
				<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
					<a href="/about"
						>FAQ <svg
							width={'24px'}
							height={'24px'}
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path
								d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"
							/>
							<path d="M12 16v.01" />
							<path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
						</svg>
					</a>
				</li>
			</ul>
		</nav>

		<div class="corner">
			<li aria-current={$page.url.pathname === '/login' ? 'page' : undefined}>
				<a href="/login"
					>Login <svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-login"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path
							d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
						/>
						<path d="M20 12h-13l3 -3m0 6l-3 -3" />
					</svg></a
				>
			</li>
		</div>
	</div>
</header>

{#if mobileMenu}
	<nav transition:fade={{ duration: 400 }} class="flex mobile-layout">
		<li class="link" aria-current={$page.url.pathname === '/search' ? 'page' : undefined}>
			<a href="/search"
				>Buscar<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-search"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
					<path d="M21 21l-6 -6" />
				</svg></a
			>
		</li>
		<li class="link" aria-current={$page.url.pathname.includes('/chapter') ? 'page' : undefined}>
			<a href="/chapter/rv1960/genesis/1"
				>Read <svg
					width="24px"
					height="24px"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
					<path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
					<path d="M3 6l0 13" />
					<path d="M12 6l0 13" />
					<path d="M21 6l0 13" />
				</svg></a
			>
		</li>
		<li class="link" aria-current={$page.url.pathname === '/notes' ? 'page' : undefined}>
			<a href="/notes"
				>Notes <svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M13 20l7 -7" />
					<path
						d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7"
					/>
				</svg></a
			>
		</li>
		<li class="link" aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
			<a href="/about"
				>FAQ
				<svg
					width={'24px'}
					height={'24px'}
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path
						d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"
					/>
					<path d="M12 16v.01" />
					<path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
				</svg>
			</a>
		</li>
	</nav>
{/if}

<style>
	header {
		display: flex;
		height: 3rem;
		padding: 2rem;
		font-size: larger;
		font-weight: bold;
		justify-content: space-evenly;
	}

	.corner {
		width: 5em;
		height: 3em;
	}

	.corner a {
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;
		justify-content: center;
	}

	.login-a {
		display: none;
	}

	li {
		list-style: none;
	}

	nav {
		display: flex;
		justify-content: center;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page'] > a > * {
		color: #36aff0;
	}

	nav a {
		display: flex;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	li:hover {
		color: #175d93;
	}

	.btn-mobile {
		display: none;
	}

	nav a:hover {
		color: #175d93;
	}

	@media (max-width: 620px) {
		.nav-menu {
			display: none;
		}

		.corner {
			position: fixed;
			left: 0;
			padding-left: 1rem;
			display: block;
		}

		.btn-mobile {
			position: fixed;
			right: 0;
			padding-right: 1rem;
			display: block;
		}

		.login-a {
			position: fixed;
			display: flex;
			align-items: center;
			right: 0;
			margin-right: 4rem;
		}

		.mobile-layout {
			display: grid;
			margin: 0;
			width: 100%;
			padding: 0;
			animation-delay: 2ms;
			transition: all 0.4s;
			font-size: x-large;
		}

		.link {
			display: grid;
			place-content: center;
			width: 100vw;
			margin: 0.3rem;
			font-size: larger;
		}

		header {
			height: 3rem;
			display: block;
			font-size: larger;
		}
	}
</style>
