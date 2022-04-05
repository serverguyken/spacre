import { Modal } from '@mantine/core'
import Image from 'next/image'
import { useState } from 'react'
import { generateLoadingTime } from '../utils'
import { Spinner } from '../utils/loader'
import { BadgeCheckIcon, SearchIcon } from '@heroicons/react/outline'
import { NextLink } from '@mantine/next'


const dummySearchData: {} | any = [{
    id: 1,
    content: 'David Testo',
    image: 'https://images.generated.photos/DDf2TAj3WgXlcaRW_Rw_C49RS5ZRIqIcS0h8IC7iVSM/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDA3MDYzLmpwZw.jpg',
    type: 'user',
    isVerified: true,
    link: `/david_testo24`,
}, {
    id: 1,
    content: 'Jessica Ruwn',
    image: 'https://images.generated.photos/yZe4-qr0QKM1djPOhY9TfynsPSNdAWX7TzDpiXDFWas/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjU0ODE0LmpwZw.jpg',
    type: 'user',
    isVerified: false,
    link: `/jessica_ruwn`,
}, {
    id: 1,
    content: '#Developers',
    type: 'word',
    icon: <SearchIcon className='h-6' />,
    link: `/search?q=developers`,
}, {
    id: 1,
    content: 'Full Stack Developer',
    type: 'word',
    icon: <SearchIcon className='h-6' />,
    link: `/search?q=full%20stack%20developer`,
}, {
    id: 2,
    content: 'repository',
    type: 'word',
    icon: <SearchIcon className='h-6' />,
    link: `/search?q=repository`,
}]

const SearchBox = ({ isSearch }: {
    isSearch: boolean;
}) => {
    const [loading, setLoading] = useState(true)
    const renderSearchBox = () => {
        setTimeout(() => {
            setLoading(false)
        }, generateLoadingTime(1000, 2000))
    }
    const renderSearch = () => {
        renderSearchBox()
        if (loading) {
            return <div className='flex justify-center items-center h-40'>
                <div className='mt-auto mb-auto'>
                    <Spinner color='var(--color-primary)' width={'24'} />
                </div>
            </div>
        } else if (!loading && !isSearch) {
            return <div className='flex justify-center items-center h-32'>
                <h2 className='text-gray-400 text-sm'>Try searching for something</h2>
            </div>
        } else if (!loading && isSearch) {
            return dummySearchData.map((item: any) => {
                return (

                    <NextLink key={item.id} href={item.link} className='flex items-center p-2 border-b border-gray-200 hover:bg-gray-100 dark:border-none dark:hover:bg-darkModeBg dark:rounded-lg' >
                        {
                            item.type === 'user' && <div className='mr-2'>
                                <Image src={item.image} width={'32px'} height={'32px'} alt={item.content} className="rounded-full" />
                            </div>
                        }
                        {
                            item.type === 'word' && <div className='mr-2'>
                                {item.icon}
                            </div>
                        }
                        < div className='flex'>

                            {
                                item.isVerified
                                    ?
                                    <div className=''>
                                        <div className='flex'>
                                            <h2 className='font-bold text-sm'>{item.content}</h2>
                                            <div className=' w-5 h-5 flex justify-center items-center rounded-full ml-1'><BadgeCheckIcon width={'26'} height={'26'} stroke='white' fill='#4595d0' /></div>
                                        </div>
                                    </div>
                                    :
                                    <div className='font-bold text-sm'>{item.content}</div>
                            }
                        </div>
                    </NextLink>
                )
            })
        } else {
            return null
        }
    }
    return (
        <div className='w-full'>
            <div className='search_box_man p-2 bg-white dark:bg-darkMode dark:shadow-lg dark:ring-1 dark:ring-blue-300 dark:ring-opacity-10 dark:border-none shadow-lg border border-gray-100 rounded-lg'>
                
                {renderSearch()}
            </div>

        </div>
    )
}

export default SearchBox