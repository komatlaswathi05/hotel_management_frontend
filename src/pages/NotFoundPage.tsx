import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-slate-100 px-4 text-center dark:bg-slate-950">
      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">404</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500">
        Go home
      </Link>
    </main>
  )
}

export default NotFoundPage
