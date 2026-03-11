import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import type { SortType } from '../types/sortType'

interface ISort {
	current: SortType
	onSorted: (item: SortType) => void
}

export default function SortedButtons({current, onSorted}: ISort) {

	const {theme} = useContext(ThemeContext)

	return (
		<div className='flex flex-col mb-2'>
			{(["date", "price", "alphabet"] as SortType[]).map(item => (
				<button
					key={item}
					className={`mb-3 border w-36 cursor-pointer 
					${current === item && theme === "light" ? 'bg-blue-200' : ''}
					${current === item && theme === "dark" ? 'bg-blue-600' : ''}
					`}
					onClick={() => onSorted(item)}
				>
					Sorted by {item}
				</button>
			))}
		</div>
	)
}
