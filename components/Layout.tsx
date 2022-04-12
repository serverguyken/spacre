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
    return (
        <div className='layout_main dark:bg-darkMode'>
            <div className='layout_main_contents main_container max-w-[1200px] ml-auto mr-auto flex justify-between'>
                <div className='layout_sidebar fixed w-[210px] top-0 z-50 h-full bg-white dark:bg-darkMode'>
                    <Sidebar path={path} />
                </div>
                <main className='layout_contents_main relative left-[210px]'
                    style={{
                        width: 'calc(100% - 210px)'
                    }}>
                    <div className='layout_flex flex justify-between space-x-4 screen-sm:block screen-sm:space-x-0'>
                        <div className='layout_contents_one w-[75%] screen-sm:w-full'>
                            <div className='border border-gray-100 dark:border-gray-50 dark:border-opacity-10 screen-sm:border-none'>
                                {content_one}
                            </div>
                        </div>
                        <div className='layout_contents_two w-[35%]'>
                            {
                                content_two && content_two
                            }
                        </div>
                    </div>
                </main>
            </div>

        </div>
    )
}

export default Layout