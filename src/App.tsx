import Hero from "./components/Hero";

export default function App() {
	return (
		<main className='relative min-h-dvh w-dvw overflow-x-hidden'>
			<Hero />
			<section className='z-0 min-h-screen bg-red-50'></section>
		</main>
	);
}
