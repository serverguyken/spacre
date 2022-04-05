import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Input from './Input'
import SearchBox from './SearchBox'
import { generateLoadingTime } from '../utils'
import { isBrowser } from '../utils'


const Search: NextPage = () => {
    const [searchBoxRendered, setSearchBoxRendered] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const renderSearch = () => { 
        setSearchBoxRendered(true)
    }

    const setSearch = (isSearch: boolean, val:string | any) => {
        setIsSearch(isSearch)
        setSearchValue(val)
        if (val === '') {
            setIsSearch(false)
        }
    }
    const unmountSearch = () => {
        setSearchBoxRendered(false)
        if (searchValue === '') {
            setIsSearch(false)
        }
    }
    const unmountSearchCancel = () => {
        setSearchValue('')
        setIsSearch(false)
        if (isBrowser()) {
            document.getElementById('search_spacre')?.focus()
        }
    }
    return (
        <div>
           <div className='search_spacre_main w-full relative'>
            <Input id='search_spacre' type='text' placeholder='Search Spacre' styleToRender='search' value={searchValue} hasLabel={false} autoComplete={'off'} onChange={(val) => {
                setSearch(true, val)
            }}
                onFocus={renderSearch} onBlur={unmountSearch}  cancelShown={isSearch} onCancel={unmountSearchCancel} />
            {
                searchBoxRendered && <div className='w-full absolute top-12 left-0 z-50'><SearchBox isSearch={isSearch} /></div>
            }
        </div> 
        </div>
        
    )
}

export default Search