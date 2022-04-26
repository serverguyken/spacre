import { useState } from "react";
import { TimeOut } from "../utils";
import { Spinner } from "../utils/loader";
import Icon from "./Icon";
import Tooltip from "./Tooltip";

function ImagePreview({ file, onClose }: {
    file: any;
    onClose: (e: any) => void;
}) {
    const [image, setImage] = useState('' as any);
    const [loading, setLoading] = useState(true);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
        setImage(fileReader.result);
        TimeOut(() => setLoading(false), 1000);
    }
    return ( 
        <div className="image_preview_container relative">
            {
                loading

                    ?
                    <div className='bg-white mt-5 max-w-sm h-60 flex justify-center items-center rounded'>
                        
                        <Spinner width={24} color='var(--color-primary)' />
                    </div>

                    : <div className='image_preview_main relative mt-5'>
                        <div className='image_preview_image'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={image} alt='image' className="w-auto rounded-sm" />
                        </div>
                        <div className='image_preview_close absolute bg-dimGray top-4 left-4 cursor-pointer absolute  min-w-[28px] min-h-[28px]  z-[24] flex justify-center items-center rounded-full' onClick={onClose}>
                            <Tooltip
                                title="Close
                    "
                                placement="center"
                                position='bottom'
                                transition='fade'
                                transitionDuration={200}
                                classNames={{
                                    body: 'tooltip_comp bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.55rem] ml-1',
                                }}
                                color='gray'
                            >

                                <Icon type='close' width={'20'} height={'20'} styles={'modal_main_content_close_icon_svg cursor-pointer text-gray-500 dark:text-white'} />
                            </Tooltip>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ImagePreview;