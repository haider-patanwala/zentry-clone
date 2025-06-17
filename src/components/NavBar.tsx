import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import { useScrollPosition } from "react-haiku";
import gsap from "gsap";

export default function NavBar() {
	const [isIndicatorLineVisible, setIsIndicatorLineVisible] = useState(false);
	const NavContainerRef = useRef<HTMLDivElement>(null);
	const audioElementRef = useRef<HTMLAudioElement>(null);
	const [prevScrollY, setPrevScrollY] = useState(0);
	const [isNavVisible, setIsNavVisible] = useState(true);
	const [scroll] = useScrollPosition();
	const { y: currentScrollPosition } = scroll as { y: number };

	useEffect(() => {
		if (currentScrollPosition === 0) {
			setIsNavVisible(true);
			NavContainerRef.current?.classList.remove("floating-nav");
		} else if (currentScrollPosition > prevScrollY) {
			setIsNavVisible(false);
			NavContainerRef.current?.classList.add("floating-nav");
		} else if (currentScrollPosition < prevScrollY) {
			setIsNavVisible(true);
			NavContainerRef.current?.classList.add("floating-nav");
		}
		setPrevScrollY(currentScrollPosition || 0);
	}, [currentScrollPosition]);

	useEffect(() => {
		gsap.to(NavContainerRef.current, {
			y: isNavVisible ? 0 : -100,
			opacity: isNavVisible ? 1 : 0,
			duration: 0.2,
			ease: "back.inOut",
		});
	}, [isNavVisible]);

	const toggleAudio = () => {
		setIsIndicatorLineVisible(!isIndicatorLineVisible);
		if (audioElementRef.current) {
			if (audioElementRef.current.paused) {
				audioElementRef.current.play();
			} else {
				audioElementRef.current.pause();
			}
		}
	};

	return (
		<div
			ref={NavContainerRef}
			className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
			<header className='absolute top-1/2 w-full -translate-y-1/2'>
				<nav className='flex size-full items-center justify-between p-4'>
					<div className='flex items-center gap-7'>
						<img
							src='/img/logo.png'
							alt='logo'
							className='w-10'
						/>
						<Button
							id='product-btn'
							title='Product'
							rightIcon={<TiLocationArrow />}
							containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1'
						/>
					</div>
					<div className='flex h-full items-center'>
						<div className='hidden md:block'>
							{NavItems.map((items, idx) => {
								return (
									<a
										key={items.id + idx}
										href={items.href}
										className='nav-hover-btn'>
										{items.title}
									</a>
								);
							})}
						</div>
						<button
							onClick={toggleAudio}
							className='ml-10 flex cursor-pointer items-center relative space-x-0.5'>
							<audio
								ref={audioElementRef}
								className='hidden'
								src='/audio/loop.mp3'
								loop
							/>
							{[1, 2, 3, 4].map((bar) => (
								<div
									style={{ animationDelay: `${bar * 0.1}s` }}
									key={bar}
									className={`indicator-line ${
										isIndicatorLineVisible ? "active" : ""
									}`}
								/>
							))}
						</button>
					</div>
				</nav>
			</header>
		</div>
	);
}

const NavItems = [
	{
		id: "nexus",
		title: "Nexus",
		href: "#nexus",
	},
	{
		id: "vault",
		title: "Vault",
		href: "#vault",
	},
	{
		id: "prologue",
		title: "Prologue",
		href: "#prologue",
	},
	{
		id: "about",
		title: "About",
		href: "#about",
	},
	{
		id: "contact",
		title: "Contact",
		href: "#contact",
	},
];
