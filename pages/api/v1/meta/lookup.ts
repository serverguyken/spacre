import type { NextApiRequest, NextApiResponse } from 'next'

interface Meta {
    title: string;
    description: string;
    image: string | null;
    url: string;
    type: string;
    initial_url: string;
    locale: string;
    creator: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Meta>) {
    const url = req.query.url as string;
    res.status(200).json({
        title: 'Landing Page | Web',
        description: 'A simple landing page for web',
        image: null,
        url: 'https://web.com',
        type: 'website',
        initial_url: url,
        locale: 'en_US',
        creator: 'Web',
    })
}
