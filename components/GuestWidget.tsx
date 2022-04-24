import { SecondaryButton } from "./Buttons"
import NextLink from "next/link"
import Footer from "./Footer"
import Icon from "./Icon"
import { useState, useEffect } from 'react'
import { isBrowser, generateLoadingTime, TimeOut } from '../utils'
import { Spinner } from '../utils/loader'
import WidgetFooter from "./WidgetFooter"


const GuestWidget = () => {
    const [rendered, setRendered] = useState(false)
    
    const setRender = () => {
        if (isBrowser()) {
            TimeOut(() => {
                setRendered(true)
            }, generateLoadingTime(1000, 2000))
        }     
    }
    useEffect(() => {
        setRender()
    }, [])
    return (
        <div className='widget_main self-start w-full pt-4 sticky top-0 pb-6'>
            <div className="mb-2">
                <div className="jobs_list_container mb-5">
                    {
                        rendered ?
                            <div className="guest_widget bg-light dark:bg-primary dark:bg-opacity-5 rounded-lg p-2">
                                <div className="guest_widget_header_list ">
                                    <h1>New to Spacre?</h1>
                                    <h1>Sign up to follow creators, join spaces, and connect with others.</h1>
                                </div>
                            </div>
                            :
                            <div className="h-20 mt-20">
                                <Spinner width={'20'} color="var(--color-primary)" />
                            </div>
                    }




                </div>
            </div>

            
            <WidgetFooter />
        </div>
    )
}

export default GuestWidget