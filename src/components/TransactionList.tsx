import { AnimatePresence, motion } from 'framer-motion'
import type { Transaction } from '../types/transaction'
import TransactionItem from './TransactionItem'

interface ITransactionList {
	transactions: Transaction[]
	onDelete: (id: number) => void
	onEdit: (transaction: Transaction) => void
}

export default function TransactionList({transactions, onDelete, onEdit}: ITransactionList) {

	if (transactions.length === 0) {
		return <p className='text-xl mb-5'>You have no transactions...</p>
	}

	return (
		<AnimatePresence mode="popLayout">
			<ul>
				{transactions.map(transaction => (
					<motion.li
						key={transaction.id}
						layout
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
					>
						<TransactionItem
							item={transaction}
							onDelete={onDelete}
							onEdit={onEdit}
						/>
					</motion.li>
				))}
			</ul>
		</AnimatePresence>
	)
}
