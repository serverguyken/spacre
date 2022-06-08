import { setClass } from "../utils";
import Icon from "./Icon";
import Tooltip from "./Tooltip";

const BackButtton = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div
      className={setClass(
        className
          ? className
          : "hover:bg-gray-600 hover:bg-opacity-10 hover:transition hover:ease-in-out dark:hover:bg-darkModeBg cursor-pointer min-w-[36px] min-h-[36px] z-20 flex justify-center items-center rounded-full"
      )}
      onClick={onClick}
    >
      <Tooltip
        title="Back"
        placement="center"
        position="bottom"
        transition="fade"
        transitionDuration={200}
        classNames={{
          body: "tooltip_comp  bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1",
        }}
        color="gray"
      >
        <Icon type="back" width="26" height="26" styles="text-gray-500 mt-1" />
      </Tooltip>
    </div>
  );
};

export default BackButtton;
