import { useState } from "react";

const Poll = ({ poll }: {
    poll: {
        question: string,
        options: {
            id: number,
            option: string,
            votes: number
        }[]
    };
}) => {
   console.log(poll);
    return (
        <div className="poll">
            <div>
                <h2 className="font-medium">{poll.question}</h2>
                {
                    poll.options.map((option, index) => {
                        return (
                            <div key={index}>
                                <input type="radio" name="poll" />
                                <label>{option}</label>
                            </div>
                        )
                    })
                }
            </div>
           
        </div>
    );
};

export default Poll;