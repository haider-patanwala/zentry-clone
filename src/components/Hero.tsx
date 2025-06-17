import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const [nextIndex, setNextIndex] = useState(1);
	const [hasClicked, setHasClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [loadedVideo, setLoadedVideo] = useState(0);

	const totalVideos = 4;
	const nextVideoRef = useRef<HTMLVideoElement>(null);

	const nextVideoIndex =
		currentIndex === totalVideos ? 1 : (currentIndex || 1) + 1;

	const hanldeMiniVdClick = () => {
		setHasClicked(true);
		setCurrentIndex(nextVideoIndex);
	};

	useEffect(() => {
		if (currentIndex !== null) {
			setTimeout(() => {
				setNextIndex(nextVideoIndex);
			}, 30000);
		} else if (currentIndex === null) {
			setNextIndex(1);
		}
	}, [currentIndex]);

	console.log(currentIndex);

	const getVideoSrc = (index: number) => {
		return `/videos/hero-${index}.mp4`;
	};

	useEffect(() => {
		if (loadedVideo === totalVideos - 2) {
			setIsLoading(false);
		}
	}, [loadedVideo]);

	useGSAP(
		() => {
			if (currentIndex !== null) {
				// Skip initial load
				gsap.set("#next-video", { visibility: "visible" });
				gsap.to("#next-video", {
					transformOrigin: "center center",
					scale: 1,
					width: "100%",
					height: "100%",
					duration: 1,
					ease: "power.inOut",
					onStart: () => {
						if (nextVideoRef.current) {
							nextVideoRef.current.play();
						}
					},
				});

				gsap.from("#current-video", {
					transformOrigin: "center center",
					scale: 0,
					duration: 1.5,
					ease: "power1.inOut",
				});
			}
		},
		{ dependencies: [currentIndex], revertOnUpdate: true }
	);

	useGSAP(() => {
		gsap.set("#video-container", {
			clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
			borderRadius: "0 0 40% 10%",
		});
		gsap.from("#video-container", {
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			borderRadius: "0 0 0 0%",
			duration: 1,
			ease: "power1.inOut",
			scrollTrigger: {
				trigger: "#video-container",
				start: "center center",
				end: "bottom center",
				scrub: true,
			},
		});
	}, {});

	const handleVideoLoaded = () => {
		setLoadedVideo((prev) => prev + 1);
	};
	return (
		<div className='relative h-dvh w-screen overflow-x-hidden'>
			{isLoading && (
				<div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
					<div className='three-body'>
						<div className='three-body__dot'></div>
						<div className='three-body__dot'></div>
						<div className='three-body__dot'></div>
					</div>
				</div>
			)}
			<div
				id='video-container'
				className='h-dvh relative  z-10 w-screen overflow-hidden'>
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
						src={getVideoSrc(currentIndex || 1)}
						loop
						muted
						id='next-video'
						className='absolute-center invisible z-20 size-64 object-cover object-center'
						onLoadedData={handleVideoLoaded}
					/>
					<video
						src={getVideoSrc(nextIndex)}
						onLoadedData={handleVideoLoaded}
						autoPlay
						loop
						muted
						className='absolute left-0 top-0 size-full object-cover object-center'
					/>
					<h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
						G<b>a</b>ming
					</h1>
					<div className='absolute left-0 top-0 z-40 size-full'>
						<div className='mt-24 px-5 sm:px-10'>
							<h1 className='special-font hero-heading text-blue-100'>
								redefi<b>m</b>e
							</h1>
							<p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
								Enter the Metagame Layer <br />
								Unleash the Play Economy
							</p>
							<Button
								id='watch-trailer'
								title='Watch Trailer'
								leftIcon={<TiLocationArrow />}
								containerClass='bg-yellow-300'
							/>
						</div>
					</div>
				</div>
			</div>
			<h1 className='special-font hero-heading absolute bottom-5 right-5  text-black'>
				G<b>a</b>ming
			</h1>
		</div>
	);
}
