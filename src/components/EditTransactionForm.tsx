import React, { useState } from 'react'
import type { Transaction } from '../types/transaction'

type EditType = {
	transaction: Transaction
	onSave: (t: Transaction) => void
	onCancel: () => void
}

export default function EditTransactionForm({transaction, onSave, onCancel}:EditType) {

	const [title, setTitle] = useState(transaction.title)
	const [amount, setAmount] = useState(transaction.amount)
	const [category, setCategory] = useState(transaction.category)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		onSave({
			...transaction,
			title,
			amount,
			category,
		})
	}

	return (
		<form
			onSubmit={handleSubmit}
		>
			<div className='fixed top-0 bottom-0 right-0 left-0 bg-black/60 z-999'>
				<div 
					className='bg-white w-[80%] max-w-150 min-w-100 p-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded text-black'
				>
					<div className='flex mb-4'>
						<p className='mr-2'>New title:</p>
						<input 
							type="text"
							className='border px-2 outline-0' 
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
					</div>
					<div className='flex mb-4'>
						<p className='mr-2'>New amount:</p>
						<input 
							type="number" 
							value={amount}
							className='border pl-2 outline-0'
							onChange={e => setAmount(Number(e.target.value))}
						/>
					</div>
					<div className='flex mb-4'>
						<p className='mr-2'>New category:</p>
						<input 
							type="text" 
							value={category}
							className='border px-2 outline-0'
							onChange={e => setCategory(e.target.value)}
						/>
					</div>
					<button
						type='submit'
						className='border w-16 cursor-pointer mr-5 hover:bg-green-300 ease duration-200'
					>
						Save
					</button>
					<button
						className='border w-16 cursor-pointer hover:bg-blue-300 ease duration-200'
						onClick={onCancel}
					>
						Cancel
					</button>
				</div>
			</div>
		</form>
	)
}
