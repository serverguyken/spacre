import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HASHTAG_REGEX, Linky, MENTION_REGEX, print, URLShortener } from '.';
import Icon from '../components/Icon';
import Tooltip from '../components/Tooltip';
import { meta_scraper_api } from '../config';
import API from '../config/api';
import { Meta } from '../interface/Meta';
import store from '../store';
const MentionComp = ({ text }: { text: string }) => {
    return (
        <span className='text-link'>
            <Link href={`/${text.replace('@', '')}`}>
                <a>{text}</a>
            </Link>
        </span>
    );
}

const HashtagComp = ({ text }: { text: string }) => {
    return (
        <span className='text-link'>
            <Link href={`/search?q=${text.replace('#', '')}&click=hashtag`}>
                <a>{text}</a>
            </Link>
        </span>
    );
}

const LinkComp = ({ text, url }: { text: string, url: string }) => {
    const split_text = text.split('\n');
    return (
        <span className='text-link'>
            <a href={url} className='text-link'
                rel="noopener noreferrer"
                target='_blank'
            >{text}</a>
        </span>
    );
}



export const ToJSX = ({ text }: {
    text: string
}) => {
    // string regex to match mentions, hashtags and links in the text
   
    const setComp = () => {
        if (text === null) return ''
        const REGEX = '_R$1E$2G$3E$4X^$02^%24*x$#~@' // this is a unique string that will not be found in the text
        const modifiedText = text.replace(/ /g, REGEX + ' ').replace(/\n/g, REGEX + '\n').replace(/\r/g, REGEX + '\r').replace(/\t/g, REGEX + '\t')
        const arr = modifiedText.split(REGEX ) // split the text into an array of strings
        return arr.map((item, index) => {
            if (item !== undefined) {
                if (item.match(MENTION_REGEX)) {
                    return <MentionComp key={index} text={item} />
                } else if (item.match(HASHTAG_REGEX)) {
                    return <HashtagComp key={index} text={item} />
                }
                else if (Linky.match(item)) {
                    const link = item.split('\n')
                    const url: any = Linky.match(item) !== null || Linky.match(item) !== undefined ? Linky.match(item)?.url : item
                    return <LinkComp key={index} text={item} url={url} />
                }
                return <span key={index}>{item}</span>
            }
            return null
        })
    }
    let Comp = setComp()
    return (
        <>
            {Comp}
        </>
    )
}

const meta_lookup_api = meta_scraper_api
export const RenderLinkCard = ({ url, fetchMeta, onClose, metaData }: {
    url: string;
    fetchMeta: boolean;
    onClose: (e: any) => void;
    metaData: (meta: Meta | null) => void;
}) => {
    const [error, setError] = useState(true)
    const hasLink = Linky.isLink(url)
    const link = Linky.getUrl(url) as string
    const [hasMeta, setHasMeta] = useState(false)
    const [meta, setMeta] = useState<Meta>({
        title: '',
        description: '',
        image: '',
        card: '', 
        url: '',
        short_url: '',
        site_name: '',
        creator: '',
        initial_url: '',
    }) as any

    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    const isRequiredProperties = (meta: Meta) => { 
        if (meta.title === '' || meta.title === null || meta.title === undefined) {
            return false
        } else if (meta.description === '' || meta.description === null || meta.description === undefined) {
            return false
        } else if (meta.image === '' || meta.image === null || meta.image === undefined) {
            return false
        }
        return true
    }
    const setMetaProps = (meta: Meta) => { 
        const meta_props = {
            title: meta.title,
            description: meta.description,
            image: meta.image ? meta.image : '',
            card: 'large',
            url: meta.url || meta.initial_url,
            short_url: meta.short_url || meta.initial_url,
            site_name: meta.site_name || '',
            creator: meta.creator || '',
            initial_url: meta.initial_url || '',
        }
        return meta_props
    }
    const setMetaCard = (meta: Meta) => {
        if (isRequiredProperties(meta)) {
            const { title, description, image, card, url, short_url, site_name, creator, initial_url } = setMetaProps(meta)
            const cardProps = {
                large: {
                    width: 'auto',
                    maxWidth: '380px',
                }
            } as any
            metaData(setMetaProps(meta))
            return (
                <div className='meta_card_header text-left border border-gray-200 dark:border-borderDarkMode max-w-[380px] h-auto rounded-lg relative'>
                    <div className='meta_card_header_image rounded-t-lg'
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width: cardProps[card].width,
                            maxWidth: cardProps[card].maxWidth,
                            height: '200px',
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={image} alt={title} className='hidden rounded-t-lg' />
                    </div>
                    <div className="bg-white dark:bg-darkMode hover:bg-gray-50 dark:hover:bg-darkModeBg/30  border-t border-gray-200 dark:border-borderDarkMode rounded-b-lg relative">
                        <div className="px-2 py-2 mt-2">
                            <div className="">
                                <p className="text-sm leading-5 text-gray-500">
                                    {short_url}
                                </p>
                            </div>
                            <h3 className="mt-1 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                                {title}
                            </h3>
                            <div className="mt-1 ">
                                <p className="text-sm text-gray-500 relative max-h-[40px] overflow-hidden text-ellipsis"
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: '2',
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                >
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='meta_close_btn absolute bg-gray-800 dark:bg-dimGray top-1 left-1 cursor-pointer   min-w-[24px] min-h-[24px]  z-[24] flex justify-center items-center rounded-full' onClick={(e: any) => {
                        setMeta(null)
                        onClose(e)
                    }}>
                        <Tooltip
                            title="Close
                    "
                            placement="center"
                            position='bottom'
                            transition='fade'
                            transitionDuration={200}
                            classNames={{
                                body: 'tooltip_comp bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.55rem] ml-1',
                            }}
                            color='gray'
                        >

                            <Icon type='close' width={'20'} height={'20'} styles={'modal_main_content_close_icon_svg cursor-pointer text-white dark:text-white'} />
                        </Tooltip>
                    </div>
                </div>
            )
        }
        metaData(null)
        return (<></>)
        
    }

    useEffect(() => {
        if (hasLink && fetchMeta) {
            fetch(`${meta_lookup_api}?url=${link}`, {
                method: 'GET',
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status.success) {
                        setHasMeta(true)
                        setMeta(res.meta)
                    } else {
                        setHasMeta(false)
                        setMeta(null)
                        store.set('metaData', null)
                        setStatus(res.status)
                    }
                }).catch(err => {
                    setHasMeta(false)
                    setMeta(null)
                    store.set('metaData', null)
                    setStatus(err)
                })
        } else {
            setHasMeta(false)
            setMeta(null)
            store.set('metaData', null)
        }
    }, [hasLink, link, fetchMeta])

    return (<> {hasMeta && meta ? setMetaCard(meta) : <></>} </>)
}