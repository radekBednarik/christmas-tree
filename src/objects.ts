import type p5 from "p5";
import type { Color } from "p5";
import { CHROMATIC_COLORS, getMonotonicArray, getRandomNumber } from "./utils";
import {
	getAbsoluteWidthAndHeight,
	getCoords,
	getCoordsRelativeToAnchorPoint,
	getViewportSize,
} from "./window";

class Shape {
	public initX = 0;
	public initY = 0;
	public aspectRatio?: number;
	public color: string;
	public windowWidth = 0;
	public windowHeight = 0;

	public p: p5;

	/**
	 * @param x x coords as percentage of window width
	 * @param y y coords as percentage of window height
	 * @param color color
	 * @param p instance of p5
	 */
	constructor(
		x: number,
		y: number,
		color: string,
		p: p5,
		aspectRatio?: number,
	) {
		this.color = color;
		this.aspectRatio = aspectRatio;
		this.p = p;

		this.setInitCoords(x, y);
		this.setWindowDims();
	}

	private setInitCoords(x: number, y: number) {
		const coords = getCoords(x, y);
		this.initX = coords.x;
		this.initY = coords.y;
	}

	private setWindowDims() {
		const wDims = getViewportSize();

		this.windowWidth = wDims.width;
		this.windowHeight = wDims.height;
	}

	public fill(color: string) {
		this.p.fill(color);
	}
}

export class Rectangle {
	private shape: Shape;
	private x: number;
	private y: number;
	private w: number;
	private h: number;

	/**
	 * @param x x coords in percentage of window width
	 * @param y y coords in percentage of window height
	 * @param w width in percentage of window width
	 * @param h height in percentage of window height
	 * @param color color of the shape
	 * @param p instance of the p5
	 */
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		color: string,
		p: p5,
	) {
		this.shape = new Shape(x, y, color, p);
		this.x = this.shape.initX;
		this.y = this.shape.initY;
		this.w = w;
		this.h = h;
		this.create();
	}

	private create() {
		const absDims = getAbsoluteWidthAndHeight(this.w, this.h);

		this.shape.p.push();
		this.shape.fill(this.shape.color);
		this.shape.p.rect(this.x, this.y, absDims.w, absDims.h);
		this.shape.p.pop();
	}
}

export class Triangle {
	private shape: Shape;
	public x1: number;
	public y1: number;
	public x2: number;
	private y2: number;
	private x3: number;
	private y3: number;
	private flipVertical?: boolean;
	public cX = 0;
	public cY = 0;

	/**
	 * @param x1 x of first point in percentage of window width
	 * @param y1 y of first point in percentage of window height
	 * @param x2 x of second point in percentage of window width
	 * @param y2 y of second point in percentage of window height
	 * @param x2 x of third point in percentage of window width
	 * @param y3 y of third point in percentage of window height
	 * @param aspectRatio ratio of window
	 * @param color color
	 * @param p instance of p5
	 */
	constructor(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number,
		aspectRatio: number,
		color: string,
		p: p5,
		flipVertical = false,
	) {
		this.shape = new Shape(x1, y1, color, p, aspectRatio);
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.x3 = x3;
		this.y3 = y3;
		this.flipVertical = flipVertical;

		this.setAbsCoords();
		this.create();
	}

	private setAbsCoords() {
		const firstPointCoords = getCoords(this.x1, this.y1);
		const secondPointCoords = getCoords(this.x2, this.y2);
		const thirdPointCoords = getCoords(this.x3, this.y3);

		this.x1 = firstPointCoords.x / this.shape.aspectRatio!;
		this.y1 = firstPointCoords.y;

		this.x2 = secondPointCoords.x / this.shape.aspectRatio!;
		this.y2 = secondPointCoords.y;

		this.x3 = thirdPointCoords.x / this.shape.aspectRatio!;
		this.y3 = thirdPointCoords.y;

		if (this.flipVertical) {
			this.flipVertically();
		}

		this.setCentreCoords();
	}

	private flipVertically() {
		const gap = this.x2 - this.x1;
		this.x1 = this.x2;
		this.x2 = this.x2 + gap;
	}

	private setCentreCoords() {
		this.cX = Math.floor((this.x1 + this.x2 + this.x3) / 3);
		this.cY = Math.floor((this.y1 + this.y2 + this.y3) / 3);
	}

	private create() {
		this.shape.p.push();
		this.shape.fill(this.shape.color);
		this.shape.p.strokeWeight(0);
		this.shape.p.triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
		this.shape.p.pop();
	}
}

export class Point {
	private shape: Shape;
	private strokeWeight: number;
	public x: number;
	public y: number;
	public color: string;
	public p: p5;

	/**
	 * @param x percentage position of point on window width
	 * @param y percentage position of point on window height
	 * @param color color
	 * @param p instance of p5
	 */
	constructor(x: number, y: number, color: string, p: p5) {
		this.shape = new Shape(x, y, color, p);
		this.color = this.shape.color;
		this.p = this.shape.p;
		this.x = this.shape.initX;
		this.y = this.shape.initY;
		this.strokeWeight = this.setStrokeWeigth();
	}

	public create() {
		this.shape.p.push();
		this.shape.p.stroke(this.shape.color);
		this.shape.p.strokeWeight(this.strokeWeight);
		this.shape.p.point(this.x, this.y);
		this.shape.p.pop();
	}

	public setY(y: number) {
		this.y = y;
	}

	public setX(x: number) {
		this.x = x;
	}

	private setStrokeWeigth() {
		const numArr = getMonotonicArray(1, 8);
		return getRandomNumber(numArr[numArr.length - 1]);
	}
}

export class Star {
	private p: p5;
	private color: string;
	private vertices: [number, number][];
	private cX = 0;
	private cY = 0;
	private aspectRatio: number;
	private glowSpeed: number;
	private glowOffset = 0;

	/**
	 * @param vertices array of x, y tuples, where x and y values are relative to the
	 * centre of the star in percentages
	 * @param cX X coord relative to the window width
	 * @param cY Y coord relative to the window height
	 * @param aspectRatio ratio of window
	 * @param color color
	 * @param p instance of p5
	 *
	 */
	constructor(
		vertices: [number, number][],
		cX: number,
		cY: number,
		aspectRatio: number,
		color: string,
		glowSpeed: number,
		p: p5,
	) {
		this.vertices = vertices;
		this.p = p;
		this.color = color;
		this.cX = cX;
		this.cY = cY;
		this.aspectRatio = aspectRatio;
		this.glowSpeed = glowSpeed;
		this.glowOffset = 0;

		this.setCoords();
	}

	private setCoords() {
		const cCoords = getCoords(this.cX, this.cY);

		this.cX = cCoords.x;
		this.cY = cCoords.y;

		this.vertices = this.vertices.map(([x, y]) => {
			const coords = getCoordsRelativeToAnchorPoint(this.cX, this.cY, x, y);

			return [coords.x / this.aspectRatio, coords.y];
		});
	}

	private getGlowColor(): Color {
		const glowFactor = (this.p.sin(this.glowOffset) + 1) / 2; // Oscillates between 0 and 1
		this.glowOffset += this.glowSpeed;
		const color = this.p.color(this.color);
		color.setAlpha(Math.floor(255 * glowFactor)); // Adjust alpha based on glow factor

		return color;
	}

	public create() {
		this.p.push();
		this.p.strokeWeight(2);
		this.p.stroke("white");
		this.p.fill(this.getGlowColor());

		this.p.beginShape();

		this.vertices.forEach(([x, y]) => {
			this.p.vertex(x, y);
		});

		this.p.endShape(this.p.CLOSE);
		this.p.pop();
	}
}

export class Circle {
	private x: number;
	private y: number;
	private d: number;
	private aX: number;
	private aY: number;
	private aspectRatio: number;
	private p: p5;

	/**
	 * @param x x coord of the centre relative to anchor point aX as percentage
	 * @param y y coord of the centre relative to anchor point aY as percentage
	 * @param d diameter of the circle relative to the screen height
	 * @param aX x coord of the anchor point as absolute width
	 * @param aY y coord of the anchor point as absolute height
	 * @param aspectRatio ratio of window
	 * @param p instance of the p5
	 */
	constructor(
		x: number,
		y: number,
		d: number,
		aX: number,
		aY: number,
		aspectRatio: number,
		p: p5,
	) {
		this.x = x;
		this.y = y;
		this.aX = aX;
		this.aY = aY;
		this.d = d;
		this.aspectRatio = aspectRatio;
		this.p = p;

		this.setCoords();
		this.create();
	}

	private setCoords() {
		const posCoords = getCoordsRelativeToAnchorPoint(
			this.aX,
			this.aY,
			this.x / this.aspectRatio,
			this.y,
		);
		const hAbs = getViewportSize().height;

		this.d = Math.floor((hAbs / 100) * this.d);
		this.x = posCoords.x;
		this.y = posCoords.y;
	}

	private create() {
		this.p.push();
		this.p.fill(CHROMATIC_COLORS[4].rgb);
		this.p.circle(this.x, this.y, this.d);
		this.p.pop();
	}
}
