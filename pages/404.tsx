// Image import
import type { NextPage } from 'next'
import {print} from '../utils'
import { useRouter } from 'next/router'
import { SecondaryButton } from '../components/Buttons'
import Icon from '../components/Icon'
const Custom404: NextPage = () => {
    const router = useRouter()
    const searchLink = `/explore`
    const search = () => {
        router.push(searchLink)
    }
    return (
        <div className="error_c">
            <div className="error_c_c">
                <div className="error_logo">
                    <Icon type="logo" color="white" width='120' height='120' />
                </div>
                <h1>This page doesn’t exist. Try searching for something else.</h1>
                <div className="error_search_btn mt-5">
                    <SecondaryButton text="Search" width="px-24" height="py-4" action={search} />
                </div>
            </div>
        </div>
    )
}

export default Custom404