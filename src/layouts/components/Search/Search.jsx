import { useDebounce } from '../../../hooks'
import { useState, useEffect, useRef } from 'react'

import styles from './Search.module.scss'

import Icon from '../../../components/Icon/index'
import AccountItem from '../../../components/AccountItem'
import HeadlessTippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { default as PopperWrapper } from '../../../components/Popper/Wrapper'

import { faCircleXmark, faCircleNotch, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import * as searchServices from '../../../services/searchService'

function Search() {
    const [searchResult, setSearchResult] = useState([])
    const [visible, setVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(true)

    const searchInputRef = useRef(null)

    const debouncedValue = useDebounce(inputValue, 500)

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([])
            return
        }

        const fetchApi = async () => {
            setLoading(true)

            const res = await searchServices.search(debouncedValue)
            setSearchResult(res)

            setLoading(false)
        }
        fetchApi()
    }, [debouncedValue])

    return (
        <HeadlessTippy
            visible={visible && searchResult.length > 0 && inputValue}
            onClickOutside={() => setVisible(false)}
            interactive
            appendTo={document.body}
            render={(attrs) => (
                <PopperWrapper className={styles.searchResult} tabIndex='-1' {...attrs}>
                    <div className={styles.accountTitle}>Accounts</div>
                    {searchResult.map((data) => (
                        <AccountItem
                            data={data}
                            key={data.id}
                            onClick={() => {
                                useEffect(setInputValue(''), [])
                            }}
                        />
                    ))}
                </PopperWrapper>
            )}>
            <div className={styles.searchBar}>
                <input
                    type='text'
                    placeholder='Search'
                    spellCheck={false}
                    onFocus={() => setVisible(true)}
                    value={inputValue}
                    onChange={(e) => {
                        if (!e.target.value.startsWith(' ')) {
                            setInputValue(e.target.value)
                        }
                    }}
                    className={styles.searchInput}
                    ref={searchInputRef}
                />
                {inputValue && (
                    <>
                        {loading ? (
                            <FontAwesomeIcon
                                icon={faCircleNotch}
                                className={'icon' + ' ' + styles.loadingIcon}
                            />
                        ) : (
                            <button
                                className={styles.closeBtn}
                                onClick={() => {
                                    setInputValue('')
                                    searchInputRef.current.focus()
                                }}>
                                <FontAwesomeIcon icon={faCircleXmark} className='icon' />
                            </button>
                        )}
                    </>
                )}
                <Icon
                    child={
                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 48 48'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z'></path>
                        </svg>
                    }
                    triggered={
                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 48 48'
                            fill='rgba(22, 24, 35, 1)'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z'></path>
                        </svg>
                    }
                    className={styles.searchBtn}
                />
            </div>
        </HeadlessTippy>
    )
}

export default Search
