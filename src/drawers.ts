import type p5 from "p5";
import { Circle, Point, Rectangle, Star, Triangle } from "./objects";
import { getAvgOfTwo, getRandomNumber } from "./utils";
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
	aspectRatio: number,
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

	// draw triangles one by one
	for (let i = 0; i < howManyTriangles; i++) {
		let flip = false;
		// when to start with next "row" of triangles
		const toNextRow = (i - 2) % 2 === 0 ? true : false;

		// when to vertically flip the triangle
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		i % 2 !== 0 ? (flip = true) : (flip = false);

		// shifting the coords
		const hShift = flip ? 3 : -3;
		const vShift = 2;
		const d = 4;

		// if first two triangles or staying in the current row
		if (i <= 1 || !toNextRow) {
			const triangle = new Triangle(
				x1,
				y1,
				x2,
				y2,
				x3,
				y3,
				aspectRatio,
				color,
				p,
				flip,
			);
			const aX = getAvgOfTwo(triangle.x1, triangle.x2);

			new Circle(hShift, vShift, d, aX, triangle.y1, aspectRatio, p);

			// move to next row - shift the coords
		} else {
			x1 -= 2;
			y1 += verticalGap;
			y2 += verticalGap;
			y3 += verticalGap;

			const triangle = new Triangle(
				x1,
				y1,
				x2,
				y2,
				x3,
				y3,
				aspectRatio,
				color,
				p,
				flip,
			);
			const aX = getAvgOfTwo(triangle.x1, triangle.x2);

			new Circle(hShift, vShift, d, aX, triangle.y1, aspectRatio, p);
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

	snowflakes.forEach((flake) => {
		flake.setY(flake.y + 1);

		// If the snowflake goes off the bottom, reset it to the top
		if (flake.y > wDims.height) {
			flake.setY(getRandomNumber(5));
			flake.setX(getRandomNumber(wDims.width));
		}

		flake.create();
	});

	while (snowflakes.length < howMany) {
		snowflakes.push(createSnowflake(color, p));
	}
}

export function createSnowflakes(howMany: number, color: string, p: p5) {
	const flakes: Point[] = [];

	for (let i = 0; i < howMany; i++) {
		flakes.push(createSnowflake(color, p));
	}

	return flakes;
}

export function drawStar(star: Star) {
	star.create();
}

export function createStar(
	vertices: [number, number][],
	cX: number,
	cY: number,
	aspectRatio: number,
	color: string,
	p: p5,
) {
	return new Star(vertices, cX, cY, aspectRatio, color, 0.05, p);
}

function createSnowflake(color: string, p: p5) {
	const x = getRandomNumber(100);
	const y = getRandomNumber(100);

	return new Point(x, y, color, p);
}
