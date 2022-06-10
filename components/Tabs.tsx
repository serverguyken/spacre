import Link from "next/link";
import { useState } from "react";
import { setClass } from "../utils";
interface Tab {
    id: number;
    name: string;
    component: any;
    link?: string;
    icon?: string;
}
const Tabs = ({
    tabs,
    tab,
}: {
    tabs: Tab[],
    tab: number,
}) => {
    const [activeTab, setActiveTab] = useState(tab);
    return (
        <div className="tab_comp">
            <div className="flex space-x-3 border-b">
            {tabs.map((item: Tab, index) => {
                return (
                    <div key={index}>
                        <div className="select-none flex flex-row justify-between items-center border-b border-gray-200 dark:border-b-gray-50 dark:border-opacity-5">
                            <ul className="flex flex-row justify-between items-center space-x-2 list-none ">
                                <li className={setClass('explore_tabs_item screen-sm:text-[17px] no_hover_bg relative cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800  p-3  inline-block', `${activeTab === item.id ? 'dark:text-white font-semibold before:content-[""]  before:absolute before:bottom-0 before:left-0 before:right-0 before:w-[60%] before:h-[0.20rem] before:block before:m-auto before:bg-primary before:rounded-lg' : 'font-normal text-gray- dark:text-gray-400'}`)} onClick={() => {
                                    setActiveTab(item.id);
                                }}>
                                    {
                                        item.link && (
                                            <Link href={item.link}>
                                                <a>
                                                    <span className="">{item.name}</span>
                                                </a>
                                            </Link>
                                        )
                                    }
                                    {
                                        !item.link && (
                                            <span className="">{item.name}</span>
                                        )
                                    }
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                )
            })}
            </div>
            {
                tabs.map((item: Tab, index) => {
                    return (
                        <div key={index} className="">
                            {
                                item.component && activeTab === item.id && (
                                    <>
                                        {item.component}
                                    </>
                                )
                            }
                            </div>
                    )
                })
            }
        </div>
    )
}

export default Tabs