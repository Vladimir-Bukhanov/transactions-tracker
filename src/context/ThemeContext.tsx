import { createContext, useEffect, useState } from 'react'
import type { Theme } from '../types/theme'



interface IThemeContext {
	theme: Theme
	toggleTheme: () =>  void
}

interface IThemeState {
		children: React.ReactNode
}

export const ThemeContext = createContext<IThemeContext>({
	theme: "light",
	toggleTheme: () => {}
})




export default function ThemeState ({children}: IThemeState) {

	const [theme, setTheme] = useState<Theme>(() => {
		return (localStorage.getItem("theme") as Theme) || "light"
	})

	useEffect(() => {
		localStorage.setItem("theme", theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme(prev => prev === "light" ? "dark" : "light")
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)

}