import type { NextPage } from 'next'
import styles from '../styles/Main.module.css'
import Link from 'next/link'
import { setClass } from '../utils'

const footer_links = [
    {
        name: 'About',
        to: '/about',
    },
    {
        name: 'Contact',
        to: '/contact',
    },
    {
        name: 'Privacy',
        to: '/legal/privacy',
    },
    {
        name: 'Terms',
        to: '/legal/terms',
    },
]

setClass(styles.container, 'sp_container')

const Footer: NextPage = () => {
    return (
        <div className={setClass(styles.footer_layout, 'sp_container')}>
            <footer>
                <div className={setClass(styles.footer_contents)}>
                    <div className={setClass(styles.footer_links)}>
                        <div className={setClass(styles.footer_links_contents)}>
                            {footer_links.map((link, index) => {
                                return (
                                    <div key={index} className={setClass('text-black dark:text-white ml-10')}>
                                        <Link href={link.to}>
                                            <a className={setClass(styles.footer_link_text)}>{link.name}</a>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.footer_bottom}>
                            &copy; 2022 Spacre
                        </div>
                    </div>
                </div>
            </footer> 
        </div>          
    )
}

export default Footer

