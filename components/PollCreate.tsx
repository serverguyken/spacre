import { useEffect, useState } from "react";
import { Poll } from "../interface/User";
import { createDate, dateFromDays, dateFromISOString } from "../utils";
import Icon from "./Icon";
import Tooltip from "./Tooltip";

function PollCreate({ callback, isPollValid, onClose }: {
    callback: (poll: Poll) => void;
    isPollValid: (isPollValid: boolean) => void;
    onClose: () => void;
}) {
    const [optionsCount, setOptionsCount] = useState(2);
    const [optionsLimit, setOptionsLimit] = useState(3);
    const [question, setQuestion] = useState("");
    const [optionsInput, setOptionsInput] = useState([
        {
            id: 0,
            placeholder: `Option ${1}`,
            value: "",
            isLast: optionsCount === 1,
            votes: 0
        },
        {
            id: 1,
            placeholder: `Option ${2}`,
            value: "",
            isLast: optionsCount === 2,
            votes: 0
        },
    ]);
    const [expiresAt, setExpiresAt] = useState('1h');
    const [poll, setPoll] = useState({
        question: "",
        options: [] as any,
        expiresAt: {
            date: dateFromDays('1h').date,
            type: 'hour',
            unit: '1h'
        },
        createdAt: dateFromISOString(new Date().toISOString()),
    });
    const [pollValid, setPollValid] = useState(false);
    useEffect(() => {
        callback(poll);
    }, [callback, poll]);
    
    useEffect(() => {
        if (question === "" || optionsCount === 2 && optionsInput[0].value === "" || optionsInput[1].value === "") {
            setPollValid(false);
        } else {
            setPollValid(true);
        }
    }, [question, optionsCount, optionsInput]);

    useEffect(() => {
        isPollValid(pollValid);
    }, [pollValid, isPollValid]);



    const handleOptionChange = (e: any, id: number) => {
        const newOptionsInput = [...optionsInput];
        newOptionsInput[id].value = e.target.value;
        setOptionsInput(newOptionsInput);
        setPoll({
            ...poll,
            options: newOptionsInput.map((option) => {
                return {
                    id: option.id,
                    option: option.value,
                    votes: option.votes
                };
            }),
        });
    };

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
        setPoll({
            ...poll,
            question: e.target.value,
        });
    };

    const setExpiry = (value: any) => { 
        const createdAt = createDate();
        const expiresAt = {
            date: dateFromDays(value).date,
            type: dateFromDays(value).type,
            unit: value
        }
        setExpiresAt(value);
        setPoll({
            ...poll,
            expiresAt,
            createdAt,
        });
    };
    console.log(poll, "poll");
    return (
        <div className="poll_container bg-white dark:bg-darkMode rounded-lg  border border-gray-200 dark:border-borderDarkMode max-w-sm relative mt-2 mb-2">
            <div className="poll_header p-2 relative pb-8">
                {/* <div className="poll_close min-w-[28px] min-h-[28px] absolute right-0 text-gray-500 hover:text-primary hover:bg-primary/10 flex justify-center items-center rounded-full">
                    <button className="btn btn-clear" onClick={onClose}>
                        <Icon type="close" width="20" height="20" styles="" />
                    </button>
                </div> */}
                <div className="poll_header_text mt-5">
                    <textarea
                        placeholder="Ask a question"
                        className="outline-none focus:outline-none appearance-none rounded-none border-b border-gray-200 inset-0 py-1 dark:bg-darkMode dark:text-white dark:placeholder-gray-500 dark:border-borderDarkMode focus:border-b focus:border-primary dark:focus:border-b dark:focus:border-primary w-full font-medium text-gray-900 placeholder-gray-900 resize-none h-[2.2rem] max-h-20 overflow-y-auto"
                        onChange={(e: any) => handleQuestionChange(e)}
                    />
                </div>
                <div className="polls_options mt-3">
                    {
                        optionsInput.map((option, index) => {
                            if (index === optionsLimit) {
                                return null
                            }
                            else {
                                return (
                                    <div className="poll_option_item w-full mb-2" key={index}>
                                        <div className="flex items-center space-x-2">
                                            <div className="poll_option_item_text w-full">
                                                <input type="text"
                                                    placeholder={option.placeholder}
                                                    className="border border-gray-200 dark:bg-darkMode text-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-borderDarkMode outline-none w-full focus:border-primary dark:focus:border-primary rounded p-1 placeholder-gray-700"
                                                    onChange={(e: any) => handleOptionChange(e, option.id)}
                                                />
                                            </div>
                                            {
                                                !option.isLast && index !== optionsLimit - 1 && <div className="min-w-[32px] min-h-[32px]"></div>
                                            }
                                            {
                                                option.isLast && index !== optionsLimit - 1 &&
                                                <Tooltip
                                                    title="Add"
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
                                                    <div className="poll_option_new cursor-pointer text-primary min-w-[32px] min-h-[32px] hover:bg-primary/10 flex justify-center items-center rounded-full appearance-none"
                                                        onClick={() => {
                                                            setOptionsCount(optionsCount + 1);
                                                            const lastOption = optionsInput.find(option => option.isLast);
                                                            if (lastOption) {
                                                                lastOption.isLast = false;
                                                            }
                                                            setOptionsInput([
                                                                ...optionsInput,
                                                                {
                                                                    id: optionsCount,
                                                                    placeholder: `Option ${optionsCount + 1} (optional)`,
                                                                    value: "",
                                                                    isLast: true,
                                                                    votes: 0
                                                                },
                                                            ]);
                                                        }}
                                                    >
                                                        <button
                                                        >
                                                            <Icon type="plus" width={'20'} height={'20'} styles="text-primary" />
                                                        </button>
                                                    </div>
                                                </Tooltip>
                                            }
                                            {
                                                (index === 2) &&
                                                <Tooltip
                                                    title="Remove"
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
                                                    <div className="poll_option_new cursor-pointer text-primary min-w-[32px] min-h-[32px] hover:bg-red-500/10 flex justify-center items-center rounded-full appearance-none"
                                                        onClick={() => {
                                                            setOptionsCount(optionsCount - 1);
                                                            const currentOption = optionsInput.find(option => option.id === index);
                                                            if (currentOption) {
                                                                const newOptionsInput = optionsInput.filter(option => option.id !== index);
                                                                setOptionsInput(newOptionsInput);
                                                                const lastOption = newOptionsInput[newOptionsInput.length - 1];
                                                                if (lastOption) {
                                                                    lastOption.isLast = true;
                                                                    lastOption.placeholder = `Option ${lastOption.id + 1}`;
                                                                }
                                                                // remove the current option from the poll
                                                                const newPoll = {
                                                                    ...poll,
                                                                    options: newOptionsInput.map((option) => {
                                                                        return {
                                                                            id: option.id,
                                                                            option: option.value,
                                                                        };
                                                                    }
                                                                    ),
                                                                };
                                                                setPoll(newPoll);
                                                            }
                                                        }}
                                                    >
                                                        <button
                                                        >
                                                            <Icon type="close" width={'20'} height={'20'} styles="text-red-500" />
                                                        </button>
                                                    </div>
                                                </Tooltip>
                                            }

                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <div className="poll_close flex justify-between p-2 mr-2">
                <div className="poll_expiry">
                    <div className="flex items-center space-x-2">
                        <div className="poll_expiry_text">
                            <div className="text-gray-700 dark:text-white">
                                Expires: 
                            </div>
                        </div>
                        <div className="poll_expiry_select select-none">
                            <div className="">
                                <div className="poll_expiry_select_item flex items-center space-x-2 cursor-pointer select-none relative"
                                >
                                    <div className="poll_expiry_selected_item w-full relative flex items-center space-x-2 select-none">
                                        <select name="" id=""
                                            className="bg-white border border-gray-200 dark:bg-darkMode text-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-borderDarkMode outline-none w-24 pl-1 rounded py-[0.3rem]  placeholder-gray-700 select-none appearance-none cursor-pointer"
                                            onChange={(e: any) => {
                                                const selectedOption = e.target.value;
                                                setExpiry(selectedOption);
                                            }}
                                        >
                                            <option value="1h">1 hour</option>
                                            <option value="5h">5 hours</option>
                                            <option value="1d">1 Day</option>
                                            <option value="2d">2 Days</option>
                                            <option value="3d">3 Days</option>
                                            <option value="4d">4 Days</option>
                                            <option value="5d">5 Days</option>
                                            <option value="6d">6 Days</option>
                                            <option value="7d">7 Days</option>
                                        </select>
                                        <div className="poll_expiry_dropdown_open absolute right-2">
                                            <Icon type="chevron-down" width={'20'} height={'20'} styles={'dark:text-white text-dimGray'} />
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <button className="border border-primary p-1 text-primary hover:bg-primary/10 rounded text-sm" onClick={onClose}>
                    Remove poll
                </button>
            </div>
        </div>
    )
}

export default PollCreate;