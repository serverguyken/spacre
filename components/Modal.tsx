import { XIcon } from "@heroicons/react/outline"
import {setClass} from '../utils/'
interface ModalStyles {
    modalContainer?: {
        background: string,
    },
    modal?: {
        background: string,
        width: string,
        padding: string,
    },
    icon: {
        color?: string,
        size?: number
        display?: string
        placement?: string,
        hover?: {
            background: string
        }
    },
}
const Modal = ({ opened, onClose, children, styles }: {
    opened: boolean,
    onClose: () => void,
    children: React.ReactNode
    styles?: ModalStyles
}) => {
    return (
        <div>
            <div>
                <div className="modal_main_inner  absolute opacity-100 z-[300] top-0 left-0 bottom-0 right-0 h-full  pt-12 pb-12 pr-4 pl-4 flex justify-center items-start screen-xssm:bg-white screen-xssm:dark:bg-darkMode">
                    <div className={setClass("modal_main_content relative z-[1] opacity-100 rounded-lg", `${styles?.modal?.background ? styles?.modal?.background : 'border border-gray-100 screen-xssm:border-none bg-white dark:bg-darkMode dark:border-opacity-10 '}`, `${
                        styles?.modal?.width ? styles?.modal?.width : 'w-[440px]'
                        }`,
                        `${styles?.modal?.padding ? styles?.modal?.padding : 'p-[20px]'}`
                    )}>
                        <div className="modal_main_content_close" onClick={onClose}>
                            <div className={setClass("modal_main_content_close_icon cursor-pointer absolute top-6  px-2 py-1  rounded-sm",
                                `${styles?.icon.placement && styles?.icon.placement === 'right' ? 'right-3' : 'left-3'}`,
                                `${styles?.icon.hover ? styles?.icon.hover?.background : 'hover:bg-gray-100 hover:bg-opacity-10 hover:transition hover:ease-in-out dark:hover:bg-darkModeBg'}`,
                            )}>
                                <XIcon width={`${styles?.icon?.size || 24}px`} height={`${styles?.icon?.size || 24}px`} className={`modal_main_content_close_icon_svg ${styles?.icon?.color || 'text-gray-500 dark:text-white'}`} />
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
            <div className={setClass("modal_main_background fixed top-0 left-0 bottom-0 right-0 z-[200]  pointer-events-none", `${styles?.modalContainer?.background ? styles?.modalContainer?.background : 'bg-[#18191a] screen-xssm:bg-white  dark:bg-darkMode opacity-75'}`)}></div>
        </div>
    )
};

export default Modal;