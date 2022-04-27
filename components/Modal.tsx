import { XIcon } from "@heroicons/react/outline"
import {setClass} from '../utils/'
interface ModalStyles {
    modalContainer?: {
        background?: string,
        className?: string,
        padding?: string,
    },
    modal?: {
        background?: string,
        width?: string,
        height?: string,
        padding?: string,
        position?: string,
        class?: string,
        content?: {
            class?: string,
            background?: string,
            position?: string,
            border?: string,
        }
    },
    icon?: {
        color?: string,
        size?: number
        display?: string
        placement?: string,
        padding?: string
        hover?: {
            background: string
        },
        className?: string,
        tooltip?: {
            className?: string,
            background?: string,
        }
    },
    children?: {
        position?: string,
        top?: string,
        bottom?: string,
        left?: string,
        right?: string,
        zIndex?: string,
        padding?: string,
        background?: string,
    },
    overflow?: {
        hidden?: boolean,
        scroll?: boolean,
        auto?: boolean,
        className?: boolean,
    },
}
const Modal = ({ opened, onClose, children, styles, showCloseIcon }: {
    opened: boolean,
    onClose: () => void,
    children: React.ReactNode
    styles?: ModalStyles,
    showCloseIcon?: boolean
}) => {
    if (styles?.overflow?.hidden) { 
        document.body.style.overflow = 'hidden'
    } else if (styles?.overflow?.scroll) {
        document.body.style.overflow = 'scroll'
    } else if (styles?.overflow?.auto) {
        document.body.style.overflow = 'auto'
    }
    return (
        <div>
            <div>
                <div className={setClass("modal_main_inner  opacity-100 z-[300] top-0 left-0 bottom-0 right-0 h-full overflow-y-scroll  pr-4 pl-4 flex justify-center items-start ", `${styles?.modal?.class ? styles?.modal?.class : 'screen-xssm:bg-white screen-xssm:dark:bg-darkMode'} ${styles?.modal?.content?.position ? styles?.modal?.content?.position : 'absolute'} 
                ${styles?.modalContainer?.padding ? styles?.modalContainer.padding : 'pt-12 pb-12'},`
                )}
                
                >
                    <div className={setClass("z-[1] opacity-100 rounded-lg", `${styles?.modal?.content?.background ? styles?.modal?.content?.background : 'bg-white dark:bg-darkMode'}`, `${
                        styles?.modal?.width ? styles?.modal?.width : 'w-[440px]'
                        }`,
                        `${styles?.modal?.content?.border ? styles?.modal?.content?.border : 'border border-gray-100 screen-xssm:border-none bg-white dark:bg-darkMode dark:border-opacity-10'}`,
                        `${styles?.modal?.height ? styles?.modal?.height : 'h-auto'}`,
                        `${styles?.modal?.padding ? styles?.modal?.padding : 'p-[20px]'}`,
                        `${styles?.modal?.position ? styles?.modal?.position : 'relative'}`,
                        `${styles?.modal?.content?.class ? styles?.modal?.content?.class : ''}`
                    )}>
                        {
                            showCloseIcon &&
                            <div className="modal_main_content_close relative" onClick={onClose}>
                                    <div className={setClass("modal_main_content_close_icon cursor-pointer absolute top-0 min-w-[36px] min-h-[36px] z-20 flex justify-center items-center rounded-full",
                                    `${styles?.icon?.placement && styles?.icon.placement === 'right' ? 'right-2' : 'left-2'}`,
                                    `${styles?.icon?.hover ? styles?.icon.hover?.background : 'hover:bg-gray-600 hover:bg-opacity-10 hover:transition hover:ease-in-out dark:hover:bg-darkModeBg'}`,
                                        `${styles?.icon?.padding ? styles?.icon.padding : 'px-2 py-1'}`,
                                        `${styles?.icon?.className ? styles?.icon.className : ''}`,
                                    
                                )}>
                                    <XIcon width={`${styles?.icon?.size || 24}px`} height={`${styles?.icon?.size || 24}px`} className={`modal_main_content_close_icon_svg cursor-pointer ${styles?.icon?.color || 'text-gray-500 dark:text-white'}`} />
                                </div>
                                <div className={setClass("modal_close_tooptip absolute invisible opacity-0 top-10 screen-xssm:top-6  z-20 bg-gray-500 dark:bg-darkModeBg dark:text-white w-auto p-1 text-center text-[0.65rem] text-white rounded-sm shadow-sm", `${styles?.icon?.placement === 'right' ? 'right-2': 'left-3'}`, `${styles?.icon?.tooltip?.className ? styles.icon.tooltip.className : ''}`)}>
                                    <div className="like_tooltip_content">
                                        Close
                                    </div>
                                </div>
                            </div>
                        }
                        {children}
                    </div>
                </div>
            </div>
            <div className={setClass("modal_main_background overflow-hidden fixed top-0 left-0 bottom-0 right-0 z-[200]  pointer-events-none", `${styles?.modalContainer?.background ? styles?.modalContainer?.background : 'bg-[#5c5d5e] screen-xssm:bg-white  dark:bg-darkMode opacity-50 screen-xssm:opacity-100'}`,
            )}></div>
        </div>
    )
};

export default Modal;