export type Transaction = {
	id: number
	title: string
	amount: number | string
	type: "income" | "expense"
	category: string
	date: string
}

export type TransactionFormType = Omit<Transaction, 'id'> 