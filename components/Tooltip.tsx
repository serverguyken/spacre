import { Tooltip as MantineToolTip } from "@mantine/core";
interface TooltipProps {
    children: React.ReactNode;
    title: string;
    width?: number;
    color?: string;
    placement?: "start" | "center" | "end";
    position?: "top" | "bottom" | "left" | "right";
    transition?: "fade" | "scale";
    transitionDuration?: number;
    withArrow?: boolean;
    opened?: boolean;
    hidden?: boolean;
    radius?: number;
    className?: string;
    style?: React.CSSProperties;
    classNames?: {
        root?: string;
        arrow?: string;
        tooltip?: string;
        body?: string;
    };
    styles?: {
    };
}
export default function Tooltip(props: TooltipProps) {
    const { title, placement, position, transition, transitionDuration, withArrow, width, color, opened, hidden, children, radius, className, style, classNames, styles } = props;
    return (
        <MantineToolTip
            label={title}
            placement={placement}
            position={position}
            transition={transition}
            transitionDuration={transitionDuration}
            withArrow={withArrow}
            width={width}
            color={color}
            opened={opened}
            hidden={hidden}
            radius={radius}
            className={className}
            style={style}
            classNames={classNames}
            styles={styles}
        >
            {children}
        </MantineToolTip>
    );
}