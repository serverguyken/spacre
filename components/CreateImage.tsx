import { setClass, generateFirstWord } from '../utils'
const CreateImage = ({ name, img, alt, width, height }: {
    name: string,
    img: string | any,
    alt?: string | undefined
    width?: string | any
    height?: string | any
}) => {
    if (img !== false) {
        return (
            <div className='w-8 h-8 rounded-full select-none'>
                <img className='w-8 h-8 rounded-full' src={img} alt={alt} />
            </div>
        )
    } else {
        return (
            <div className={setClass('bg-blue-700 flex justify-center items-center rounded-full select-none', width, height)}>
                <span className='text-white text-lg'>{generateFirstWord(name)}</span>
            </div>
        )
    }
}

export default CreateImage