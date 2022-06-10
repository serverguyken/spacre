import Link from "next/link";
import { useState } from "react";
import { setClass } from "../utils";
const ExploreTabs = ({ tab }: {
    tab: number
}) => {
    const [activeTab, setActiveTab] = useState(tab);
    return (
        <div className="flex flex-row justify-between items-center border-b border-gray-200 dark:border-b-gray-50 dark:border-opacity-5">
            <ul className="flex flex-row justify-between items-center space-x-2 list-none ">
                <li className={setClass('explore_tabs_item screen-sm:text-[17px] no_hover_bg relative cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800  p-3  inline-block', `${activeTab === 0 ? 'dark:text-white font-semibold before:content-[""]  before:absolute before:bottom-0 before:left-0 before:right-0 before:w-[60%] before:h-[0.20rem] before:block before:m-auto before:bg-primary before:rounded-lg' : 'font-normal text-gray- dark:text-gray-400'}`)} onClick={() => {
                    setActiveTab(0);
                   
                }}>
                    <Link href={`/explore/trending`}>
                        <a>
                            <span className="">Trending</span>
                        </a>
                    </Link>
                </li>
                <li className={setClass('explore_tabs_item screen-sm:text-[17px]  no_hover_bg relative cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-3 inline-block', `${activeTab === 1 ? 'dark:text-white font-semibold before:content-[""]  before:absolute before:bottom-0 before:left-0 before:right-0 before:w-[60%] before:h-[0.20rem] before:block before:m-auto before:bg-primary before:rounded-lg' : 'font-normal text-gray-600 dark:text-gray-400'}`)} onClick={() => {
                    setActiveTab(1);
                    
                }}>
                    <Link href={`/explore/new`}>
                        <a>
                            <span>New</span>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
};
export default ExploreTabs;