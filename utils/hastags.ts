const hastags = (defaultText: string) => {
    return [
        {
            type: 'hastags',
            name: 'developer',
            data: {
                text: '#developer',
                link: '/hashtag/developer',
            },

        },
        {
            type: 'hastags',
            name: 'nextjs',
            data: {
                text: '#nextjs',
                link: '/hashtag/nextjs',
            },
        },
        {
            type: 'hastags',
            name: 'tech',
            data: {
                text: '#tech',
                link: '/hashtag/tech',
            },
        },
        {
            type: 'hastags',
            name: 'jobs',
            data: {
                text: '#jobs',
                link: '/hashtag/jobs',
            },
        }, {
            type: 'hastags',
            name: defaultText,
            data: {
                text: `#${defaultText}`,
                link: `/hashtag/${defaultText}`,
            },
        }
    ]
};

export default hastags;