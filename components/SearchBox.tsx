import { Modal } from '@mantine/core'
import Image from 'next/image'
import { useState } from 'react'
import { print, generateLoadingTime } from '../utils'
import { Spinner } from '../utils/loader'
import { BadgeCheckIcon, SearchIcon } from '@heroicons/react/outline'
import { NextLink } from '@mantine/next'
import store from '../store'



const SearchBox = ({ isSearch, searchTerm, searchList, renderNoSearch }: {
    isSearch: boolean;
    searchTerm: string;
    searchList: [] | any;
    renderNoSearch: boolean;
}) => {
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState('')
    const searches = store.get('searchList')
    const emptySearch = store.get('renderNoSearch')
    const renderSearchBox = () => {
        setTimeout(() => {
            setLoading(false)
        }, generateLoadingTime(1000, 2000))
    }
    function handleSearchChange(term: any) {
        setValue(term)
    }
    const isHashtag = (term: string) => {
        return term.startsWith('#')
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
            return searches.map((item: any) => {
                return (
                    <div key={item.id} className="pt-2 pb-2">
                        {
                            emptySearch ? <div>
                                <NextLink  href={item.link} className='flex items-center p-3 border-gray-200 hover:bg-gray-100 dark:border-none dark:hover:bg-darkModeBg dark:hover:bg-opacity-20'

                                    onMouseDown={(event: any) => {
                                        event.preventDefault()
                                        handleSearchChange(item.link)
                                    }}
                                >

                                    <div className='flex space-x-1'>
                                        <div >
                                            Search for
                                        </div>
                                        <div className='max-w-[480px]'>
                                            &quot;{searchTerm}&quot;
                                        </div>
                                    </div>
                                </NextLink>
                                {
                                    !isHashtag(searchTerm) && <NextLink  href={`/${searchTerm}`} className=' flex items-center p-3 border-gray-200 hover:bg-gray-100 dark:border-none dark:hover:bg-darkModeBg dark:hover:bg-opacity-20'

                                        onMouseDown={(event: any) => {
                                            event.preventDefault()
                                        }}
                                    >
                                        <div className='flex space-x-1'>
                                            <div>
                                                Go to
                                            </div>
                                            <div className='max-w-[512px]'>
                                                &quot;{searchTerm}&quot;
                                            </div>
                                        </div>
                                    </NextLink>
                                }
                            </div>
                                :

                                <NextLink  href={item.link} className='flex items-center p-3  border-gray-200 hover:bg-gray-100 dark:border-none dark:hover:bg-darkModeBg dark:hover:bg-opacity-20'

                                    onMouseDown={(event: any) => {
                                        event.preventDefault()
                                    }}
                                // onClick={(event: any) => {
                                //     event.preventDefault()
                                // }}
                                >
                                    <div className='flex items-center'>
                                        {
                                            item.type === 'user' && <div className='mr-2'>
                                                <Image src={item.image} width={'32px'} height={'32px'} alt={item.content} className="rounded-full" />
                                            </div>
                                        }
                                        {
                                            item.type === 'hashtag' && <div className='mr-2'>
                                                <SearchIcon className="w-8 h-8" />
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

                                    </div>

                                </NextLink>
                        }
                    </div>
                )
            })
        } else {
            return null
        }
    }
    return (
        <div className='w-full screen-sm:mt-7'>
            <div className='search_box_main max-w-auto max-h-80 overflow-auto  bg-white dark:bg-darkMode dark:shadow-lg dark:ring-1 dark:ring-blue-300 dark:ring-opacity-10 dark:border-none shadow-lg border border-gray-100 rounded-lg'>

                {renderSearch()}
            </div>

        </div>
    )
}

export default SearchBox