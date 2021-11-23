import React from "react";

export default function Button({
	children,
	childrenClassName,
	type,
	childrenOnClick,
}) {
	return (
		<>
			<button
				type={type}
				className={`${childrenClassName}`}
				onClick={childrenOnClick}
			>
				{children}
			</button>
		</>
	);
}
