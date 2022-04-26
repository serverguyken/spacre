import { addClass, removeClass, setClass } from '../utils'
import TransitionStyles from '../styles/Transition.module.css';
interface Props {
    transition: string;
    className?: string;
    children?: any;
    timeout?: number;
}
function Transition(props: Props) {
    const { transition, className, timeout } = props;
    const setStyle = {
        pop: TransitionStyles.pop,
        fade: TransitionStyles.fade,
        fadeOut: TransitionStyles.fadeOut,
        slide: TransitionStyles.slide,
        slideUp: TransitionStyles.slideUp,
        slideDown: TransitionStyles.slideDown,
        slideLeft: TransitionStyles.slideLeft,
        slideRight: TransitionStyles.slideRight,
        slideUpLeft: TransitionStyles.slideUpLeft,
        slideUpRight: TransitionStyles.slideUpRight,
    } as any;
    if (timeout && typeof timeout === 'number') { 
        // const transitionClass = document.querySelector(`.${setStyle[transition]}`);
        // if (transitionClass) {
        //     setTimeout(() => {
        //         transitionClass.classList.add(TransitionStyles.transitionEnd);
        //     }, timeout);
        // }
        
    }
    return ( 
        <div className={setClass('___transition_comp',TransitionStyles.transition_comp)}>
            <div className={setClass(`${className} ${setStyle[transition]}`)}>
                {props.children}
            </div>
        </div>
     );
}

export default Transition; 