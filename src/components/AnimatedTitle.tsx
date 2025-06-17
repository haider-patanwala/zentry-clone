import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function AnimatedTitle({
	title,
	containerClass,
}: {
	title: string;
	containerClass?: string;
}) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const titleAnimation = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "100 bottom",
					end: "center bottom",
					toggleActions: "play none none reverse",
				},
			});

			titleAnimation.to(".animated-word", {
				opacity: 1,
				transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
				ease: "power2.inOut",
				stagger: 0.02,
			});
		}, containerRef);
		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={containerRef}
			className={`animated-title ${containerClass}`}>
			{title.split("<br/>").map((line, idx) => (
				<div
					key={idx}
					className='flex flex-row flex-center flex-wrap gap-2 px-10 md:gap-3'>
					{line.split(" ").map((word, i) => (
						<span
							key={i}
							className='animated-word'
							dangerouslySetInnerHTML={{ __html: word }}
						/>
					))}
				</div>
			))}
		</div>
	);
}
