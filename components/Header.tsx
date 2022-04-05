import Icon from './Icon'
import { User } from '../interface/User'
import Search from './Search'
import HeaderProfileCard from './HeaderProfileCard'
const Header = ({ user, signout }: {
    user: User | any,
    signout?: any
}) => {
    return (
        <header className='header_search'>
            <div className='header_lg  bg-white dark:bg-darkMode fixed top-0 w-full z-50 p-2 border-b border-gray-100 dark:border-0'>
                <div className="header_logo flex justify-between items-center main_container">
                    <div className='search_main_header'>
                        <div className='ml-5'>
                            <Search />
                        </div>
                    </div>
                    <div className="header_profile_lg">
                        <HeaderProfileCard user={user} signout={signout} isHover={true}/>
                    </div>
                </div>
            </div>
            <div className='header_mobile hidden bg-white dark:bg-darkMode  fixed top-0 w-full z-50 p-2 border-b border-gray-100 dark:border-darkMode main_container'>
                <div className="header_logo flex justify-between items-center">
                    <div className='search_logo flex items-center'>
                        <Icon type='logo' color={'bg-primary'} width='34' height='40' />
                    </div>
                    <div className='ml-5'>
                        <Search />
                    </div>
                    <div className="header_profile_mobile">
                        <HeaderProfileCard user={user} signout={signout} isHover={false}/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header