import { Modal } from '@mantine/core'
import Image from 'next/image'
import { useState } from 'react'
import { print, generateLoadingTime } from '../utils'
import { Spinner } from '../utils/loader'
import { BadgeCheckIcon, SearchIcon } from '@heroicons/react/outline'
import { NextLink } from '@mantine/next'




const SearchBox = ({ isSearch, searchTerm, searchList, renderNoSearch}: {
    isSearch: boolean;
    searchTerm: string;
    searchList: [] | any;
    renderNoSearch: boolean;
}) => {
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState('')
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
            return searchList.map((item: any) => {
                return (
                    <div key={item.id} className="pt-1 pb-2">
                        {
                            renderNoSearch ? <div>
                                <NextLink key={item.id} href={item.link} className='flex items-center p-3 border-b border-gray-200 hover:bg-gray-100 dark:border-none dark:hover:bg-darkModeBg'

                                    onMouseDown={(event: any) => {
                                        event.preventDefault()
                                        handleSearchChange(item.link)
                                    }}
                                >

                                    <span>Search for</span> &quot;{searchTerm}&quot;
                                </NextLink>
                                {
                                    !isHashtag(searchTerm) && <NextLink key={item.id} href={`/${searchTerm}`} className=' flex items-center p-3 border-b border-gray-200 hover:bg-gray-100 dark:border-none dark:hover:bg-darkModeBg'

                                        onMouseDown={(event: any) => {
                                            event.preventDefault()
                                        }}
                                    >

                                        <span>Go to</span> &quot;{searchTerm}&quot;
                                    </NextLink>
                                }
                            </div>
                                : 
                                
                                <NextLink key={item.id} href={item.link} className='flex items-center p-3 border-b border-gray-200 hover:bg-gray-100 dark:border-none dark:hover:bg-darkModeBg'

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
        <div className='w-full'>
            <div className='search_box_man  bg-white dark:bg-darkMode dark:shadow-lg dark:ring-1 dark:ring-blue-300 dark:ring-opacity-10 dark:border-none shadow-lg border border-gray-100 rounded-lg'>
                
                {renderSearch()}
            </div>

        </div>
    )
}

export default SearchBox