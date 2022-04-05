export interface Video {
    id: string,
    src: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    hasControls?: boolean;
    isAd: boolean;
    styles?: any;
    videoViews?: string;
}
