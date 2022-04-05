import {print} from "../utils";
import { setClass } from "../utils";
import { useState } from "react";
import { EyeOnIcon, EyeOffIcon } from "./Iconsvg";
import { Search } from "tabler-icons-react";
import { XCircleIcon } from '@heroicons/react/outline';
const Input = ({ id, styleToRender, type, hasLabel, label, placeholder, value, styles, invalid, togglePassword, showPassword, autoCorrect, autoCapitalize, autoComplete, autoSave, autoFocus, min, max, onChange, onFocus, onBlur, cancelShown, onCancel }: {
    id: string,
    styleToRender: string;
    type: string;
    hasLabel?: boolean | undefined;
    label?: string;
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
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    cancelShown?: boolean;
    onCancel?: () => void;
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
                    <div className="signup_redndered_input">
                        {
                            hasLabel && <label htmlFor={label} className={setClass("block")}>{label}</label>
                        }
                        {
                            type === "password" ? 
                                <div className="relative">
                                    <input
                                        type={type ? !showPassword ? "password" : "text" : "text"}
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
                                    />
                                    <div className={setClass("absolute top-0 right-3 flex mt-8 cursor-pointer")}>
                                        {
                                            showPassword ?
                                                <button className={setClass("relative")} onClick={action}>
                                                    <EyeOnIcon color="text-black dark:text-gray-400" width={20} height={20} />
                                                </button>
                                                :
                                                <button className={setClass("relative")} onClick={action}>
                                                    <EyeOffIcon color="text-black dark:text-gray-400" width={20} height={20} />
                                                </button>
                                        }
                                    </div>
                                </div>
                                :
                                <input
                                    type={type}
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
                                />
                        }
                    </div>
                );
            case 'search':
                return (
                    <div className="w-full home_search_input">
                        <div className="relative">
                            <div className="home_search_icon absolute  top-0 left-3 h-full flex items-center justify-center">
                                <Search size={'18'} color={'#536471'}/>
                            </div>
                            <input
                                type={type}
                                className={setClass("search_input bg-[#eff3f4] border border-gray-100 w-full pl-10 py-2 rounded-full focus:bg-white outline-none focus:border-gray-200 placeholder-gray-500 dark:bg-darkModeBg dark:border-none", styles, cancelShown ? 'pr-[4.2rem]' : '')}
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
                            />
                            {
                                cancelShown && <div className="absolute top-0 right-4 h-full flex items-center justify-center">
                                    <button onClick={handleCancel}><span className="text-[#536471]">Cancel</span></button>
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
                    <div className="signup_redndered_input">
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