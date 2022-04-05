import type { NextApiRequest, NextApiResponse } from 'next'

const searchList: [] | any = [{
    id: 1,
    content: 'David Testo',
    image: 'https://images.generated.photos/DDf2TAj3WgXlcaRW_Rw_C49RS5ZRIqIcS0h8IC7iVSM/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDA3MDYzLmpwZw.jpg',
    type: 'user',
    isVerified: true,
    link: `/david_testo24`,
}, {
    id: 2,
    content: 'Jessica Ruwn',
    image: 'https://images.generated.photos/yZe4-qr0QKM1djPOhY9TfynsPSNdAWX7TzDpiXDFWas/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjU0ODE0LmpwZw.jpg',
    type: 'user',
    isVerified: false,
    link: `/jessica_ruwn`,
}, {
    id: 3,
    content: '#Developers',
    type: 'hashtag',
    icon: null,
    link: `/search?q=#Developers`,
}, {
    id: 4,
    content: '#Tech',
    type: 'hashtag',
    icon: null,
    link: `/search?q=#tech`,
}, {
    id: 5,
    content: '#repository',
    type: 'hashtag',
    icon: null,
    link: `/search?q=#repository`,
}]

type Data = {
    searchList: Array<{}>
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({
        searchList: searchList
    })
}



