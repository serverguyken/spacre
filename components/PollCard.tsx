import { useState } from "react";
import { Poll } from "../interface/User";
import { countSet, dateHelper, setClass } from "../utils";

const PollCard = ({ poll, events }: {
    poll: Poll
    events?: {
        stopPropagation?: boolean;
        onVote?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selected: {
            index: number;
            value: string;
        }, poll: Poll) => void;
    }
}) => {
    const question = poll.question;
    const options = poll.options;
    console.log(options);
    
    const expiresAt = poll.expiresAt;
    const createdAt = poll.createdAt;
    const expired = dateHelper().isPollExpired(expiresAt.date, createdAt, expiresAt.type);
    const [selected, setSelected] = useState({
        index: 0,
        value: options[0].option
    });
    const calcTotal = () => {
        let total = 0;
        options.forEach(option => {
            total += option.votes;
        });
        return total;
    }
    const total = calcTotal();
    const votesInPercent = (votes: number) => {
        const percent = Math.round((votes / total) * 100);
        if (percent > 92) {
            return {
                width: 89,
                actual: percent,
            }
        } else {
            return {
                width: percent,
                actual: percent,
            }
        }
    } 
    
    return (
        <div className="poll rounded max-w-sm py-2 pb-3">
            <div>
                <div className="poll_question mb-2">
                    <h2 className="font-medium text-[15px]">{poll.question}</h2>
                </div>
                {
                    options.map((option, index) => {
                        return (
                            <div key={index} className={setClass(`flex justify-between items-center space-x-2 cursor-default py-2 relative text-sm`)}>
                                
                                <button className={setClass(`cursor-pointer text-black dark:text-white rounded py-1 ml-[0.65rem] z-20`)}
                                    
                                    onClick={(e: any) => { 
                                        if (!expired) {
                                            setSelected({
                                                index: index,
                                                value: option.option
                                            });
                                            if (events && events.onVote) {
                                                events.onVote(e, {
                                                    index: index,
                                                    value: option.option
                                                }, poll);
                                            }
                                        }
                                    }}
                                >{option.option}</button>
                                <div className="votes_percent_count">
                                    <div className="votes_percent">
                                        <span className="text-xs text-black dark:text-white">{votesInPercent(option.votes).actual}%</span>
                                    </div>
                                </div>
                                <div className="absolute -left-2 z-0 bg-gray-200 dark:bg-gray-600 rounded py-[0.15rem] cursor-pointer"

                                    onClick={(e: any) => {
                                        if (!expired) {
                                            setSelected({
                                                index: index,
                                                value: option.option
                                            });
                                            if (events && events.onVote) {
                                                events.onVote(e, {
                                                    index: index,
                                                    value: option.option
                                                }, poll);
                                            }
                                        }
                                    }}
                                    style={{
                                        width: `${votesInPercent(option.votes).width + 2.3}%`,
                                    }}

                                >
                                    &nbsp;
                                </div>
                            </div>
                        )
                    })
                }
                <div className="flex justify-between items-center mt-3">
                    <div className="total_votes text-sm mt-2">
                        <span className="font-normal">Total Votes: {countSet(total, true, 2).num_fixed}</span>
                    </div>
                    <div className="vote_btn">
                        {
                            !expired &&  <button className="bg-primary hover:bg-primary/95 text-white text-sm px-3 py-1 rounded" onClick={(e) => {
                            if (events?.onVote) {
                                events.onVote(e, selected, poll);
                            }
                        }}> Vote</button>
                       }
                    </div>
               </div>
            </div>
           
        </div>
    );
};

export default PollCard;