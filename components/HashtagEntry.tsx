import { print, setClass } from "../utils"
interface HashtagEntryProps {
    onMouseEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    onMouseUp: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    onMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    mention: {
        type: string
        data: {
            text: string
            link: string
        }
    }
    searchValue: string
}
const HashtagEntry = (props: HashtagEntryProps) => {
    const { ...parentProps } = props
    const hashtag = props.mention.data.text
    return (
        <div className= "p-3 cursor-pointer hover:bg-gray-50 text-black mt-1 mb-1 dark:text-white dark:hover:bg-darkModeBg dark:hover:bg-opacity-50"
            onMouseEnter = { parentProps.onMouseEnter }
            onMouseUp = { parentProps.onMouseUp }
            onMouseDown = { parentProps.onMouseDown }
        >
            <span>{hashtag}</span>
        </div>
    ) 
}

export default HashtagEntry