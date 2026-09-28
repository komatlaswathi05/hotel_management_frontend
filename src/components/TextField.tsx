import type { InputHTMLAttributes } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  error?: string
}

function TextField({ label, name, error, ...inputProps }: TextFieldProps) {
  const errorId = `${name}-error`

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`block w-full rounded-lg border bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:outline-none dark:bg-slate-800 dark:text-white ${
          error
            ? 'border-red-500 focus:ring-red-500/40'
            : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/40 dark:border-slate-700'
        }`}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export default TextField
