
import { Reply, Space } from "../interface/User";
import Icon from "./Icon";

const SpaceImageModal = ({
    image,
    space,
    renderType,
    onClose,
}: {
    image: string;
    renderType: "space" | "reply" | "user";
    space?: Space | Reply;
    onClose?: () => void;
}) => {
    return (
        <div className="fixed top-0 left-0 z-[99999] bg-[rgba(66,47,47,0.4)]  w-full h-full cursor-default"
        onClick={() => {
            if (onClose) {
                onClose();
            }
        }}
        >
            <div className="close_button mt-4 ml-4 hover:bg-gray-400/30 w-10 h-10 flex justify-center items-center rounded-full cursor-pointer"
                onClick={() => {
                    if (onClose) {
                        onClose();
                    }
                }}
            >
                <Icon type="close" width="24px" height="24px" />
            </div>
            <div className="flex mt-40">
                <div className="image-view min-w-[300px] max-w-[640px] mx-auto"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        // center the image horizontally and vertically
                        margin: "0 auto",
                    }}
                >
                    <img src={image} alt="" 
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                    />
                        
                </div>
            </div>
        </div>
    );
}

export default SpaceImageModal;