import styles from '../styles/Loader.module.css';

interface BUTTONSPINNER_PROPS {
    color: string;
    width: string | number;
    maxWidth?: string | number;
    style?: string | any;
}
function Spinner({color, width, maxWidth, style}: BUTTONSPINNER_PROPS) {
    return (
        <div className={setClass(styles.spinner_container, style)}>
            <div className={styles.spinner_element} >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: width, maxWidth: maxWidth }} fill="blue">
                    <circle cx="50" cy="50" r="46" stroke={color} />
                </svg>
            </div>
        </div>
    );
}

interface LINDELOADER_PROPS {
    color: string;
}
function setClass(...classesArr: string[]) {
    return classesArr.join(' ');
}

function LineLoader() {
    return (
        <div className={setClass(styles.loader, styles.gradient)}>
        </div>
    );
}

function LineLoaderDark() {
    return (
        <div className={setClass(styles.loader_dark, styles.gradient)}>
        </div>
    );
}

export { Spinner, LineLoader, LineLoaderDark };