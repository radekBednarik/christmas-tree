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

	const x1 = initCoords.x1;
	const x2 = initCoords.x2;
	const x3 = initCoords.x3;
	let y1 = initCoords.y1;
	let y2 = initCoords.y2;
	let y3 = initCoords.y3;

	for (let i = 0; i < howManyTriangles; i++) {
		let flip = false;
		const toNextRow = (i - 2) % 2 === 0 ? true : false;

		i % 2 !== 0 ? (flip = true) : (flip = false);

		if (i <= 1) {
			new Triangle(x1, y1, x2, y2, x3, y3, color, p, flip);
		} else {
			if (toNextRow) {
				y1 += verticalGap;
				y2 += verticalGap;
				y3 += verticalGap;

				new Triangle(x1, y1, x2, y2, x3, y3, color, p, flip);
			} else {
				new Triangle(x1, y1, x2, y2, x3, y3, color, p, flip);
			}
		}
	}
}
