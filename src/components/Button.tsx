import React from "react";
import { cn } from "../lib/cn";

type Props = {
	id: string;
	title: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	containerClass?: string;
	titleClass?: string;
};

export default function Button({
	id,
	title,
	leftIcon,
	rightIcon,
	titleClass,
	containerClass,
}: Props) {
	return (
		<div
			id={id}
			className={cn(
				"group relative z-10 flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black",
				containerClass
			)}>
			{leftIcon}
			<span
				className={cn(
					"relative inline-flex overflow-hidden font-general text-xs uppercase",
					titleClass
				)}>
				<div>{title}</div>
				{rightIcon}
			</span>
		</div>
	);
}
