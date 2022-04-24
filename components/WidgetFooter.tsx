import Icon from "./Icon"
import NextLink from "next/link"
const footer_links = [
    {
        name: 'Privacy',
        to: '/legal/privacy',
    },
    {
        name: 'Terms',
        to: '/legal/terms',
    },

    {
        name: 'Ads',
        to: '/legal/ads',
    },
    {
        name: 'Cookies',
        to: '/legal/cookies',
    },
]
const WidgetFooter = () => {
    return (
        <div className="widget_footer">
            <div className="widget_footer_links flex justify-center items-center space-x-3">
                {
                    footer_links.map(link => {
                        return (
                            <div key={link.name}>
                                <NextLink href={link.to}>
                                    <a className="text-xs text-dimGray dark:text-white hover:underline">{link.name}</a>
                                </NextLink>
                            </div>
                        )
                    })
                }
            </div>
            <div className="widget_footer_logo mt-3 flex justify-center">
                <Icon type="logo" width={'30'} />
            </div>
        </div>
    )
}

export default WidgetFooter