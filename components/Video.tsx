import { setClass, addClass, removeClass, isBrowser, print, TimeOut, toHHMMSS } from '../utils';
import { PlayIcon, PauseIcon, VolumeUpIcon, VolumeOffIcon } from '@heroicons/react/solid';
import { ArrowsDiagonal as FullscreenIcon } from 'tabler-icons-react';
import { Video as VideoType } from '../interface/Video';
import { useState, useEffect } from 'react';
const Video = ({ id, src, autoPlay, loop, muted, hasControls, isAd, styles, videoViews }: VideoType) => {

    const setVideo = (id: string, vSrc: string) => {
        if (isBrowser()) {
            const video_post: any = document.getElementById(`video_${id}`);
            const v = document.getElementById(id) as HTMLVideoElement;
            const play_button = document.getElementById(`${id}_play_button`) as HTMLButtonElement;
            const pause_button = document.getElementById(`${id}_pause_button`) as HTMLButtonElement;
            const video_progress_container = document.getElementById(`${id}_video_progress_container`) as HTMLDivElement;
            const video_progress = document.getElementById(`${id}_video_progress`) as HTMLDivElement;
            const video_bottom = document.getElementById(`${id}_video_bottom`) as HTMLDivElement;
            const video_bottom_controls = document.getElementById(`${id}_video_bottom-controls`) as HTMLDivElement;
            const video_top = document.getElementById(`${id}_video_top`) as HTMLDivElement;
            const video_current_time = document.getElementById(`${id}_current_time`) as HTMLDivElement;
            const video_duration = document.getElementById(`${id}_duration`) as HTMLDivElement;
            const video_getseek_time = document.getElementById(`${id}_video_getseektime`) as HTMLDivElement;
            const getseektime_text = document.getElementById(`${id}_video_getseektime_current`) as HTMLSpanElement;
            const video_seek_container: any = document.getElementById(`${id}_video_seek_container`) as HTMLInputElement;
            const video_seek: any = document.getElementById(`${id}_video_seek`) as HTMLDivElement;
            const volume_on_btn = document.getElementById(`${id}_volume_on_button`) as HTMLButtonElement;
            const volume_off_btn = document.getElementById(`${id}_volume_off_button`) as HTMLButtonElement;
            const fullscreen_btn = document.getElementById(`${id}_fullscreen_button`) as HTMLButtonElement;
            //const video_views = document.getElementById(`${id}_video_views`) as HTMLDivElement;
            const play_button_overlay = document.getElementById(`${id}_play_button_overlay`) as HTMLDivElement;
            let timeout: any;

            const hideControls = () => {
                addClass(video_bottom, 'opacity-0');
                video_bottom.style.transition = 'opacity 0.5s ease-in-out';
                addClass(video_bottom_controls, 'hidden');
                addClass(video_progress_container, 'hidden');
                addClass(video_getseek_time, 'hidden');
            }
            
            const showControls = () => {
                removeClass(video_bottom, 'opacity-0');
                video_bottom.style.transition = 'opacity 0.5s ease-in-out';
                removeClass(video_bottom_controls, 'hidden');
                addClass(video_bottom_controls, 'flex');
                removeClass(video_progress_container, 'hidden');
                if (v.paused || v.ended) {
                    removeClass(play_button, 'hidden');
                    addClass(pause_button, 'hidden');
                } else {
                    removeClass(pause_button, 'hidden');
                    addClass(play_button, 'hidden');
                }
            }

            if (video_post) {
                video_post.oncontextmenu = (e: any) => {
                    e.preventDefault();
                }
            }
            if (v) {
                v.src = vSrc;
                v.addEventListener('play', () => { 
                    //addClass(video_views, 'hidden');
                    addClass(play_button_overlay, 'hidden');
                });
                addClass(v, 'pointer-events-none');

                // Handle play button
                play_button.onclick = () => {
                    addClass(play_button, 'hidden');
                    removeClass(pause_button, 'hidden');
                    v.play();
                };
                // Handle pause button
                pause_button.onclick = () => {
                    addClass(pause_button, 'hidden');
                    removeClass(play_button, 'hidden');
                    v.pause();
                };

                // Handle volume button
                volume_on_btn.onclick = () => {
                    addClass(volume_on_btn, 'hidden');
                    removeClass(volume_off_btn, 'hidden');
                    v.muted = true;
                }
                volume_off_btn.onclick = () => {
                    addClass(volume_off_btn, 'hidden');
                    removeClass(volume_on_btn, 'hidden');
                    v.muted = false;
                }

                // Handle fullscreen button
                fullscreen_btn.onclick = () => {
                    const vid = v as any;
                    const fullscreenElem = vid.requestFullscreen || vid.mozRequestFullScreen || vid.webkitRequestFullscreen || vid.msRequestFullscreen || vid.webkitEnterFullscreen;
                    if (fullscreenElem) {
                        fullscreenElem.call(vid);
                    }
                }

                // if video is paused, show play button
                v.addEventListener('pause', () => {
                    removeClass(play_button, 'hidden');
                    addClass(pause_button, 'hidden');
                });
                // if video is playing, show pause button
                v.addEventListener('play', () => {
                    removeClass(pause_button, 'hidden');
                    addClass(play_button, 'hidden');
                });



                // When video time is updated
                v.ontimeupdate = () => {
                    let progress = (v.currentTime / v.duration) * 100;  // Calculate progress
                    video_progress.style.width = `${progress}%`; // Set width
                    if (video_current_time) {
                        video_current_time.innerHTML = toHHMMSS(v.currentTime); // Set current time
                    };
                }

                // When video is loaded
                v.onloadedmetadata = () => {
                    video_duration.innerHTML = toHHMMSS(v.duration);
                }
                const getClientProgressBound = (e: any, isNegativePositive: string, Number: number) => {
                    if (isNegativePositive === 'negative') {
                        return `${e.clientX - video_progress_container.getBoundingClientRect().left - Number}px`;
                    }
                    if (isNegativePositive === 'positive') {
                        return `${e.clientX - video_progress_container.getBoundingClientRect().left + Number}px`;
                    }
                    return `${e.clientX - video_progress_container.getBoundingClientRect().left}px`;
                }
                // Show the seek tooltip
                video_progress_container.onmousemove = (e: any) => {
                    const seek_time = (e.clientX - video_progress_container.getBoundingClientRect().left) / video_progress_container.clientWidth;
                    const seek_time_ = toHHMMSS(seek_time * v.duration + 1);
                    removeClass(video_getseek_time, 'hidden');
                    video_getseek_time.style.transition = 'display 0.5s ease-in-out';
                    video_getseek_time.style.left = getClientProgressBound(e, 'positive', 0);
                    getseektime_text.innerHTML = `${seek_time_}`;
                    if (seek_time * v.duration > v.duration - 20) {
                        video_getseek_time.style.left = getClientProgressBound(e, 'negative', 40);
                        video_getseek_time.style.transition = 'left 0.5s ease-in-out';
                    }
                    // if seek_time is greater than duration second then hide the tooltip
                    if (seek_time * v.duration > v.duration) {
                        addClass(video_getseek_time, 'hidden');
                        video_getseek_time.style.transition = 'display 0.5s ease-in-out';
                    }
                    video_getseek_time.style.transition = 'none';
                    //video_seek.style.marginLeft = getClientProgressBound(e, 'positive', 0);
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        addClass(video_getseek_time, 'hidden');
                    }, 2000);
                    return false;
                }
                // Go to the seek position when seek bar is clicked
                video_progress_container.onclick = (e: any) => {
                    const seek_time = (e.clientX - video_progress_container.getBoundingClientRect().left) / video_progress_container.clientWidth;
                    v.currentTime = seek_time * v.duration;
                    video_progress.style.width = `${seek_time * 100}%`;
                    removeClass(video_getseek_time, 'hidden');
                    video_getseek_time.style.transition = 'display 0.5s ease-in-out';
                    video_seek_container.style.transition = 'display 0.5s ease-in-out';
                    TimeOut(() => {
                        addClass(video_getseek_time, 'hidden');
                        video_getseek_time.style.transition = 'display 0.5s ease-in-out';
                    }, 1500)
                }

                // Handle video seek slide
                let active = false;
                let currentX: number;
                let currentY: number;
                let initialX: number;
                let initialY: number;
                let xOffset = 0;
                let yOffset = 0;


                const dragStart = (e: any) => {
                    print("started dragging");
                    if (e.type === "touchstart") {
                        initialX = e.touches[0].clientX - xOffset;
                        initialY = e.touches[0].clientY - yOffset;
                        removeClass(video_seek_container, 'hidden');
                        video_seek_container.style.transition = 'none';
                        print("i am being dragged");
                    } else {
                        initialX = e.clientX - xOffset;
                        initialY = e.clientY - yOffset;
                    }

                    if (e.target === video_seek) {
                        active = true;
                    }
                }

                const dragEnd = (e: any) => {
                    print("finished dragging");
                    initialX = currentX;
                    initialY = currentY;
                    active = false;
                }

                const drag = (e: any) => {
                    print("dragging");
                    if (active) {
                        if (e.type === "touchmove") {
                            currentX = e.touches[0].clientX - initialX;
                            currentY = e.touches[0].clientY - initialY;
                            print("i am dragging");
                        } else {
                            currentX = e.clientX - initialX;
                            currentY = e.clientY - initialY;
                        }
                        if (currentX < 0) {
                            currentX = 0;
                        }
                        if (currentX > video_progress_container.clientWidth) {
                            currentX = video_progress_container.clientWidth;
                        }
                        if (currentY < 0) {
                            currentY = 0;
                        }
                        if (currentY > video_progress_container.clientHeight) {
                            currentY = video_progress_container.clientHeight;
                        }
                        video_seek.style.marginLeft = `${currentX}px`;
                        video_getseek_time.style.left = `${currentX}px`;
                        const seek_time = (currentX / video_progress_container.clientWidth) * v.duration;
                        const seek_time_ = toHHMMSS(seek_time + 1);
                        getseektime_text.innerHTML = `${seek_time_}`;
                    }
                }

                //video_progress_container.addEventListener('mousedown', dragStart);
               // video_progress_container.addEventListener('touchstart', dragStart);
                // video_progress_container.addEventListener('mouseup', dragEnd);
               // video_progress_container.addEventListener('touchend', dragEnd);
               // video_progress_container.addEventListener('touchmove', drag);
                // video_progress_container.addEventListener('touchstart', dragStart, false);
                // video_progress_container.addEventListener('touchend', dragEnd, false);
                // video_progress_container.addEventListener('touchmove', drag, false);
                //  video_progress_container.addEventListener('mousedown', dragStart, false);
                // video_progress_container.addEventListener('mouseup', dragEnd, false);
                // video_progress_container.addEventListener('mousemove', drag, false);

                // When video is moved show controls then hide it after 2 seconds

                video_top.onmousemove = () => {
                    showControls();
                    clearTimeout(timeout);
                    timeout = setTimeout(hideControls, 2000);
                }
                video_top.onmouseenter = () => {
                    showControls();
                    clearTimeout(timeout);
                    timeout = setTimeout(hideControls, 2000);
                }
                video_bottom.onclick = () => {
                    showControls();
                    clearTimeout(timeout);
                    timeout = setTimeout(hideControls, 2000);
                }
                video_bottom.onmousemove = () => {
                    showControls();
                    clearTimeout(timeout);
                    timeout = setTimeout(hideControls, 2000);
                }
                video_bottom.onmouseenter = () => {
                    showControls();
                    clearTimeout(timeout);
                    timeout = setTimeout(hideControls, 2000);
                }
                video_bottom.onmouseleave = () => {
                    hideControls();
                }

                video_top.onclick = () => {
                    if (v.paused || v.ended) {
                        v.play();
                        addClass(play_button, 'hidden');
                        removeClass(pause_button, 'hidden');
                    } else {
                        v.pause();
                        addClass(pause_button, 'hidden');
                        removeClass(play_button, 'hidden');
                    }
                    showControls();
                    clearTimeout(timeout);
                    timeout = setTimeout(hideControls, 2000);
                }



                // Hide pause button when video ends
                v.onended = () => {
                    addClass(pause_button, 'hidden');
                    removeClass(play_button, 'hidden');
                }
                // Pause video when page is inactive
                window.onblur = () => {
                    v.pause();
                    addClass(pause_button, 'hidden');
                    removeClass(play_button, 'hidden');
                }

                let options = {
                    root: null,
                    rootMargin: '10px',
                    threshold: 1.0
                }
                let callback = (entries: any) => {
                    entries.forEach((entry: any) => {
                        if (entry.intersectionRatio > 0) {
                            v.pause();
                            addClass(pause_button, 'hidden');
                            removeClass(play_button, 'hidden');
                        }
                        // When the video is visible, play it
                        // if (entry.intersectionRatio > 0.9) {
                        //     // mute the video
                        //     v.muted = true;
                        //     v.play();
                        //     addClass(play_button, 'hidden');
                        //     removeClass(pause_button, 'hidden');
                        //     addClass(volume_on_btn, 'hidden');
                        //     removeClass(volume_off_btn, 'hidden');
                        // }
                    });
                }
                let observer = new IntersectionObserver(callback, options);
                observer.observe(video_post);
            }
        }
    }


    if (isAd) {
        const setAdVideo = (id: string) => {
            if (isBrowser()) {
                const ad__video = document.getElementById(`${id}_ad_video`) as HTMLVideoElement;
                if (ad__video) {
                    ad__video.oncontextmenu = (e) => {
                        e.preventDefault();
                    }
                }
            }
        }
        TimeOut(() => {
            setAdVideo(id);
        }, 0);
        return (
            <div className="video-ad">
                <video
                    id={`${id}_ad_video`}
                    src={src}
                    autoPlay={autoPlay}
                    loop={loop}
                    muted={muted}
                    controls={false}
                    disablePictureInPicture
                    playsInline
                    className={setClass('video-ad__video rounded-lg', styles)}
                >Video load failed</video>
            </div>
        );
    } else {
        TimeOut(() => {
            setVideo(id, src);
        }, 0);
        return (
            <div className="video_post cursor-pointer max-w-[100%]  relative z-0 bg-black dark:bg-darkMode dark:border-gray-50 dark:border-opacity-10 shadow-sm dark:shadow-lg rounded-lg" id={`video_${id}`}>
                <div className='w-full'>
                    <div className="video_getseektime hidden absolute bottom-16 z-30 bg-black bg-opacity-60  pl-[0.2rem] pr-[0.2rem] rounded-sm" id={`${id}_video_getseektime`}>
                        <span className="video_get_seek_time-current text-white text-xs" id={`${id}_video_getseektime_current`}>00:00</span>
                    </div>
                </div>
                <div className="button_overlay absolute top-1/2 left-1/2 mt-[-30px] ml-[-30px]" id={`${id}_play_button_overlay`}>
                    <button className={setClass("video_button__play bg-white rounded-full")} >
                        <PlayIcon  width={50} height={50} className={'text-primary'} />
                    </button>
                </div>
                <div className="video_top w-full h-3/5   absolute z-10"
                    id={`${id}_video_top`}>
                </div>
                {/* <div className="bg-gray-600  p-1 rounded-sm absolute bottom-4 left-4 z-20 video_controls_views__views select-none" id={`${id}_video_views`}>
                    <span className="text-white text-xs">{videoViews} views</span>
                </div>  */}
                <div className="video_bottom h-[24%] flex items-center screen-sm:h-[28%]  bg-gradient-to-t from-black opacity-100 w-full absolute bottom-0 z-20 pb-2 pl-2 pr-2 cursor-auto rounded-lg" id={
                    `${id}_video_bottom`
                }>
                    <div className='w-full '>
                        <div className={setClass("video_progress_container  relative hidden h-[0.2rem] bg-primary w-full rounded-lg cursor-pointer")} id={`${id}_video_progress_container`}>
                            <div className=''>
                                <div className={setClass("video_progress  w-0 h-[0.2rem] bg-white rounded-r-sm")} id={`${id}_video_progress`}>
                                </div>

                                {/* <div className='bg-white block w-3  h-3 rounded-full'>
                        </div> */}
                            </div>
                            <div className="video_seek_container absolute top-0 -mt-2 hidden" id={`${id}_video_seek_container`} role="slider" aria-valuenow={0}>
                                <div className="video_seek bg-white  w-[18px] h-[18px] rounded-full" id={`${id}_video_seek`}>

                                </div>
                            </div>
                        </div>
                        <div className="hidden justify-between items-center mt-3 screen-sm:mt-2 w-full" id={`${id}_video_bottom-controls`}>
                            <div className="video_bcontrols" id={`${id}_video_button`}>
                                <div className="flex items-center space-x-2">
                                    <div className='video_buttons mt-1'>
                                        <button className={setClass("video_button__play")} >
                                            <PlayIcon id={`${id}_play_button`} width={24} height={24} className={'text-white'} />
                                        </button>
                                        <button className={setClass("video_button__pause")}>
                                            <PauseIcon id={`${id}_pause_button`} width={24} height={24} className={'text-white hidden'} />
                                        </button>
                                    </div>

                                    
                                </div>
                            </div>
                            <div className="video_controls_views  video_volume_button_views h-8 flex items-center justify-between  select-none space-x-3">
                                <div className="video_duration_main">
                                    <div className="video_duration_contents text-white">
                                        <div className="video_duration_main__time text-sm">
                                            <span className="video_duration_main__time__current" id={`${id}_current_time`}>00:00</span>
                                            <span className="video_duration_main__time__divider"> / </span>
                                            <span className="video_duration_main__time__duration" id={`${id}_duration`}>00:00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="video_volume_control">
                                    <div className="video_volume_buttto">
                                        <button className={setClass("video_button__volume_on")}>
                                            <VolumeUpIcon id={`${id}_volume_on_button`} width={22} height={22} className={'text-white'} />
                                        </button>
                                        <button className={setClass("video_button__volume_off")}>
                                            <VolumeOffIcon id={`${id}_volume_off_button`} width={22} height={22} className={'text-white hidden'} />
                                        </button>
                                    </div>
                                </div>
                                <div className="video_fullscreen_control">
                                    <button className={setClass("video_button__fullscreen")}>
                                        <FullscreenIcon id={`${id}_fullscreen_button`} width={22} height={22} className={'text-white'} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* <div className="replay_video_overlay">
                    <div className="replay_video_overlay__content">
                    </div>
                </div> */}
                <video
                    id={id}
                    src={src}
                    disablePictureInPicture
                    playsInline
                    aria-label='Embedded video'
                    className='bg-black dark:bg-darkMode dark:border-gray-50 dark:border-opacity-10 dark:shadow-lg rounded-lg'
                >Video load failed</video>
            </div>
        );
    }
}

export default Video;