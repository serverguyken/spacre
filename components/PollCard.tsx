import { useState } from "react";
import { Poll } from "../interface/User";
import { countSet, setClass } from "../utils";

const PollCard = ({ poll }: {
    poll: Poll
}) => {
    const question = poll.question;
    const options = poll.options;
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
        return Math.round((votes / total) * 100);
    } 
    
    return (
        <div className="poll rounded max-w-sm p-2 pb-3">
            <div>
                <div className="poll_question mb-2">
                    <h2 className="font-medium text-[15px]">{poll.question}</h2>
                </div>
                {
                    options.map((option, index) => {
                        return (
                            <div key={index} className={setClass(`flex justify-between items-center space-x-2 cursor-default py-2 relative text-sm`)}>
                                
                                <button className={setClass(`cursor-pointer text-black dark:text-white rounded py-1 ml-[0.65rem] z-50`)}
                                    
                                    onClick={() => setSelected({
                                        index,
                                        value: option.option
                                    })}
                                >{option.option}</button>
                                <div className="votes_percent_count">
                                    <div className="votes_percent">
                                        <span className="text-xs text-black dark:text-white">{votesInPercent(option.votes)}%</span>
                                    </div>
                                </div>
                                <div className="absolute -left-2 z-0 bg-gray-200 dark:bg-gray-600 rounded py-[0.15rem]"
                                    style={{
                                        width: `${votesInPercent(option.votes) + 2.3}%`,
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
                        <span className="font-normal">Total Votes: {countSet(total).value}</span>
                    </div>
                    <div className="vote_btn">
                        <button className="bg-primary hover:bg-primary/95 text-white text-sm px-3 py-1 rounded" onClick={() => {
                            console.log(selected);
                        }}>Vote</button>
                    </div>
               </div>
            </div>
           
        </div>
    );
};

export default PollCard;