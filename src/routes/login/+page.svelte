<script>
  import { goto } from '$app/navigation'
  import { user } from '@/state/user'
  import { toastAlert } from '../alert'

  const onSubmit = async (e) => {
    const formData = Object.fromEntries(new FormData(e.target))

    const response = await fetch('https://bible-api.deno.dev/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      await fetch('https://bible-api.deno.dev/user', {
        method: 'GET',
        credentials: 'include'
      })
        .then(async (res) => {
          if (res.ok) {
            const info = await res.json()
            user.set({
              email: info.email,
              tag: info.tag,
              loggedIn: true
            })
          }
        })
        .catch((err) => {
          toastAlert(err, 'error')
          return
        })
      goto('/')
    } else {
      const error = await response.json()
      if (error.message) {
        if (error.message.includes('User')) {
          toastAlert('El usuario no existe', 'error')
          return
        }
        toastAlert(error.message, 'error')
      }
      const message = error.issues
        ? `Error en el campo ${error.issues[0].path[0]}`
        : 'Error al autenticarse'
      toastAlert(message, 'error')
    }
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
          Inicia Sesión con tu cuenta
        </h1>
        <form class="space-y-4 md:space-y-6" on:submit|preventDefault={onSubmit}>
          <div>
            <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >Email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Contraseña</label
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

          <button
            type="submit"
            class="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4"
            >Iniciar Sesión</button
          >
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            No tienes cuenta aún? <a
              href="/signup"
              class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >Crear cuenta</a
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
