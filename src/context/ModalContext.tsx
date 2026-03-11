import React, { createContext, useState } from 'react'

interface IModalContext {
	modal: boolean
	onOpen: () => void
	onClose: () => void
}

interface IModalState {
	children: React.ReactNode
}

export const ModalContext = createContext<IModalContext>({
	modal: false,
	onOpen: () => {},
	onClose: () => {},

})

export default function ModalState({children}: IModalState) {

	const [modal, setModal] = useState<boolean>(false)

	const onOpen = () => {
		setModal(true)
	}

	const onClose = () => {
		setModal(false)
	}

	return (
		<ModalContext.Provider value={{modal, onClose, onOpen}}>
			{children}
		</ModalContext.Provider>
	)
}
