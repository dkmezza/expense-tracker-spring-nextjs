'use client'

import { useEffect, useState } from 'react'

interface Expense {
  id: number
  date: string
  category: string
  description: string
  amount: number
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    fetch('http://localhost:8080/api/expenses')
      .then(res => res.json())
      .then(data => setExpenses(data))
  }, [])

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Amount (TZS)</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td className="border px-4 py-2">{exp.date}</td>
              <td className="border px-4 py-2">{exp.category}</td>
              <td className="border px-4 py-2">{exp.description}</td>
              <td className="border px-4 py-2">{exp.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
