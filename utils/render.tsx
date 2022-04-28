import Link from 'next/link';
import { useEffect, useState } from 'react';
import { isLink, Linky, print } from '.';
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

const LinkComp = ({ text }: { text: string }) => {
    return (
        <span className='text-link'>
            <a href={text}>{text}</a>
        </span>
    );
}

export const ToJSX = ({ text }: {
    text: string
}) => {
    const original_text = text
    let changed_text = text
    // string regex to match mentions, hashtags and links in the text
    const MENTION_REGEX = /(^|\s)(@[a-zA-Z0-9_]+)/g
    const HASHTAG_REGEX = /(^|\s)(#[a-zA-Z0-9_]+)/g
    // link regex domain is optional e.g http(s):web and http(s):web.com and http(s):web.com/ and (name).(domain)
    const LINK_REGEX = /(^|\s)((http(s)?:\/\/)?(www\.)?[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+[a-zA-Z0-9_]*)/g
    const REGEX = new RegExp(MENTION_REGEX.source + '|' + HASHTAG_REGEX.source + '|' + LINK_REGEX.source, 'g')

    const setComp = () => {
        if (text.match(REGEX)) {
            const arr = text.split(REGEX)
            return arr.map((item, index) => {
                if (item !== undefined) {
                    if (item.match(MENTION_REGEX)) {
                        return <MentionComp key={index} text={item} />
                    } else if (item.match(HASHTAG_REGEX)) {
                        return <HashtagComp key={index} text={item} />
                    } else if (item.match(LINK_REGEX)) {
                        if (isLink(item) !== null) {
                            return <LinkComp key={index} text={item} />
                        } else {
                            return <span key={index}>{item}</span>
                        }
                    }
                    return <span key={index}>{item}</span>
                }
                return null
            })
        }
        return <span>{text}</span>
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