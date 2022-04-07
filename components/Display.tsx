import type { GetServerSideProps } from 'next'
import { isBrowser, print } from '../utils'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { DefaultButton } from './Buttons'
import { setClass, OnLoad, StorageEvent } from '../utils/'
import { CheckCircleIcon } from '@heroicons/react/solid'



const Display = () => {
    const [light, setLight] = useState(false)
    const [dark, setDark] = useState(false)
    const { theme, setTheme } = useTheme()
    const handleTheme = (display_mode: string) => {
        if (display_mode === 'light') {
            setTheme('light')
            setLight(true) 
            setDark(false)
            if (isBrowser()) {
                localStorage.setItem('theme', 'light')
                document.body.classList.remove('bg-darkMode')
            }
        } else if (display_mode === 'dark') {
            setTheme('dark')
            setDark(true)
            setLight(false)
            if (isBrowser()) {
                localStorage.setItem('theme', 'dark')
                document.body.classList.add('bg-darkMode')
            }
        }
    }
    OnLoad(() => {
        let dsiplay_mode = localStorage.getItem('theme')
        if (dsiplay_mode === null) {
            localStorage.setItem('theme', 'light')
            setTheme('light')
            setLight(true)
            setDark(false)
        }
        else if (dsiplay_mode === 'dark') {
            setTheme('dark')
            setDark(true)
            setLight(false)
            if (isBrowser()) {
                document.body.classList.add('bg-darkMode')
            }
        } else {
            setTheme('light')
            setLight(true)
            setDark(false)
            if (isBrowser()) {
                document.body.classList.remove('bg-darkMode')
            }
        }
    })
    useEffect(() => {
        if (theme === 'dark') {
            setDark(true)
            setLight(false)
            if (isBrowser()) {
                document.body.classList.add('bg-darkMode')
            }
        } else {
            setLight(true)
            setDark(false)
            if (isBrowser()) {
                document.body.classList.remove('bg-darkMode')
            }
        }
    }, [theme])
    return (
        <div className='h-screen -mt-10'>
            <div className=''>
                <h1 className='font-bold text-lg'>Display</h1>
            </div>
            <div className="theme_display_proto">
                <div className="max-w-lg">
                    <h1 className='font-semibold text-lg mt-4'>Appearance</h1>
                    <p className='mt-2 dark:text-dimGray'>
                        Manage your theme and appearance settings.
                    </p>
                </div>
                <div className="them_display_proto_contents max-w-lg mt-3 p-2 rounded border border-gray-100 dark:border-gray-50 dark:border-opacity-10">
                    <div className="them_display_proto_contents_inner max-w-sm">
                        <h3 className='font-medium'>Try changing the display</h3>
                        <p>
                            Spacre is a place to connect with people, share your thoughts and ideas, and build your network.
                        </p>
                    </div>
                </div>
                <div className="theme_select mt-6 flex space-x-3 screen-sm:block screen-sm:space-x-0 ">
                    <div className="flex space-x-2 items-center relative">
                        <div className="absolute left-10">
                            <CheckCircleIcon className={setClass("w-4 h-4", `${light ? 'text-primary' : 'text-black'}`)} />
                        </div>
                        <DefaultButton text='Light' textStyle={setClass('text-black text-lg')} styles={setClass('bg-white font-medium  px-16 py-3 rounded screen-sm:w-full', `${light ? 'border border-primary' : 'border-gray-100'}`)} action={() => {
                            handleTheme('light')
                        }} />
                    </div>
                    <div className="flex space-x-2 items-center relative screen-sm:mt-4">
                        <div className="absolute left-10">
                            <CheckCircleIcon className={setClass("w-4 h-4", `${dark ? 'text-primary' : 'text-white'}`)} />
                        </div>
                        <DefaultButton text='Dark' textStyle={setClass('text-white text-lg')} styles={setClass('bg-black font-medium  px-16 py-3 rounded', `${dark ? 'border border-primary' : 'border-gray-100'}`)} action={() => {
                            handleTheme('dark')
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            useAuth: true,
            user: "",
        }
    }
}
export default Display
