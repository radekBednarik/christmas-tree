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

	for (let i = 0; i < howManyTriangles; i++) {
		let flip = false;

		i % 2 !== 0 ? (flip = true) : (flip = false);
	}
}
