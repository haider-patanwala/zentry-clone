import { useRef, useState } from "react";

export default function Hero() {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [hasClicked, setHasClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [loadedVideo, setLoadedVideo] = useState(0);

	const totalVideos = 4;
	const nextVideoRef = useRef<HTMLVideoElement>(null);

	const nextVideoIndex = currentIndex === totalVideos ? 1 : currentIndex + 1;

	const hanldeMiniVdClick = () => {
		setHasClicked(true);

		setCurrentIndex(nextVideoIndex);
	};
	console.log(currentIndex);

	const getVideoSrc = (index: number) => {
		return `/videos/hero-${index}.mp4`;
	};
	const handleVideoLoaded = () => {
		setLoadedVideo((prev) => prev + 1);
	};
	return (
		<div className='h-dvh'>
			<div
				id='video-container'
				className='h-dvh relative border-hsla z-10 w-screen overflow-hidden'>
				<div>
					<div className='mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
						<div
							onClick={hanldeMiniVdClick}
							className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
							<video
								ref={nextVideoRef}
								className='size-64 scale-150 object-cover object-center'
								src={getVideoSrc(nextVideoIndex)}
								loop
								muted
								id='current-video'
								onLoadedData={handleVideoLoaded}
							/>
						</div>
					</div>
					<video
						ref={nextVideoRef}
						src={getVideoSrc(currentIndex)}
					/>
				</div>
			</div>
		</div>
	);
}
