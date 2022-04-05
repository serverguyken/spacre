import { GithubIcon, LogoIcon, AtIcon, EyeOnIcon, EyeOffIcon, VerifiedIcon } from "./Iconsvg"

export default function Icon({ type, color, width, height, styles }: { type: string, color?: string | any, width?: string, height?: string, styles?: string }) {
    switch (type) {
        case "logo":
            return <LogoIcon color={color} width={width} height={height} styles={styles}/>
        case "github":
            return <GithubIcon color={color} />
        case "at":
            return <AtIcon color={color} width={width} height={height}/>
        case "eye-on":
            return <EyeOnIcon color={color} width={width} height={height} />
        case "eye-off":
            return <EyeOffIcon color={color} width={width} height={height} />
        case "verified":
            return <VerifiedIcon />
        default:
            return null
    }
}

