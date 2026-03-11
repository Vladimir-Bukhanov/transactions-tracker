import { useContext } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io"
import { ModalContext } from '../context/ModalContext'

interface IModal {
	children: React.ReactNode
	title: string
}

export default function Modal({children, title}: IModal) {

	const {onClose} = useContext(ModalContext)

	return (
		<div className='fixed top-0 bottom-0 right-0 left-0 bg-black/60 z-999'>
			<div 
				className='bg-white w-[80%] max-w-150 min-w-100 p-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded text-black'
			>
				<h2 className='text-center mb-5 text-xl'>{title}</h2>
				<IoIosCloseCircleOutline 
					className='absolute top-5 right-5 text-2xl hover:text-red-400 ease duration-200 cursor-pointer'
					onClick={onClose}
				/>
				{children}
			</div>
		</div>
	)
}
