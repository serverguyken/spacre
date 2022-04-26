import store from "../store";
import { isImage, isVideo } from "../utils";
import ImagePreview from "./ImagePreview";
import VideoPreview from "./VideoPreview";

function MediaHandler({ files, types, limit, onClose, onFileExceed }: {
    files: any[];
    types: string[];
    limit: number;
    onClose: (e: any) => any;
    onFileExceed: (e: any) => any;
}) {
    if (files.length === 1) {
        if (isImage(types[0])) {
            return <ImagePreview file={files[0]} onClose={() => {
                onClose(0)
                onFileExceed(false)
            }} />
        } else if (isVideo(types[0])) {
            onFileExceed(true)
            return <VideoPreview file={files[0]} onClose={() => {
                onClose(0)
                onFileExceed(false)
            }} 
            /> 
        }
    } else if (files.length > 1) {
        if (files.length >= limit) {
            onFileExceed(true)
        }
        return  (
            <div className='media_handler_main grid grid-cols-2 gap-2'>
                {
                    files.map((file, index) => {
                        if (isImage(types[index])) {
                            return <ImagePreview file={file} onClose={() => {
                                onClose(index)
                                const length = files.length - 1
                                if (length < limit) {
                                    onFileExceed(false)
                                }
                            }} />
                        } else if (isVideo(types[index])) {
                            return <VideoPreview file={file} onClose={() => {
                                onClose(index)
                                const length = files.length - 1
                                if (length < limit) {
                                    onFileExceed(false)
                                }
                            }} />
                        }
                    })
                }
            </div> )
    }
    return <></>
}

export default MediaHandler;