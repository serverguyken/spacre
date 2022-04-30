import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HASHTAG_REGEX, Linky, MENTION_REGEX, print } from '.';
import API from '../config/api';
import { Meta } from '../interface/Meta';
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
        const REGEX = '_R$1E$2G$3E$4X^$02^%24*x$#~@' // this is a unique string that will not be found in the text
        const modifiedText = text.replace(/ /g, REGEX + ' ')
        const arr = modifiedText.split(REGEX)
        return arr.map((item, index) => {
            if (item !== undefined) {
                if (item.match(MENTION_REGEX)) {
                    return <MentionComp key={index} text={item} />
                } else if (item.match(HASHTAG_REGEX)) {
                    return <HashtagComp key={index} text={item} />
                }
                else if (Linky.match(item)) {
                    const text: any = Linky.match(item) !== null || Linky.match(item) !== undefined ? Linky.match(item)?.text : item
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

const meta_lookup_api = 'http://10.0.0.41:3002/api/v1/meta/lookup'
export const RenderLinkCard = ({ url }: {
    url: string
}) => {
    const [error, setError] = useState(true)
    const hasLink = Linky.isLink(url)
    const link = Linky.getUrl(url) as string
    console.log(link)
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
    const setMetaCard = (meta: Meta) => {
        return (
            <div className="link_card_preview_comp">
                <div className="border bg-white shdow-lg dark:bg-dark">
                    <h1>Title: {meta.title}</h1>
                    <p>Description: {meta.description}</p>
                    <p>Image: {meta.image}</p>
                    <p>Card: {meta.card}</p>
                    <p>Url: {meta.url}</p>
                    <p>Short Url: {meta.short_url}</p>
                    <p>Site Name: {meta.site_name}</p>
                    <p>Creator: {meta.creator}</p>
                    <p>Initial Url: {meta.initial_url}</p>
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (hasLink) {
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
                        setStatus(res.status)
                    }
                }).catch(err => {
                    setHasMeta(false)
                    setMeta(null)
                    setStatus(err)
                })
        } else {
            setHasMeta(false)
            setMeta(null)
        }
    }, [hasLink, link])

    return (<> {hasMeta && meta ? setMetaCard(meta) : <></>} </>)
}