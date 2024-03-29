import { print } from "../utils";
import { setClass } from "../utils";
import { useState } from "react";
import { EyeOnIcon, EyeOffIcon } from "./Iconsvg";
import { Search } from "tabler-icons-react";
import Icon from "./Icon";
import { XCircleIcon } from '@heroicons/react/outline';
import Tooltip from "./Tooltip";
const Input = ({ id, styleToRender, type, hasLabel, label, name, placeholder, value, styles, invalid, togglePassword, showPassword, autoCorrect, autoCapitalize, autoComplete, autoSave, autoFocus, min, max, onChange, onFocus, onBlur, cancelShown, onCancel, onKeyUp, onKeyDown }: {
    id: string,
    styleToRender: string;
    type: string;
    hasLabel?: boolean | undefined;
    label?: string;
    name?: string;
    placeholder?: string | undefined;
    value: string;
    styles?: string | any;
    invalid?: boolean;
    togglePassword?: any;
    showPassword?: boolean;
    autoCorrect?: string;
    autoCapitalize?: string;
    autoComplete?: string;
    autoSave?: string;
    autoFocus?: boolean;
    max?: number | any;
    min?: number | any;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    cancelShown?: boolean;
    onCancel?: () => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
    const [inputValue, setInputValue] = useState(value);
    const handleChange = (e: any) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
    };
    const handleFocus = (e: any) => {
        if (onFocus) {
            onFocus(e);
        }
    };
    const handleBlur = (e: any) => {
        if (onBlur) {
            onBlur(e);
        }
    };
    const handleCancel = () => {
        setInputValue('');
        if (onCancel) {
            onCancel();
        }
    };
    const action = () => {
        if (type === 'password') {
            if (typeof togglePassword === 'function') {
                togglePassword();
            }
            else {
                print('no togglePassword function');
            }
        }
    };
    function renderInputStyle(style: string) {
        switch (style) {
            case "default":
                return (
                    <div className="signup_rendered_input">
                        {
                            hasLabel && <label htmlFor={label} className={setClass("block")}>{label}</label>
                        }
                        <input
                            type='text'
                            className={setClass("mt-2 w-full py-4 px-3 rounded-sm outline-none  dark:bg-darkModeBg", styles, `${invalid ? "border border-red-500 focus:border-red-500" : "border border-gray-300 focus:border-primary dark:border-gray-50  dark:border-opacity-20"}`)}
                            id={id}
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            autoCorrect={autoCorrect}
                            autoCapitalize={autoCapitalize}
                            autoComplete={autoComplete}
                            autoSave={autoSave}
                            autoFocus={autoFocus}
                            onKeyDown={onKeyDown}
                            onKeyUp={onKeyUp}
                        />
                        
                    </div>
                );
            case 'email':
                return (
                    <div>
                        {
                            hasLabel && <label htmlFor={label} className={setClass("block")}>{label}</label>
                        }
                        <input
                            type='email'
                            name="email"
                            className={setClass("mt-2 w-full py-4 px-3 rounded-sm outline-none  dark:bg-darkModeBg", styles, `${invalid ? "border border-red-500 focus:border-red-500" : "border border-gray-300 focus:border-primary dark:border-gray-50  dark:border-opacity-20"}`)}
                            id={id}
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            autoCorrect={autoCorrect}
                            autoCapitalize={autoCapitalize}
                            autoComplete={autoComplete}
                            autoSave={autoSave}
                            autoFocus={autoFocus}
                            onKeyDown={onKeyDown}
                            onKeyUp={onKeyUp}
                        />
                    </div>
                )
            case 'password':
                return (
                    <div className="relative">
                        {
                            hasLabel && <label htmlFor={label} className={setClass("block")}>{label}</label>
                        }
                        <input
                            type={type === "password" ? showPassword ? "text" : "password" : "text"}
                            name="password"
                            className={setClass("mt-2 w-full py-4 px-3 rounded-sm outline-none dark:bg-darkModeBg", styles, `${invalid ? "border border-red-500 focus:border-red-500 " : "border border-gray-300 focus:border-primary dark:border-gray-50 dark:border-opacity-20 "}`)}
                            id={id}
                            placeholder={placeholder}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            autoCorrect={autoCorrect}
                            autoCapitalize={autoCapitalize}
                            autoComplete={autoComplete}
                            autoSave={autoSave}
                            autoFocus={autoFocus}
                            onKeyDown={onKeyDown}
                            onKeyUp={onKeyUp}
                        />
                        <div className={setClass("absolute top-0 right-3 flex mt-8 cursor-pointer")}>
                            {
                                showPassword ?
                                    <Tooltip
                                        title="Hide Password"
                                        placement="center"
                                        position='bottom'
                                        transition='fade'
                                        transitionDuration={200}
                                        classNames={{
                                            body: 'tooltip_comp -mt-2 bg-gray-500 dark:bg-black dark:text-white text-[0.55rem] -ml-3',
                                        }}
                                        color='gray'
                                    >
                                        <button className={setClass("relative")} onClick={action} type="button">
                                            <EyeOffIcon color="text-black dark:text-gray-400" width={20} height={20} />
                                        </button>
                                    </Tooltip>
                                    :
                                    <Tooltip
                                        title="Reveal Password"
                                        placement="center"
                                        position='bottom'
                                        transition='fade'
                                        transitionDuration={200}
                                        classNames={{
                                            body: 'tooltip_comp -mt-2 bg-gray-500 dark:bg-black dark:text-white text-[0.55rem] -ml-3',
                                        }}
                                        color='gray'
                                    >
                                        <button className={setClass("relative")} onClick={action} type="button">
                                            <EyeOnIcon color="text-black dark:text-gray-400" width={20} height={20} />
                                        </button>
                                    </Tooltip>
                                    
                            }
                        </div>
                    </div>
                )
            case 'username':
                return (
                    <div className="relative">
                        {
                            hasLabel && <label htmlFor={label} className={setClass("block")}>{label}</label>
                        }
                        <input
                            type='text'
                            name="username"
                            className={setClass("mt-2 w-full pl-7 py-4 px-3 rounded-sm outline-none  dark:bg-darkModeBg", styles, `${invalid ? "border border-red-500 focus:border-red-500" : "border border-gray-300 focus:border-primary dark:border-gray-50  dark:border-opacity-20"}`)}
                            id={id}
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            autoCorrect={autoCorrect}
                            autoCapitalize={autoCapitalize}
                            autoComplete={autoComplete}
                            autoSave={autoSave}
                            autoFocus={autoFocus}
                            onKeyDown={onKeyDown}
                            onKeyUp={onKeyUp}
                        />
                        <div className={setClass("absolute top-0 left-3 flex mt-8 cursor-pointer")}>
                            <button className={setClass("relative")} onClick={action}>
                                <Icon type="at" styles={setClass('w-4 h-4', `${invalid ? 'text-red-500' : 'text-primary'}`)} />
                            </button>
                        </div>
                    </div>
                )
            case 'search':
                return (
                    <div className="w-full home_search_input">
                        <div className="relative">
                            <div className="home_search_icon absolute top-0 left-3 h-full flex items-center justify-center">
                                <Search size={'18'} color={'#536471'} />
                            </div>
                            <input
                                type={type}
                                className={setClass("search_input bg-[#eff3f4] border border-gray-100 w-full pl-10 py-2 -pt-1 rounded-full focus:bg-white outline-none focus:border-gray-200 placeholder-gray-500 dark:bg-darkModeBg dark:border-none", styles, cancelShown ? 'pr-[4.2rem]' : '')}
                                id={id}
                                placeholder={placeholder}
                                value={inputValue}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                autoCorrect={autoCorrect}
                                autoCapitalize={autoCapitalize}
                                autoComplete={autoComplete}
                                autoSave={autoSave}
                                autoFocus={autoFocus}
                                onKeyDown={onKeyDown}
                                onKeyUp={onKeyUp}
                            />
                            {
                                cancelShown && <div className="absolute top-2 right-4  flex items-center justify-center screen-sm:top-2 cursor-pointer select-none" role="button" onClick={handleCancel}>
                                    Cancel
                                </div>
                            }
                        </div>
                    </div>
                );
            
            case "range":
                return (
                    <input
                        type={type}
                        min={min}
                        max={max}
                        value={inputValue}
                    />
                )
            default:
                return (
                    <div className="signup_rendered_input">
                        <label htmlFor={label} className={setClass("block")}>{label}</label>
                        <input
                            type={type}
                            className={setClass("form-signup", styles)}
                            id={label}
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            autoCorrect={autoCorrect}
                            autoCapitalize={autoCapitalize}
                            autoComplete={autoComplete}
                            autoSave={autoSave}
                            autoFocus={autoFocus}
                            onKeyDown={onKeyDown}
                            onKeyUp={onKeyUp}
                        />
                    </div>
                );
        }
    }
    return (
        <div className={setClass("form-group")}>
            {
                renderInputStyle(styleToRender)
            }
        </div>
    );
};



export default Input