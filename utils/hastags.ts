const hastags = (defaultText: string) => {
    const tags =  [
        {
            type: 'hastags',
            name: 'developer',
            data: {
                text: '#developer',
                link: '/search?q=developer&click=hashtag',
            },

        },
        {
            type: 'hastags',
            name: 'nextjs',
            data: {
                text: '#nextjs',
                link: '/search?q=nextjs&click=hashtag',
            },
        },
        {
            type: 'hastags',
            name: 'tech',
            data: {
                text: '#tech',
                link: '/search?q=tech&click=hashtag',
            },
        },
        {
            type: 'hastags',
            name: 'jobs',
            data: {
                text: '#jobs',
                link: '/search?q=jobs&click=hashtag',
            },
        },
    ]
    if (defaultText !== '') { 
        tags.push({
            type: 'hastags',
            name: defaultText,
            data: {
                text: `#${defaultText}`,
                link: `/search?q=${defaultText}&click=hashtag`,
            },
        })
    }
    return tags
};

export default hastags;