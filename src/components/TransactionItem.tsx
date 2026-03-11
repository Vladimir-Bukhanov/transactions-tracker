import { useContext } from 'react'
import { FaLongArrowAltDown, FaLongArrowAltUp, FaRegTrashAlt } from "react-icons/fa"
import { ThemeContext } from '../context/ThemeContext'
import type { Transaction } from '../types/transaction'


interface ITransactionItem {
	item: Transaction
	onDelete: (id: number) => void
	onEdit: (item: Transaction) => void
}

export default function TransactionItem({item, onDelete, onEdit}: ITransactionItem) {

	const {theme} = useContext(ThemeContext)

	return (
		<div className='border p-3 relative flex flex-col mb-5 w-full mx-auto'>
			<div className='mb-2 cursor-pointer'>
				{item.type === "expense" ? 
				<p>
					<span className='mr-3'>Expense type:</span> 
					{item.title}
				</p> 
					:
				<p>
					<span className='mr-3'>Income type:</span> 
					{item.title}
				</p> 
				}
			</div>
			<p className='mb-3 flex'>
				<span className='mr-2'>Amount:</span>  
				<span className={`flex items-center ${item.type === "expense" ? 'text-red-400' : 'text-green-400'}`}>
					{item.amount} $ 
					{item.type === "expense" ? 
						<FaLongArrowAltDown /> 
						:
						<FaLongArrowAltUp />
					}
				</span>
			</p>
			<p className='mb-3'>Category: {item.category}</p>
			<p>Date: {item.date}</p>
			<FaRegTrashAlt
				className='absolute top-3 right-3 cursor-pointer hover:text-red-400 duration-200' 
				onClick={() => onDelete(item.id)}
			/>
			<button
				className={`border w-12 mt-3 cursor-pointer ease duration-200
				${theme === "light" ? "hover:bg-green-200" : "hover:bg-green-700"}`}
				onClick={() => onEdit(item)}
			>
				Edit
			</button>
		</div>
	)
}