import type { Transaction } from '../types/transaction'

export const calcBalance = (transactions: Transaction[]) => {

	const totalIncome = transactions?.filter(t => t.type === "income")
	.reduce((acc, c) => acc + Number(c.amount), 0)

	const totalExpenses = transactions?.filter(t => t.type === "expense")
		.reduce((acc, c) => acc + Number(c.amount), 0)

	const balance = totalIncome - totalExpenses

	return {
		totalIncome,
		totalExpenses,
		balance
	}
	
}