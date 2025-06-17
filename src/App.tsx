import Hero from "./components/Hero";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Features from "./components/Features";

export default function App() {
	return (
		<main className='relative min-h-dvh w-dvw overflow-x-hidden'>
			<NavBar />
			<Hero />
			<About />
			<Features />
		</main>
	);
}
