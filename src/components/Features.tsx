import { TiLocationArrow } from "react-icons/ti";
import { cn } from "../lib/cn";
import { useRef, useState, type MouseEvent } from "react";

export default function Features() {
	return (
		<section className='bg-black pb-52'>
			<div className='container mx-auto px-3 md:px-3'>
				<div className='px-5 py-32'>
					<p className='font-circular-web text-lg text-blue-50'>
						Into the Metagame Layer
					</p>
					<p className='max-w-md font-circular-web text-lg text-blue-50/50'>
						Immerse yourself in a rich and ever-expanding universe where a
						vibrant array of products converge into an interconnected overlay
						experience on your world.
					</p>
				</div>
				{/* ============Bento Grid============ */}
				<BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
					<BentoCard
						src='/videos/feature-1.mp4'
						title={
							<>
								radi<b>n</b>t
							</>
						}
						description='A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure.'
					/>
				</BentoTilt>
				<div className='grid min-h-[135vh] gap-5 grid-cols-2 grid-rows-3'>
					<BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
						<BentoCard
							src='/videos/feature-2.mp4'
							title={
								<>
									zig<b>m</b>a
								</>
							}
							description='An anime and gaming-inspired NFT collection - the IP primed for expansion.'
						/>
					</BentoTilt>
					<BentoTilt className='bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
						<BentoCard
							src='/videos/feature-3.mp4'
							title={
								<>
									n<b>e</b>us
								</>
							}
							description='A gamified social hub, adding a new
dimension of play to social interaction for Web3 communities.'
						/>
					</BentoTilt>
					<BentoTilt className='bento-tilt_1 me-14 md:col-span-1 md:me-0'>
						<BentoCard
							src='/videos/feature-4.mp4'
							title={
								<>
									az<b>u</b>l
								</>
							}
							description='A cross-world AI Agent - elevating your
gameplay to be more fun and productive.'
						/>
					</BentoTilt>
					<div className='bento-tilt_2'>
						<div className='flex size-full flex-col justify-between bg-violet-300 p-5'>
							<h1 className='bento-title special-font max-w-64 text-black'>
								M<b>o</b>re co<b>mi</b>ing s<b>o</b>on!
							</h1>
							<TiLocationArrow className='m-5 scale-[5] self-end' />
						</div>
					</div>
					<div className='bento-tilt_2'>
						<video
							src='/videos/feature-5.mp4'
							loop
							muted
							autoPlay
							className='size-full object-cover object-center'
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

function BentoCard({
	src,
	title,
	description,
}: {
	src: string;
	title: React.ReactNode;
	description?: string;
}) {
	return (
		<div className='relative size-full'>
			<video
				src={src}
				loop
				muted
				autoPlay
				className='absolute left-0 top-0 object-cover object-center'
			/>
			<div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
				<div>
					<h1 className='bento-title special-font'>{title}</h1>
					{description && (
						<p className='mt-3 max-w-64 text-xs md:text-base'>{description}</p>
					)}
				</div>
			</div>
		</div>
	);
}

function BentoTilt({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const [transformStyle, setTransformStyle] = useState("");
	const itemRef = useRef(null);

	const handleMouseMove = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (!itemRef.current) return;

		const { left, top, width, height } =
			itemRef.current.getBoundingClientRect() as DOMRect;

		const relativeX = (e.clientX - left) / width;
		const relativeY = (e.clientY - top) / height;
		const xRotation = relativeY * 10;
		const yRotation = relativeX * 10;

		setTransformStyle(
			`perspective(1000px) rotateX(${
				e.clientY / window.innerHeight - 0.5
			}turn) rotateY(${e.clientX / window.innerWidth - 0.5}turn)`
		);
	};
	const handleMouseLeave = () => {
		setTransformStyle("");
	};

	return (
		<div
			ref={itemRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{ transform: transformStyle }}
			className={cn("", className)}>
			{children}
		</div>
	);
}
