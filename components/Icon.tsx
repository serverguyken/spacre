import { GithubIcon, LogoIcon, AtIcon, EyeOnIcon, EyeOffIcon, VerifiedIcon } from "./Iconsvg"
import { ArrowLeftIcon, ArrowRightIcon, AtSymbolIcon, XIcon, ChevronDownIcon, PlusIcon, PencilAltIcon, MinusCircleIcon as BlockIcon, UserAddIcon as FollowIcon, UserRemoveIcon as UnfollowIcon, TrashIcon as DeleteIcon, ArrowSmLeftIcon, DotsHorizontalIcon as MoreIcon, CalendarIcon} from "@heroicons/react/outline"
import { Flag as ReportIcon } from "tabler-icons-react"

export default function Icon({ type, color, width, height, styles }: { type: string, color?: string | any, width?: string, height?: string, styles?: string }) {
    switch (type) {
        case "logo":
            return <LogoIcon color={color} width={width} height={height} styles={styles}/>
        case "github":
            return <GithubIcon color={color} />
        case "at":
            return <AtSymbolIcon className={styles}/>
        case "eye-on":
            return <EyeOnIcon color={color} width={width} height={height} />
        case "eye-off":
            return <EyeOffIcon color={color} width={width} height={height} />
        case "verified":
            return <VerifiedIcon />
        case 'arrow-left':
            return <ArrowLeftIcon className={styles} />
        case 'arrow-right':
            return <ArrowRightIcon className={styles} />
        case 'chevron-down':
            return <ChevronDownIcon width={width} height={height} className={styles} />
        case 'plus':
            return <PlusIcon width={width} height={height} className={styles} />
        case 'close':
            return <XIcon width={width} height={height} color={color} className={styles} />
        case 'edit':
            return <PencilAltIcon width={width} height={height} color={color} className={styles} />
        case 'report':
            return <ReportIcon width={width} height={height} color={color} className={styles} />
        case 'block':
            return <BlockIcon width={width} height={height} color={color} className={styles} />
        case 'follow':
            return <FollowIcon width={width} height={height} color={color} className={styles} />
        case 'unfollow':
            return <UnfollowIcon width={width} height={height} color={color} className={styles} />
        case 'delete':
            return <DeleteIcon width={width} height={height} color={color} className={styles} />
        case 'back':
            return <ArrowSmLeftIcon width={width} height={height} color={color} className={styles} />
        case 'message':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"><g><path d="M19.25 3.018H4.75C3.233 3.018 2 4.252 2 5.77v12.495c0 1.518 1.233 2.753 2.75 2.753h14.5c1.517 0 2.75-1.235 2.75-2.753V5.77c0-1.518-1.233-2.752-2.75-2.752zm-14.5 1.5h14.5c.69 0 1.25.56 1.25 1.25v.714l-8.05 5.367c-.273.18-.626.182-.9-.002L3.5 6.482v-.714c0-.69.56-1.25 1.25-1.25zm14.5 14.998H4.75c-.69 0-1.25-.56-1.25-1.25V8.24l7.24 4.83c.383.256.822.384 1.26.384.44 0 .877-.128 1.26-.383l7.24-4.83v10.022c0 .69-.56 1.25-1.25 1.25z"></path></g></svg>
            )
        case 'more':
            return <MoreIcon width={width} height={height} color={color} className={styles} />
        case 'calendar':
            return <CalendarIcon width={width} height={height} color={color} className={styles} />
        default:
            return null
    }
}

