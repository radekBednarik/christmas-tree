import type p5 from "p5";
import { Triangle } from "./objects";

export function drawTree(
	howManyTriangles: number,
	initCoords: {
		x1: number;
		y1: number;
		x2: number;
		y2: number;
		x3: number;
		y3: number;
	},
	color: string,
	p: p5,
) {
	if (howManyTriangles % 2 !== 0) {
		throw new Error(
			"You must provide even number of items, so thay can be vertically fliped",
		);
	}

	const verticalGap = initCoords.y2 - initCoords.y3;

	if (verticalGap <= 0) {
		throw new Error("Vertical gap between points on y axis must be positive!");
	}

	const horizontalGap = initCoords.x2 - initCoords.x1;

	if (horizontalGap <= 0) {
		throw new Error(
			"Horizontal gap between points on x axis must be positive!",
		);
	}

	for (let i = 0; i < howManyTriangles; i++) {
		let flip = false;

		console.log(horizontalGap, verticalGap);

		i % 2 !== 0 ? (flip = true) : (flip = false);

		new Triangle(
			initCoords.x1,
			initCoords.y1,
			initCoords.x2,
			initCoords.y2,
			initCoords.x3,
			initCoords.y3,
			color,
			p,
			flip,
		);
	}
}
