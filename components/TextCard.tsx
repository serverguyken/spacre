import { CodeIcon, PhotographIcon, EmojiHappyIcon, PlusIcon, ChartSquareBarIcon } from "@heroicons/react/outline"
import { PrimaryButton } from "./Buttons"
import { XIcon } from "@heroicons/react/outline"
import { useState, useEffect } from "react"
import { setClass, isBrowser, generateLoadingTime, TimeOut, print, StorageEvent, toHTML, getTypeByTrigger, Strategy, isLink, Linky } from "../utils"
import { CompositeDecorator, ContentBlock, ContentState, DefaultDraftInlineStyle, EditorState, Modifier, SelectionState } from "draft-js"
import Editor, { EditorPlugin } from '@draft-js-plugins/editor'
import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention'
import createLinkifyPlugin from '@draft-js-plugins/linkify'
import 'draft-js/dist/Draft.css'
import hashtagStyles from "../styles/hashtagStyles.module.css"
import mentionStyles from "../styles/mentionStyles.module.css"
import '@draft-js-plugins/hashtag/lib/plugin.css'
import '@draft-js-plugins/mention/lib/plugin.css'
import '@draft-js-plugins/linkify/lib/plugin.css'
import hastags from "../utils/hastags"
import mentions from "../utils/mentions"
import MentionEntry from "./MentionEntry"
import HashtagEntry from "./HashtagEntry"
import VALTIO, { SUBSCRIBE } from "../store/valtio"
import store from "../store"
import { RenderLinkCard } from "../utils/render"
import Tooltip from "./Tooltip"
import MediaHandler from "./MediaHandler"
import Transition from "./Transition"
import Modal from "./Modal"
import MobileTextCard from "./MobileTextCard"
import PollCreate from "./PollCreate"


const mentionPlugin = createMentionPlugin({
    mentionPrefix: '@',
    mentionTrigger: '@',
    entityMutability: 'IMMUTABLE',
    theme: mentionStyles,
    mentionComponent: ({ mention, children, className }) => {
        return (
            <span className={className} spellCheck={true} data-role-id={mention.id}>
                {children}
            </span>
        )
    },
})
const hashtagPlugin = createMentionPlugin({
    mentionPrefix: '#',
    mentionTrigger: '#',
    entityMutability: 'IMMUTABLE',
    theme: hashtagStyles,
})


const linkifyPlugin = createLinkifyPlugin({
    component: ({ href, children, ...props }) => {
        return (
            <a href={href} onClick={() => { }} className="cursor-auto text-link">
                {children}
            </a>
        )
    },
})




const TextCard = () => {
    const [text, setText] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [postTextBoxShown, setPostTextBoxShown] = useState(false)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [mentionSuggestions, setMentionSuggestions] = useState([] as any)
    const [hashtagSuggestions, setHashtagSuggestions] = useState([] as any)
    const [mentionOpen, setMentionOpen] = useState(false)
    const [hashtagOpen, setHashtagOpen] = useState(false)
    const [textExceeded, setTextExceeded] = useState(false)
    const maxValue = 64000
    const [maxInitialValue, setMaxInitialValue] = useState(0)
    const [textLength, setTextLength] = useState(0)
    const maxInPercent = maxValue / 64000 * 100
    const [isLinkCard, setIsLinkCard] = useState(false)
    const [linkText, setLinkText] = useState("")
    const [files, setFiles] = useState([] as any)
    const [fileTypes, setFileTypes] = useState([] as any)
    const [isFileError, setIsFileError] = useState(false)
    const [fileErrorMsg, setFileErrorMsg] = useState("")
    const [pollOpen, setPollOpen] = useState(false)
    const [pollCount, setPollCount] = useState(0)
    const [poll, setPoll] = useState({})
    const [pollValid, setPollValid] = useState(false)
    const fileLimit = 2
    const pollLimit = 1
    const [isFileLimit, setIsFileLimit] = useState(false)
    const [isPollLimit, setIsPollLimit] = useState(false)
    const testContent = "Hello @serverguyken, this is a test post. I hope you like it :) #test. Visit https://www.web.com for more info."

    useEffect(() => {
        VALTIO.watch((get) => {
            setPostTextBoxShown(get(store.content.data).postTextareaShown)
        })
    }, [])




    function getAllTextFromEditor() {
        const content = editorState.getCurrentContent()
        const text = content.getPlainText()
        return text
    }

    //print(toHTML(testContent)._html)

    useEffect(() => {
        if (text.length > 0) {
            setDisabled(false)
        } else {
            if (files.length > 0 || pollValid) {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        }
        if (files.length > 0 || pollValid) {
            setDisabled(false)
        }
        // check if poll question is empty; poll must have two options
    }, [text, textExceeded, files, pollOpen, pollValid])

    useEffect(() => {
        if (files.length === fileLimit - 1) {
            if (isBrowser()) {
                const media_upload = document.getElementById("media_upload")
                if (media_upload) {
                    media_upload.removeAttribute("multiple")
                }
            }
        }
    }, [files])


    useEffect(() => {
        if (pollCount >= pollLimit) {
            setIsPollLimit(true)
        } else {
            setIsPollLimit(false)
        }
    }, [pollCount])

    const plugins = [mentionPlugin, hashtagPlugin, linkifyPlugin]




    const handleChange = (state: any) => {
        const value = state.getCurrentContent().getPlainText()
        setEditorState(state)
        setText(value)
        setTextExceeded(value.length > maxValue)
        setMaxInitialValue(value.length)
        setTextLength(value.length)
        const hasLink = Linky.isLink(value)
        const link = Linky.getUrl(value) as string
        if (hasLink) {
            setIsLinkCard(true)
            setLinkText(link)
        } else {
            setIsLinkCard(false)
        }
    }

    const onMentionSearchChange = ({ value }: any) => {
        setMentionSuggestions(defaultSuggestionsFilter(value, mentions(value) as any))
    }

    const onHashtagSearchChange = ({ value }: any) => {
        const hashtagDefaultSuggestions = defaultSuggestionsFilter
        setHashtagSuggestions(hashtagDefaultSuggestions(value, hastags(value) as any))
    }

    const onMentionOpenChange = (open: boolean) => {
        setMentionOpen(open)
    }

    const onHashtagOpenChange = (open: boolean) => {
        setHashtagOpen(open)
    }

    const onMentionAdd = (mention: any) => {

    }

    const onHashtagAdd = (hashtag: any) => {

    }

    const onMediaChange = (e: any) => {
        if (files.length > 0) {
            const newFiles = e.target.files
            setError(false, "")
            if (newFiles && newFiles.length > 1) {
                const arrFiles = Array.from(newFiles)
                const fileTypes = arrFiles.map((file: any) => file.type)
                const videos = fileTypes.filter((type: any) => type.includes("video"))
                if (arrFiles.length > fileLimit) {
                    setFileErrorMsg(`Please choose either 1 video or up to ${fileLimit} photos.`)
                    setErrorTimeout(5000)
                } else {
                    if (videos) {
                        setIsFileError(true)
                        setFileErrorMsg(`Please choose either 1 video or up to ${fileLimit} photos.`)
                        setErrorTimeout(5000)
                    } else {
                        setFiles(files.concat(arrFiles))
                        setFileTypes(fileTypes)
                        setError(false, "")
                    }
                }
            } else {
                const file = e.target.files
                if (file && file.length > 0) {
                    const isVideo = file[0].type.includes("video")
                    const isImage = files.every((file: any) => file.type.includes("image"))
                    if (isVideo && isImage) {
                        setIsFileError(true)
                        setFileErrorMsg(`Please choose either 1 video or up to ${fileLimit} photos.`)
                        setErrorTimeout(5000)
                    } else {
                        setFiles(files.concat(e.target.files[0]))
                        setFileTypes([...fileTypes, e.target.files[0].type])
                        setError(false, "")
                    }
                } else {
                    setError(false, "")
                }
            }
        }
        else {
            const files = e.target.files
            setError(false, "")
            if (files && files.length > 1) {
                const arrFiles = Array.from(files)
                const fileTypes = arrFiles.map((file: any) => file.type)
                const videos = fileTypes.find((type: string) => type.includes("video"))
                const photos = fileTypes.filter((type: string) => type.includes("image"))
                if (files.length > fileLimit) {
                    setError(true, `Please choose either 1 video or up to ${fileLimit} photos`)
                    setErrorTimeout(5000)
                } else if (videos) {
                    setError(true, `Please choose either 1 video or up to ${fileLimit} photos`)
                    setErrorTimeout(5000)
                }
                else {
                    setFiles(arrFiles)
                    setFileTypes(fileTypes)
                    store.content.data.media = {
                        files: arrFiles,
                        fileTypes: fileTypes
                    }
                    setError(false, "")
                }
            } else if (files && files.length === 1) {
                const file = files[0]
                const video = files[0].type.includes("video")
                if (video) {
                    const v = document.createElement("video")
                    v.src = URL.createObjectURL(file)
                    v.onloadedmetadata = () => {
                        if (v.duration > 120) {
                            setError(true, "Cannot upload videos longer than 2 minutes.")
                            setErrorTimeout(5000)
                        } else {
                            if (file.size > 100000000) {
                                setError(true, "Cannot upload videos greater than 100mb.")
                                setErrorTimeout(5000)
                            } else {
                                setFiles([file])
                                setFileTypes([file.type])
                                store.set('media', {
                                    files: [file],
                                    fileTypes: [file.type]
                                })
                                setError(false, "")
                            }
                        }
                    }
                } else {
                    setFiles([file])
                    setFileTypes([file.type])
                    store.content.data.media = {
                        files: [file],
                        fileTypes: [file.type]
                    }
                    setError(false, "")
                }
            } else {
                setFiles([])
                setFileTypes([])
                store.content.data.media = {
                    files: [],
                    fileTypes: []
                }
                setError(false, "")
            }
        }
    }

    const setError = (error: boolean, msg: string) => {
        setIsFileError(error)
        setFileErrorMsg(msg)
    }

    const setErrorTimeout = (timeout: number) => {
        TimeOut(() => {
            setError(false, "")
        }, timeout)
    }


    useEffect(() => {
        console.log(pollValid, poll)
    }, [pollValid, poll])


    const { MentionSuggestions } = mentionPlugin
    const HashtagSuggestions = hashtagPlugin.MentionSuggestions
    return (
        <div className="">
            {
                postTextBoxShown &&
                <MobileTextCard />
            }

            <div className={setClass("post_textarea relative", 'bg-white dark:bg-darkMode relative screen-sm:hidden')}>

                <div className={setClass("border-b border-gray-100 dark:border-borderDarkMode p-2 pb-3 screen-sm:dark:border-b-gray-50 screen-sm:dark:border-opacity-5", postTextBoxShown ? 'screen-sm:p-4 screen-sm:pb-1' : '')}>
                    <div className={setClass("w-auto screen-sm:mt-3")}>
                        <Editor
                            editorState={editorState}
                            onChange={handleChange}
                            plugins={plugins}
                            placeholder="What are you up to?"
                        />
                        <MentionSuggestions
                            onSearchChange={onMentionSearchChange}
                            suggestions={mentionSuggestions}
                            open={mentionOpen}
                            onOpenChange={onMentionOpenChange}
                            onAddMention={onMentionAdd}
                            entryComponent={(props: any) => <MentionEntry {...props} />}
                            popoverContainer={({ children }) => <div className="bg-white dark:bg-darkMode dark:border-darkModeBg dark:shadow-3xl absolute z-20 w-3/5  max-h-60 overflow-auto border border-gray-100  mt-3 max-w-md rounded-md shadow-lg">{children}</div>}

                        />
                        <HashtagSuggestions
                            onSearchChange={onHashtagSearchChange}
                            suggestions={hashtagSuggestions}
                            open={hashtagOpen}
                            onOpenChange={onHashtagOpenChange}
                            onAddMention={onHashtagAdd}
                            entryComponent={(props: any) => <HashtagEntry {...props} />}
                            popoverContainer={({ children }) => <div className="bg-white dark:bg-darkMode dark:border-darkModeBg dark:shadow-3xl absolute z-20 w-3/5  max-h-60 overflow-auto border border-gray-100  mt-3 max-w-md rounded-md shadow-lg">{children}</div>}
                        />
                    </div>

                    <RenderLinkCard url={linkText} />
                    <MediaHandler files={files} types={fileTypes} limit={fileLimit} onClose={(index: number) => {
                        if (files.length === 1 || files.length === 0) {
                            setFiles([])
                        } else {
                            setFiles(files.filter((file: any, i: number) => i !== index))
                        }
                    }}
                        onFileExceed={(isExceeded: boolean) => {
                            setIsFileLimit(isExceeded)
                        }}
                    />
                    {
                        pollOpen && <PollCreate
                            callback={(poll: {}) => {
                                setPoll(poll)
                            }}
                            isPollValid={(isPollValid: boolean) => { 
                                setPollValid(isPollValid)
                            }}
                            onClose={() => {
                                setPollOpen(false)
                                setIsPollLimit(true)
                                setPollCount(pollCount - 1)
                            }}
                        />
                    }
                    <div className="text_actions_main mt-4">
                        <div className="text-actions_group flex items-center justify-between">
                            <div className="text_actions_icons flex items-center space-x-1">
                                {/* <div className="text_action">
                                <Tooltip
                                    title="Code"
                                    placement="center"
                                    position='bottom'
                                    transition='fade'
                                    transitionDuration={200}
                                    classNames={{
                                        body: 'tooltip_comp bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.55rem] ml-1',
                                    }}
                                    color='gray'
                                >
                                    <div className="text_action_icon cursor-pointer">
                                        <CodeIcon width={20} height={20} className={'text-primary'} />
                                    </div>
                                </Tooltip>
                            </div> */}
                                <div className="text_action">
                                    {
                                        !isFileLimit ? <Tooltip
                                            title="Media"
                                            placement="center"
                                            position='bottom'
                                            transition='fade'
                                            transitionDuration={200}
                                            className="block"
                                            classNames={{
                                                body: 'tooltip_comp bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.55rem] ml-1',
                                            }}
                                            color='gray'
                                        >
                                            <div className="text_action_icon cursor-pointer min-w-[32px] min-h-[32px] hover:bg-primary/10 flex justify-center items-center rounded-full"
                                                onClick={() => {
                                                    document.getElementById("media_upload")?.click()
                                                }}
                                            >
                                                <input type="file" id="media_upload" hidden
                                                    multiple
                                                    accept="image/*,video/*,gif/*"
                                                    onChange={(e) => {
                                                        onMediaChange(e)
                                                    }}
                                                />
                                                <PhotographIcon width={20} height={20} className={'text-primary'} />
                                            </div>
                                        </Tooltip>

                                            :
                                            <div className="text_action_icon cursor-default opacity-50 select-none">
                                                <PhotographIcon width={20} height={20} className={'text-primary cursor-default'} />
                                            </div>
                                    }
                                </div>
                                <div className="text_action">
                                    {
                                        !isPollLimit ? <Tooltip
                                            title="Poll"
                                            placement="center"
                                            position='bottom'
                                            transition='fade'
                                            transitionDuration={200}
                                            className="block"
                                            classNames={{
                                                body: 'tooltip_comp bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.55rem] ml-1',
                                            }}
                                            color='gray'
                                        >
                                            <div className="text_action_icon cursor-pointer min-w-[32px] min-h-[32px] hover:bg-primary/10 flex justify-center items-center rounded-full"
                                                onClick={() => {
                                                    setPollOpen(true)
                                                    setPollCount(pollCount + 1)
                                                }}
                                            >
                                                <ChartSquareBarIcon width={20} height={20} className={'text-primary'} />
                                            </div>
                                        </Tooltip>

                                            :
                                            <div className="text_action_icon cursor-default opacity-50 select-none ml-[0.4rem]">
                                                <ChartSquareBarIcon width={20} height={20} className={'text-primary cursor-default'} />
                                            </div>
                                    }
                                </div>

                                {
                                    textExceeded && <div className="max_value_count">
                                        {
                                            textLength > 100
                                                ?
                                                <div className="-mt-1"><span className={setClass('text-sm text-red-400')}>{textLength} </span></div>
                                                :
                                                <div className={setClass("flex justify-center items-center w-5 h-5 rounded-full border-2 border-red-400")}>
                                                    <span className="text-xs text-red">{textLength}</span>
                                                </div>
                                        }
                                    </div>
                                }
                            </div>
                            <div className="text_action_btn">
                                <PrimaryButton text="Post" textColor="white" styles={'py-1 px-10 screen-md:py-1 screen-md:px-6'}
                                    textStyle={'screen-md:text-xs'}
                                    disabled={disabled} disabledColor="bg-primary bg-opacity-60"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {
                isFileError && <Transition
                    transition={'pop'}
                    className={'media_error_upload fixed bottom-6 mb-6 right-0 left-0 z-[400] aniamte-pop max-w-[24rem] mr-auto ml-auto text-center'}
                >
                    <div className="bg-primary p-[0.6rem] w-auto inline-block transition transition-scale rounded text-white"
                    >
                        {fileErrorMsg}
                    </div>
                </Transition>
            }
        </div>
    )
}

export default TextCard