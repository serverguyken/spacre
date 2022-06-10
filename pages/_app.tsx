import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '../provider/userProvider'
import { ThemeProvider } from 'next-themes'
import { useTheme } from 'next-themes'
import { MantineProvider } from '@mantine/core'
import { isBrowser } from '../utils'
import { useState } from 'react'
import { OnLoad, StorageEvent } from '../utils'
function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme]: [any, any] = useState('light')
  if (theme) {
    if (isBrowser()) { 
      if (theme === 'dark') {
        document.body.classList.add('bg-darkMode')
      } else {
        document.body.classList.remove('bg-darkMode')
      }
    }
  }
  StorageEvent((event: any) => {
    let dsiplay_mode = localStorage.getItem('theme')
    if (dsiplay_mode === null) {
      localStorage.setItem('theme', 'light')
      dsiplay_mode = 'light'
      setTheme('light')
    }
    else {
      setTheme(dsiplay_mode)
    }
    if (dsiplay_mode === 'dark') {
      document.body.classList.add('bg-darkMode')
    } else {
      document.body.classList.remove('bg-darkMode')
    }
  })
  OnLoad(() => {
    let dsiplay_mode = localStorage.getItem('theme')
    if (dsiplay_mode === null) {
      localStorage.setItem('theme', 'light')
      dsiplay_mode = 'light'
      setTheme('light')
    }
    else if (dsiplay_mode === 'dark') {
      document.body.classList.add('bg-darkMode')
      setTheme('dark')
    } else {
      document.body.classList.remove('bg-darkMode')
      setTheme('light')
    }
  })

  return (
    <ThemeProvider attribute="class">
      <MantineProvider theme={{
        colorScheme: theme,
        colors: {
          dark: [
            '#C1C2C5',
            '#A6A7AB',
            '#909296',
            '#5C5F66',
            '#373A40',
            '#2C2E33',
            '#25262B',
            '#18191a', // modal body background color
            '#141517',
            '#273340', // modal background color
          ]
        },
      }}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </MantineProvider>
    </ThemeProvider>
  )
}

export default MyApp
