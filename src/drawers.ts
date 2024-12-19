import type p5 from "p5";
import { Point, Rectangle, Triangle } from "./objects";
import { getRandomNumber } from "./utils";
import { getViewportSize } from "./window";

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

	const x2 = initCoords.x2;
	const x3 = initCoords.x3;

	let x1 = initCoords.x1;
	let y1 = initCoords.y1;
	let y2 = initCoords.y2;
	let y3 = initCoords.y3;

	for (let i = 0; i < howManyTriangles; i++) {
		let flip = false;
		const toNextRow = (i - 2) % 2 === 0 ? true : false;

		i % 2 !== 0 ? (flip = true) : (flip = false);

		if (i <= 1 || !toNextRow) {
			new Triangle(x1, y1, x2, y2, x3, y3, color, p, flip);
		} else {
			x1 -= 3;
			y1 += verticalGap;
			y2 += verticalGap;
			y3 += verticalGap;

			new Triangle(x1, y1, x2, y2, x3, y3, color, p, flip);
		}
	}
}

export function drawGround(
	x: number,
	y: number,
	w: number,
	h: number,
	color: string,
	p: p5,
) {
	new Rectangle(x, y, w, h, color, p);
}

export function drawSnowflakes(
	snowflakes: Point[],
	howMany: number,
	color: string,
	p: p5,
) {
	const wDims = getViewportSize();

	snowflakes
		.filter((flake) => flake.y < wDims.height)
		.forEach((flake) => flake.create());

	while (snowflakes.length < howMany) {
		snowflakes.push(createSnowflake(color, p));
	}
	snowflakes.forEach((flake) => flake.setY(flake.y + 1));
}

export function createSnowflakes(howMany: number, color: string, p: p5) {
	const flakes: Point[] = [];

	for (let i = 0; i < howMany; i++) {
		flakes.push(createSnowflake(color, p));
	}

	return flakes;
}

function createSnowflake(color: string, p: p5) {
	const x = getRandomNumber(100, 1);
	const y = getRandomNumber(100, 1);

	return new Point(x, y, color, p);
}
