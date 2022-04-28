import { Spinner } from "../utils/loader";

function MainLoader ({ width }: { width?: number }) {
    return ( 
        <Spinner width={width ? width : 24} color='var(--color-primary)' />
    )
}

export default MainLoader;