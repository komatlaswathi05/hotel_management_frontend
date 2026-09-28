import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import AuthLayout from '../components/AuthLayout'
import FormAlert from '../components/FormAlert'
import TextField from '../components/TextField'
import { getErrorMessage } from '../services/api'
import { authService } from '../services/authService'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim()) return setError('Email is required')
    if (!EMAIL_PATTERN.test(email)) return setError('Enter a valid email address')
    setError('')

    setSubmitting(true)
    setServerError('')
    try {
      await authService.forgotPassword(email.trim())
      setSubmitted(true)
    } catch (error) {
      setServerError(getErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  const backToLogin = (
    <>
      Remembered your password?{' '}
      <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
        Sign in
      </Link>
    </>
  )

  if (submitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="S Star Hotels password reset"
        footer={backToLogin}
      >
        <div className="space-y-5 text-center">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            If an account exists for <span className="font-medium text-slate-900 dark:text-white">{email}</span>,
            we've sent a link to reset your password.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Didn't get it? Try another email
          </button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a reset link"
      footer={backToLogin}
    >
      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        <FormAlert message={serverError} />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Sending…' : 'Send reset link'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
