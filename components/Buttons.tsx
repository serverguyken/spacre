import { setClass } from '../utils'
import Icon from './Icon';
interface DEFAULT_BUTTON_PROPS {
    color?: string | any;
    textColor?: string;
    width?: string | any;
    height?: string | any;
    text?: any,
    textStyle?: string,
    action?: any,
    children?: any
    styles?: any
    disabled?: boolean
}
interface BUTTON_PROPS {
    textColor?: string;
    width?: string | any;
    height?: string | any;
    text?: any,
    textStyle?: string,
    action?: any,
    children?: any
    styles?: string | any
    disabled?: boolean
    disabledColor?: string
}
function DefaultButton({ color, textColor, width, height, text, textStyle, action, children, styles }: DEFAULT_BUTTON_PROPS) {
    return (
        <div>
            <button className={setClass(color, width, height, styles)} onClick={action}>
                <p className={"font-medium text-sm text-center " + textStyle} style={{ color: textColor }}>{text}</p>
                {children}
            </button>
        </div>
    );
}
function PrimaryButton({ textColor, width, height, text, textStyle, styles, action, children, disabled, disabledColor }: BUTTON_PROPS) {
    return (
        <div>
            <button className={setClass("primary_btn_comp select-none", `${disabled ? `${disabledColor ? disabledColor : 'bg-gray-400'}  cursor-not-allowed` : "bg-primary dark:bg-primary primary_bg_transition"}`, "border-radius-main", width, height, styles)} onClick={action} disabled={disabled}>
                <span className={"font-medium text-sm text-center " + textStyle} style={{ color: textColor }}>{text}</span>
                {children}
            </button>
        </div>
    );
}

function PrimaryButtonLink({ textColor, width, height, text, textStyle, action, children }: BUTTON_PROPS) {
    return (
        <div>
            <a className={setClass("primary_btn_comp select-none primary_bg_transition  bg-primary border-radius-main", width ,height)} href={action}>
                <p className={"font-medium text-sm text-center " + textStyle} style={{ color: textColor }}>{text}</p>
                {children}
            </a>
        </div>
    );
}

function SecondaryButton({ textColor, width, height, styles, text, textStyle, action, children, disabled }: BUTTON_PROPS) {
    return (
        <div>
            <button className={setClass("secondary_btn_comp select-none", `${disabled ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black black_bg_transition"}`, "border-radius-main", width, height, styles)} onClick={action} disabled={disabled}>
                <p className={"font-medium text-sm text-center " + textStyle + textColor} >{text}</p>
                {children}
            </button>
        </div>
    );
}


interface SocialButtonProps {
    color: string;
    textColor?: string;
    width?: string | any;
    height?: string | any;
    styles?: any
    text?: any;
    textStyle?: string;
    action?: any;
    children?: any;
    icon: any;
    iconColor?: string | any;
    iconWidth: string;
    disabled?: boolean
}

function SocialButton({ color, textColor, width, height, styles, text, textStyle, action, children, icon, iconColor, iconWidth, disabled }: SocialButtonProps) {
    return (
        <div>
            <div className={setClass("flex justify-center items-center social_btn_comp border-radius-main", `${disabled ? "bg-gray-400 text-white  cursor-not-allowed" : `social_btn_comp white_bg_transition ${color}`}`,width,height, styles)} role="button" onClick={action}>
                {
                    icon === "github" ?
                        <div className={setClass(iconWidth, 'mr-2')}>
                            <Icon type="github" color={iconColor} />
                        </div>
                        :
                        null
                }
                <div >
                    <p className={"font-medium text-sm text-center " + textStyle} style={{ color: textColor }}>{text}</p>
                    {children}
                </div>
            </div>
        </div>
    );
}

export { DefaultButton, PrimaryButton, PrimaryButtonLink, SecondaryButton, SocialButton };