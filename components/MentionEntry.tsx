import { print, setClass } from "../utils"
import CreateImage from "./CreateImage"
interface MentionEntryProps {
    onMouseEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    onMouseUp: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    onMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    className?: string
    theme?: any
    role: string
    id: string
    mention: {
        type?: string
        name: string,
        username: string,
        fullName: string,
        link: string,
        avatar: string
    }
    selectMention: (mention: {
        name: string,
        username: string,
        fullName: string,
        link: string,
        avatar: string
        isVerified: boolean
    }) => void
    isFocused: boolean
    searchValue: string
}
const MentionEntry = (props: MentionEntryProps) => {
    const { mention, theme, searchValue, isFocused, ...parentProps } = props
    if (mention.type && mention.type === "mention_not_found") { 
        return (
            <div className="p-3 text-left cursor-pointer hover:bg-gray-50 text-black mt-1 mb-1 dark:text-white dark:hover:bg-darkModeBg dark:hover:bg-opacity-50"
                onMouseEnter={parentProps.onMouseEnter}
                onMouseUp={parentProps.onMouseUp}
                onMouseDown={parentProps.onMouseDown}
            >
                <div className={`${setClass(theme, "mention_not_found text-ellipsis overflow-hidden whitespace-nowrap")}`}>
                    <span>@{mention.name}</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-full p-3 cursor-pointer hover:bg-gray-50 text-black mt-1 mb-1 dark:text-white dark:hover:bg-darkModeBg dark:hover:bg-opacity-50"
                onMouseEnter={parentProps.onMouseEnter}
                onMouseUp={parentProps.onMouseUp}
                onMouseDown={parentProps.onMouseDown}
            >
                <div>
                    <div>
                        <div className={setClass('flex items-center space-x-3')}>
                            <div>
                                {
                                    mention.avatar ? <div>
                                        <img
                                            className={setClass('w-10 h-10 rounded-full')}
                                            src={mention.avatar}
                                            alt={mention.name}
                                            role="presentation"
                                        />
                                    </div>
                                        : <CreateImage name={mention.name} img={false} width="w-10" height="h-10" />
                                }
                            </div>
                            <div className="">
                                <div className={theme?.mentionSuggestionsEntryContainerRight}>
                                    <div className={setClass('w-[160px] text-left text-ellipsis overflow-hidden whitespace-nowrap text-[1.002rem] font-bold')}>
                                        {mention.fullName}
                                    </div>
                                </div>

                                <div className={setClass('')}>
                                    <div className={setClass('w-[160px] text-left  text-ellipsis overflow-hidden whitespace-nowrap text-sm text-dimGray dark:text-gray-200 dark:text-opacity-75')}>
                                        @{mention.username}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MentionEntry