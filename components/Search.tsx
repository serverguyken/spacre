import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Input from './Input'
import SearchBox from './SearchBox'
import { print, generateLoadingTime } from '../utils'
import { isBrowser } from '../utils'
const api_url = '/api/v1'
import API from '../config/api'
import store from '../store'

const Search: NextPage = () => {
    const [searchBoxRendered, setSearchBoxRendered] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchList, setSearchList] = useState([])
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
        if (searchTerm === '') {
            setIsSearch(false)
        } else {
            setIsSearch(true)
        }
    }, [searchTerm])


    const setSearch = (isSearch: boolean, val: string | any) => {
        setSearchTerm(val)
    }

    const getSearchTerm = (val: string) => {
    }

    const searchHandler = (searchTerm: string) => {
        const searchFilter = (term: string) => {
            const searchFilter = searchList.filter((item: any) => {
                return item.content.toLowerCase().includes(searchTerm.toLowerCase())
            })
            return {
                searches: searchFilter,
                noSerach: searchFilter.length === 0
            }
        }
        store.set('searchList', searchFilter(searchTerm).searches)
        store.set('renderNoSearch', searchFilter(searchTerm).noSerach)
        if (searchFilter(searchTerm).noSerach === true) {
            const noSearchList = [{
                id: searchTerm,
                content: searchTerm,
                link: `/search?q=${searchTerm}`
            }]
            store.set('searchList', noSearchList)
            store.set('renderNoSearch', true)
        }
        setSearch(true, searchTerm)

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
                <Input id='search_spacre' type='text' styles={'screen-sm:mt-6 screen-sm:pt-[0.5rem] screen-sm:pb-[0.5rem]'} placeholder='Search Spacre' styleToRender='search' value={searchTerm} hasLabel={false} autoComplete={'off'} onChange={(val: string) => {
                    setSearch(true, val)
                    searchHandler(val)
                }}
                    onFocus={renderSearch} onBlur={unmountSearch} cancelShown={isSearch} onCancel={unmountSearchCancel} />
                {
                    searchBoxRendered && <div className='w-full absolute top-12 left-0 z-40 screen-sm:top-10'><SearchBox isSearch={isSearch} searchTerm={searchTerm} searchList={searchList} renderNoSearch={noSerach} /></div>
                }
            </div>
        </div>

    )
}

export default Search