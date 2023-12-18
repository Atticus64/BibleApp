<script>
  import { goto } from '$app/navigation'
  import { singUp, updateUserInfo } from '@/services/api/auth'

  /**
   * @param {Event & { readonly submitter: HTMLElement | null }} event
   */
  async function onSubmit(event) {
    const form = event.target
    if (!(form instanceof HTMLFormElement)) return

    const formData = Object.fromEntries(new FormData(form))
    const response = await singUp(formData)

	if (!response.ok) {
		return
	}
	
    await updateUserInfo()

    goto('/')
  }
</script>

<section>
  <wc-toast />
  <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
    <div
      class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
    >
      <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl"
        >
          Crea tu cuenta
        </h1>
        <form class="space-y-4 md:space-y-6" on:submit|preventDefault={onSubmit}>
          <div>
            <label for="user" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >Nombre de usuario
            </label>
            <input
              type="text"
              name="user"
              id="user"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              placeholder="jorge"
              required
            />
            <label
              for="email"
              class="my-2 mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >Tu correo</label
            >
            <input
              type="email"
              name="email"
              id="email"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              placeholder="jorge@gmail.com"
              required
            />
            <div>
              <label
                for="password"
                class="my-2 mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >Contraseña</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="focus:ring-primary-300 dark:focus:ring-primary-800 w-full rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-4 dark:bg-green-600 dark:hover:bg-teal-700"
            >Create account</button
          >
        </form>
      </div>
    </div>
  </div>
</section>
