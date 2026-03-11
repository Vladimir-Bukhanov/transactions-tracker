import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import type { FilterType } from '../types/filterType'



interface IFilter {
	current: FilterType
	onChange: (item: FilterType) => void
}

export default function FilteredButtons({current, onChange}: IFilter) {

	const {theme} = useContext(ThemeContext)

	return (
		<div className='flex mb-5'>
			{(["All", "Income", "Expense"] as FilterType[]).map(item => (
				<button
					key={item}
					className={`mr-3 border w-18 cursor-pointer 
					${current === item && theme === "light" ? 'bg-blue-200' : ''}
					${current === item && theme === "dark" ? 'bg-blue-600' : ''}
					`}
					
					onClick={() => onChange(item)}
				>
					{item}
				</button>
			))}
		</div>
	)
}
