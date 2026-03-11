import { useContext, useEffect, useMemo, useState } from 'react'
import EditTransactionForm from './components/EditTransactionForm'
import FilteredButtons from './components/FilteredButtons'
import Modal from './components/Modal'
import SortedButtons from './components/SortedButtons'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { ModalContext } from './context/ModalContext'
import { ThemeContext } from './context/ThemeContext'
import type { FilterType } from './types/filterType'
import type { SortType } from './types/sortType'
import type { Transaction, TransactionFormType } from './types/transaction'
import { calcBalance } from './utils/calcBalance'



export default function App() {

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions')
    if (saved) {
      const parsed = JSON.parse(saved) 
      return parsed.length > 0 ? parsed : []
    }
  })

  const [searchTerm, setSearchTerm] = useState<string>('')

  const [filterBtn, setFilterBtn] = useState<FilterType>(() => {
    return (localStorage.getItem("filter") as FilterType) || "All"
  })

  const [sortBtn, setSortBtn] = useState<SortType>(() => {
    return (localStorage.getItem("sort") as SortType) || "date"
  })

  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const {balance, totalIncome, totalExpenses} = useMemo(() => {
    return calcBalance(transactions)
  }, [transactions])

  const {modal, onOpen} = useContext(ModalContext)
  const {theme, toggleTheme} = useContext(ThemeContext)

  useEffect(() => {
    document.body.setAttribute("data-theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem("filter", filterBtn)
  }, [filterBtn])

  useEffect(() => {
    localStorage.setItem("sort", sortBtn)
  }, [sortBtn])

  const onDelete = (id: number) => {
    setTransactions(prev => prev?.filter(t => t.id !== id))
  }

  const addTransaction = (formFields: TransactionFormType) => {

    const newTransaction: Transaction = {
      id: Date.now(),
      title: formFields.title,
      amount: formFields.amount,
      type: formFields.type,
      category: formFields.category,
      date: formFields.date
    }

    setTransactions(prev => [...prev, newTransaction])
  }

  const filteredByType = transactions?.filter(t => {

    if (filterBtn === "Expense") {
      return t.type === "expense"
    } else if (filterBtn === "Income") {
      return t.type === "income"
    }

    return true
  })

  const filteredTransactions = useMemo(() => {
  return filteredByType?.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
}, [searchTerm, transactions, filterBtn])


  const sortedTransactions = useMemo(() => (

    [...filteredTransactions].sort((a, b) => {
    if (sortBtn === "alphabet") {
      return a.title.localeCompare(b.title)
    } else if (sortBtn === "price") {
      return Number(b.amount) - Number(a.amount)
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    }
  })
  ), [sortBtn, filterBtn, searchTerm, transactions])

  const handleUpdate = (updatedTransaction: Transaction) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === updatedTransaction.id ?
        updatedTransaction : transaction
      )
    )

    setEditingTransaction(null)

  }

  return (
    <div className='w-[90%] max-w-200 mx-auto min-w-90 mt-10'>
      <h1 className='text-center mb-5 text-xl'>
        Finance Tracker
      </h1>
      <input 
        type="text"
        placeholder='Search transaction by title...'
        className={`w-full border outline-0 px-2 mb-3
        ${theme === "light" ? "text-black placeholder:text-black/60" : "text-white placeholder:text-white/60"}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='mb-5'>
        <div className='flex'>
          Current Balance: 
          <span className={`ml-2 ${balance < 0 ? 'text-red-400' : 'text-green-400'}`}>
            {balance} $
          </span>
        </div>
        <div>Total Income: 
          <span className='ml-2 text-green-400'>{totalIncome} $</span>
        </div>
        <div>Total Expenses: 
          <span className='ml-2 text-red-400'>{totalExpenses} $</span>
        </div>
      </div>
      <FilteredButtons 
        current={filterBtn}
        onChange={setFilterBtn}
      />
      <SortedButtons 
        current={sortBtn}
        onSorted={setSortBtn}
      />
      <button
        onClick={toggleTheme}
        className={`border mb-5 px-2 cursor-pointer 
        ${theme === "light" ? "hover:bg-blue-200" : "hover:bg-blue-600"} ease duration-200`}
      >
        Toggle Theme
      </button>
      {modal && 
        <Modal 
          title='Add new transaction'
        >
          <TransactionForm 
            addTransaction={addTransaction}
          />
        </Modal>
      }
      { editingTransaction && (
        <EditTransactionForm 
          transaction={editingTransaction}
          onSave={handleUpdate}
          onCancel={() => setEditingTransaction(null)}
        />
      ) 
      }
      <TransactionList 
        transactions={sortedTransactions}
        onDelete={onDelete}
        onEdit={setEditingTransaction}
      />
      <button 
        className='w-16 h-16 rounded-[50%] bg-orange-400 text-white text-3xl flex items-center justify-center fixed bottom-10 right-10 cursor-pointer hover:bg-red-400 duration-200'
        onClick={onOpen}
      >
        +
      </button>
    </div>
  )
}

