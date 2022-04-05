import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Input from './Input'
import SearchBox from './SearchBox'
import { print, generateLoadingTime } from '../utils'
import { isBrowser } from '../utils'
const api_url = '/api/v1'
import { API } from '../config/db/'
const Search: NextPage = () => {
    const [searchBoxRendered, setSearchBoxRendered] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchList, setSearchList] = useState([] as any)
    const [noSerach, setNoSearch] = useState(false)
    const getSerachList = async () => {
        const response: any = await API.getReturnData(`${api_url}/db/searchList`)
        setSearchList(response.searchList)
    }
    const renderSearch = () => {
        setSearchBoxRendered(true)
    }

    useEffect(() => {
        if (isBrowser()) {
            getSerachList()
        }
    }, [])


    const setSearch = (isSearch: boolean, val: string | any) => {
        setIsSearch(isSearch)
        setSearchTerm(val)
        if (val === '') {
            setIsSearch(false)
        }
    }

    const getSearchTerm = (val: string) => {
    }

    const searchHandler = (searchTerm: string) => {
        if (searchTerm !== '') {
            const newSearchList = searchList.filter((item: any) => {
                return item.content.toLowerCase().includes(searchTerm.toLowerCase())
            })
            if (newSearchList.length == 0) {
                setNoSearch(true)
                setSearch(true, searchTerm)
                const newSearchList = [{
                    id: 1,
                    content: searchTerm,
                    link: `/search?q=${searchTerm}`
                }]
                setSearchList(newSearchList)
            }
            else {
                setSearch(true, searchTerm)
                setSearchList(newSearchList)
            }
        }
    }
    const unmountSearch = () => {
        setSearchBoxRendered(false)
        if (searchTerm === '') {
            setIsSearch(false)
        }
    }
    const unmountSearchCancel = () => {
        setSearchTerm('')
        setIsSearch(false)
        if (isBrowser()) {
            document.getElementById('search_spacre')?.focus()
        }
    }
    return (
        <div>
            <div className='search_spacre_main w-full relative'>
                <Input id='search_spacre' type='text' placeholder='Search Spacre' styleToRender='search' value={searchTerm} hasLabel={false} autoComplete={'off'} onChange={(val: string) => {
                    setSearch(true, val)
                    searchHandler(val)
                }}
                    onFocus={renderSearch} onBlur={unmountSearch} cancelShown={isSearch} onCancel={unmountSearchCancel} />
                {
                    searchBoxRendered && <div className='w-full absolute top-12 left-0 z-50'><SearchBox isSearch={isSearch} searchTerm={searchTerm} searchList={searchList} renderNoSearch={noSerach} /></div>
                }
            </div>
        </div>

    )
}

export default Search