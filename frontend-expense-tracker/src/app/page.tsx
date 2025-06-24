import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">Welcome to Expense Tracker</h1>
      <Link href="/expenses" className="text-blue-600 underline">
        View Expenses
      </Link>
    </main>
  )
}
