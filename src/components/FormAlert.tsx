function FormAlert({ message }: { message: string }) {
  if (!message) return null

  return (
    <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
      {message}
    </p>
  )
}

export default FormAlert
