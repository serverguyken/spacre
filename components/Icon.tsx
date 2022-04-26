import { GithubIcon, LogoIcon, AtIcon, EyeOnIcon, EyeOffIcon, VerifiedIcon } from "./Iconsvg"
import { ArrowLeftIcon, ArrowRightIcon, AtSymbolIcon, XIcon } from "@heroicons/react/outline"
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
        case 'close':
            return <XIcon width={width} height={height} color={color} className={styles} />
        default:
            return null
    }
}

