'use client'

import { useEffect, useState } from 'react'

interface Expense {
  id?: number
  date: string
  category: string
  description: string
  amount: number
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Expense>({
    date: '',
    category: '',
    description: '',
    amount: 0,
  })
  const [showModal, setShowModal] = useState(false)

  const fetchExpenses = async () => {
    const res = await fetch('http://localhost:8080/api/expenses')
    const data = await res.json()
    setExpenses(data)
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }))
  }

  const handleSubmit = async () => {
    const url = editingId
        ? `http://localhost:8080/api/expenses/${editingId}`
        : `http://localhost:8080/api/expenses`

    const method = editingId ? 'PUT' : 'POST'

    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
    })

    setForm({ date: '', category: '', description: '', amount: 0 })
    setShowModal(false)
    setEditingId(null)
    fetchExpenses()
  }


  const handleDelete = async (id: number) => {
    const confirmDelete = confirm('Are you sure you want to delete this expense?')
    if (!confirmDelete) return

    await fetch(`http://localhost:8080/api/expenses/${id}`, {
        method: 'DELETE',
    })

    fetchExpenses()
  }

  const handleEdit = (expense: Expense) => {
    setForm(expense)
    setEditingId(expense.id!)
    setShowModal(true)
  }



  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowModal(true)}
      >
        + Add Expense
      </button>

      <table className="w-full border">

        <thead className="bg-gray-100">
            <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Action</th>
            </tr>
        </thead>

        <tbody>
            {expenses.map(exp => (
                <tr key={exp.id}>
                <td className="border px-4 py-2">{exp.date}</td>
                <td className="border px-4 py-2">{exp.category}</td>
                <td className="border px-4 py-2">{exp.description}</td>
                <td className="border px-4 py-2">{exp.amount.toLocaleString()}</td>
                <td className="border px-4 py-2 text-center">
                    <button
                        onClick={() => handleEdit(exp)}
                        className="text-blue-600 hover:underline mr-2"
                    >
                        Edit
                    </button>

                    <button
                    onClick={() => handleDelete(exp.id!)}
                    className="text-red-600 hover:underline"
                    >
                    Delete
                    </button>
                </td>
                </tr>
            ))}
        </tbody>


      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

            <input
              name="date"
              type="date"
              className="w-full mb-2 p-2 border"
              value={form.date}
              onChange={handleChange}
            />
            <input
              name="category"
              placeholder="Category"
              className="w-full mb-2 p-2 border"
              value={form.category}
              onChange={handleChange}
            />
            <input
              name="description"
              placeholder="Description"
              className="w-full mb-2 p-2 border"
              value={form.description}
              onChange={handleChange}
            />
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              className="w-full mb-4 p-2 border"
              value={form.amount}
              onChange={handleChange}
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
