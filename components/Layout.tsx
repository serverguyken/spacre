import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { isBrowser, generateLoadingTime, TimeOut, OnLoad } from '../utils'
import { Spinner } from '../utils/loader'
import Sidebar from './Sidebar'
const Layout = ({ path, content_one, content_two }: any) => {
    const [rendered, setRendered] = useState(false)
    const { theme, setTheme } = useTheme()
    const setRender = () => {
        TimeOut(() => {
            setRendered(true)
        }, generateLoadingTime(1000, 2000))
    }
    useEffect(() => {
        if (isBrowser()) {
            setRender()
        }
    }, [])
    
    OnLoad(() => {
        let display_mode = localStorage.getItem('theme')
        if (display_mode === null) {
            localStorage.setItem('theme', 'light')
            setTheme('light')
        }
        else if (display_mode === 'dark') {
            setTheme('dark')
            if (isBrowser()) {
                document.body.classList.add('bg-darkMode')
            }
        } else {
            setTheme('light')
            if (isBrowser()) {
                document.body.classList.remove('bg-darkMode')
            }
        }
    })
    if (rendered) {
        return (
            <div className='sidebar_container_main max-w-[1200px] ml-auto mr-auto flex justify-between dark:bg-darkMode'>
                <div className='layout_sidebar fixed top-0 z-50 h-full bg-white dark:bg-darkMode'>
                    <Sidebar path={path} />
               </div>
                <main className='layout_contents_main main_container flex justify-between space-x-8 pl-44'>
                    <div className=''>
                        <div className=''>
                            <div className='layout_contents max-w-[600px] ml-auto mr-auto'>
                                <div className='border border-gray-100 dark:border-gray-50 dark:border-opacity-10'>
                                    {content_one}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[350px]'>
                        {
                            content_two && content_two
                        }
                    </div>
                </main>
            </div>
        )
    } else {
        return (
            <div className='w-20 m-auto flex justify-center items-center h-screen'>
                <Spinner width={24} color='var(--color-primary)'/>
            </div>
        )
    }
}

export default Layout