import { useContext, useState, type FormEvent } from 'react'
import { ModalContext } from '../context/ModalContext'
import type { TransactionFormType } from '../types/transaction'


const initialFields: TransactionFormType = {
	title: '',
	amount: '',
	type: 'income',
	category: '',
	date: ''
}

interface ITransactionForm {
	addTransaction: (transaction: TransactionFormType) => void
}

export default function TransactionForm({addTransaction}: ITransactionForm) {

	const [formFields, setFormFields] = useState<TransactionFormType>(initialFields)

	const [error, setError] = useState<string>('')

	const {onClose} = useContext(ModalContext)

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		
		if (
			formFields.title.trim() === "" ||
			formFields.amount.toString().trim() === "" ||
			formFields.category.trim() === "" ||
			formFields.date.trim() === ""
		) {
			setError('Please, fill in all fields...')
			return
		}

		setFormFields(initialFields)
		addTransaction(formFields)
		onClose()
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		
		setError('')
		const {name, value} = e.target

		setFormFields(prev => ({...prev, [name]: value}))
	}


	return (
		<form 
			onSubmit={handleSubmit}
		>
			<div>
				<input 
					className='block border px-3 w-full mb-3 outline-0'
					type="text"
					name="title"
					placeholder='Enter title...'
					value={formFields.title}
					onChange={handleChange} 
				/>
				<input 
					className='block border px-3 w-full mb-3 outline-0'
					type="number"
					name='amount'
					min='0'
					placeholder='Enter amount, $'
					value={formFields.amount}
					onChange={handleChange}
				/>
				<input 
					className='block border px-3 w-full mb-3 outline-0'
					name='category'
					type="text"
					placeholder='Enter category...'
					value={formFields.category}
					onChange={handleChange} 
				/>
				<input 
					className='block border px-3 w-full mb-3 outline-0'
					name='date'
					type="date"
					value={formFields.date}
					placeholder='Enter date...' 
					onChange={handleChange}
				/>
				<select 
					className='block border px-3 w-full mb-3 outline-0'
					name='type'
					value={formFields.type}
					onChange={handleChange}
				>
					<option value="income">Income</option>
					<option value="expense">Expense</option>
				</select>
			</div>
			<button
			className='border px-3 cursor-pointer hover:bg-blue-400 duration-200'
				type='submit'
			>
				Add
			</button>
			{error && <p className='text-red-500'>{error}</p>}
		</form>
	)
}
