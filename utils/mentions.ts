const mentions = (defaultText: string) => {
    const mentionsList = [{
        id: '1',
        name: 'david224',
        username: 'david224',
        fullName: 'David Smithfffffffffffffffffffffffffffffffffffffffffffffffffdddddddddddddd',
        link: '/david224',
        avatar: 'https://images.generated.photos/DDf2TAj3WgXlcaRW_Rw_C49RS5ZRIqIcS0h8IC7iVSM/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDA3MDYzLmpwZw.jpg',
        isVerified: false,
        type: 'user',
    }, {
        id: '2',
        name: 'serverguyken',
        username: 'serverguyken',
        fullName: 'ServerGuyKen',
        link: '/serverguyken',
        avatar: null,
        isVerified: true,
        type: 'user',
        }, {
        id: '3',
        name: 'sarahjones',
        username: 'sarahjones',
        fullName: 'Sarah Jones',
        link: '/sarah_jones',
        avatar: 'https://images.generated.photos/yZe4-qr0QKM1djPOhY9TfynsPSNdAWX7TzDpiXDFWas/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjU0ODE0LmpwZw.jpg',
        isVerified: false,
        type: 'user',
        },
    ]
    if (defaultText !== '') {
        mentionsList.push({
            id: '4',
            name: defaultText,
            username: defaultText,
            fullName: defaultText,
            link: `/${defaultText}`,
            avatar: null,
            isVerified: false,
            type: 'mention_not_found',
        })
    }
    return mentionsList
}

export default mentions;