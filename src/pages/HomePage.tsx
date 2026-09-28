import { Link } from 'react-router'

const features = [
  { title: 'Bookings', description: 'Track reservations, check-ins, and check-outs in one place.' },
  { title: 'Rooms', description: 'Manage room types, availability, and housekeeping status.' },
  { title: 'Guests', description: 'Keep guest profiles, preferences, and stay history handy.' },
]

function HomePage() {
  return (
    <div className="min-h-svh bg-slate-100 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
            <span className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">S</span>
            S Star Hotels
          </Link>
          <div className="flex items-center gap-3 text-sm font-medium">
            <Link to="/login" className="px-3 py-2 text-slate-700 hover:text-indigo-600 dark:text-slate-300">
              Sign in
            </Link>
            <Link to="/signup" className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-20">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Manage S Star Hotels from one dashboard
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Bookings, rooms, and guests, all managed in a single place.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/signup"
              className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-500"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="rounded-lg bg-white px-5 py-3 font-medium text-slate-900 ring-1 ring-slate-300 hover:bg-slate-50 dark:bg-slate-900 dark:text-white dark:ring-slate-700"
            >
              Sign in
            </Link>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {features.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default HomePage
