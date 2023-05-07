<script>
	import { page } from '$app/stores';
	import github from '$lib/images/github.svg';
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
	<nav class="">
		<ul>
			<li aria-current={$page.url.pathname === '/search' ? 'page' : undefined}>
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
</header>

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
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
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
		height: 3em;
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

	nav a:hover {
		color: #175d93;
	}
</style>
