import { CodeIcon, PhotographIcon, EmojiHappyIcon } from "@heroicons/react/outline"
import { PrimaryButton } from "./Buttons"
import { useState, useEffect } from "react"
import { setClass, isBrowser, generateLoadingTime, TimeOut, print, StorageEvent, toHTML, getTypeByTrigger, Strategy } from "../utils"
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


const linkifyPlugin = createLinkifyPlugin()




const TextCard = () => {
    const [text, setText] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [preview, setPreview] = useState(false)
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
    print("TextCard", "maxInPercent", maxInPercent)
    const testContent = "Hello @serverguyken, this is a test post. I hope you like it :) #test. Visit https://www.web.com for more info."



    function getAllTextFromEditor() {
        const content = editorState.getCurrentContent()
        const text = content.getPlainText()
        return text
    }

    //print("TextCard", "getAllTextFromEditor", toHTML(getAllTextFromEditor()))

    //print(toHTML(testContent)._html)

    useEffect(() => {
        if (text.length > 0) {
            setDisabled(false)
        } else {
            setDisabled(true)
            setPreview(false)
        }
        if (textExceeded) {
            setDisabled(true)
        } 
    }, [text, textExceeded])



    const plugins = [mentionPlugin, hashtagPlugin, linkifyPlugin]



    const handleChange = (state: any) => {
        const value = state.getCurrentContent().getPlainText()
        setEditorState(state)
        setText(value)
        setTextExceeded(value.length > maxValue)
        setMaxInitialValue(value.length)
        setTextLength(value.length)
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
        //print("ADDED", mention)
    }

    const onHashtagAdd = (hashtag: any) => {
        // print("ADDED", hashtag)
    }

    const { MentionSuggestions } = mentionPlugin
    const HashtagSuggestions = hashtagPlugin.MentionSuggestions
    return (
        <div className="relative post_textarea screen-sm:hidden">
            <div className="border-b border-gray-100 dark:border-borderDarkMode p-2">
                <div className="w-auto">
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
                <div className="text_actions_main mt-4">
                    <div className="text-actions_group flex items-center justify-between ">
                        <div className="text_actions_icons flex items-center space-x-3">
                            <div className="text_action">
                                <div className="text_action_icon cursor-pointer">
                                    <CodeIcon width={20} height={20} className={'text-primary'} />
                                </div>
                            </div>
                            <div className="text_action">
                                <div className="text_action_icon cursor-pointer">
                                    <PhotographIcon width={20} height={20} className={'text-primary'} />
                                </div>
                            </div>
                            <div className="text_action">
                                <div className="text_action_icon cursor-pointer">
                                    <EmojiHappyIcon width={20} height={20} className={'text-primary'} />
                                </div>
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
                            <PrimaryButton text="Post" textColor="white" styles={'py-3 px-10 screen-md:py-2 screen-md:px-6'}
                                textStyle={'screen-md:text-xs'}
                                disabled={disabled} disabledColor="bg-primary bg-opacity-60"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextCard