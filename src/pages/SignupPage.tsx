import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import AuthLayout from '../components/AuthLayout'
import FormAlert from '../components/FormAlert'
import TextField from '../components/TextField'
import { getErrorMessage } from '../services/api'
import { authService } from '../services/authService'

type SignupForm = {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

type SignupErrors = Partial<Record<keyof SignupForm | 'terms', string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^\+?[0-9\s-]{7,15}$/

const initialForm: SignupForm = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<SignupForm>(initialForm)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState<SignupErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function validate(): SignupErrors {
    const next: SignupErrors = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!EMAIL_PATTERN.test(form.email)) next.email = 'Enter a valid email address'
    if (form.phone && !PHONE_PATTERN.test(form.phone)) next.phone = 'Enter a valid phone number'
    if (!form.password) next.password = 'Password is required'
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters'
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match'
    if (!acceptedTerms) next.terms = 'You must accept the terms to continue'
    return next
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setServerError('')
    try {
      await authService.signup({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        password: form.password,
      })
      navigate('/login')
    } catch (error) {
      setServerError(getErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join S Star Hotels to manage bookings, rooms, and guests"
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Sign in
          </Link>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        <FormAlert message={serverError} />
        <TextField
          label="Full name"
          name="fullName"
          autoComplete="name"
          placeholder="Jane Doe"
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          label="Phone (optional)"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <TextField
            label="Confirm password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
        </div>

        <div>
          <label className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 size-4 rounded border-slate-300 accent-indigo-600"
            />
            <span>
              I agree to the{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.terms && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.terms}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default SignupPage
