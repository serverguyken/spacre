import { Meta } from "../interface/Meta";
import { stopPropagation } from "../utils";

function MetaCard({ meta }: {
    meta: Meta;
}) {
    const cardProps = {
        large: {
            width: 'auto',
            maxWidth: '400px',
        }
    } as any
    return ( 
        <a href={meta.initial_url} target='_blank' rel='noopener noreferrer'
            onClick={(e: any) => {
                stopPropagation(e)
            }}
        >
            <div className='meta_card_header text-left border border-gray-200 dark:border-borderDarkMode max-w-[400px] h-auto rounded relative'
            >
                <div className='meta_card_header_image rounded-t'
                    style={{
                        backgroundImage: `url(${meta.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        width: cardProps[meta.card].width,
                        maxWidth: cardProps[meta.card].maxWidth,
                        height: '220px',
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={meta.image !== null ? meta.image : ''} alt={meta.title} className='hidden rounded-t' />
                </div>
                <div className="bg-white dark:bg-darkMode border-t border-gray-200 dark:border-borderDarkMode rounded-b relative">
                    <div className="px-2 py-2 mt-2">
                        <div className="">
                            <p className="text-sm leading-5 text-gray-500">
                                {meta.short_url}
                            </p>
                        </div>
                        <h3 className="mt-1 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                            {meta.title}
                        </h3>
                    </div>
                </div>
            </div>
        </a>
    ) 
}

export default MetaCard;