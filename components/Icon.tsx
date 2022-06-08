import { GithubIcon, LogoIcon, AtIcon, EyeOnIcon, EyeOffIcon, VerifiedIcon } from "./Iconsvg"
import { ArrowLeftIcon, ArrowRightIcon, AtSymbolIcon, XIcon, ChevronDownIcon, PlusIcon, PencilAltIcon, MinusCircleIcon as BlockIcon, UserAddIcon as FollowIcon, UserRemoveIcon as UnfollowIcon, TrashIcon as DeleteIcon, ArrowSmLeftIcon} from "@heroicons/react/outline"
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
        default:
            return null
    }
}

