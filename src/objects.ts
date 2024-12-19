import type p5 from "p5";
import { getAbsoluteWidthAndHeight, getCoords } from "./window";

class Shape {
	public initX = 0;
	public initY = 0;
	public color: string;

	public p: p5;

	/**
	 * @param x x coords as percentage of window width
	 * @param y y coords as percentage of window height
	 * @param color color
	 * @param p instance of p5
	 */
	constructor(x: number, y: number, color: string, p: p5) {
		this.color = color;
		this.p = p;
		this.setInitCoords(x, y);
	}

	private setInitCoords(x: number, y: number) {
		const coords = getCoords(x, y);
		this.initX = coords.x;
		this.initY = coords.y;
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

		this.shape.fill(this.shape.color);
		this.shape.p.rect(this.x, this.y, absDims.w, absDims.h);
	}
}

export class Triangle {
	private shape: Shape;
	private x1: number;
	private y1: number;
	private x2: number;
	private y2: number;
	private x3: number;
	private y3: number;
	private flipVertical?: boolean;

	/**
	 * @param x1 x of first point in percentage of window width
	 * @param y1 y of first point in percentage of window height
	 * @param x2 x of second point in percentage of window width
	 * @param y2 y of second point in percentage of window height
	 * @param x2 x of third point in percentage of window width
	 * @param y3 y of third point in percentage of window height
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
		color: string,
		p: p5,
		flipVertical = false,
	) {
		this.shape = new Shape(x1, y1, color, p);
		this.x1 = this.shape.initX;
		this.y1 = this.shape.initY;
		this.x2 = x2;
		this.y2 = y2;
		this.x3 = x3;
		this.y3 = y3;
		this.flipVertical = flipVertical;

		this.setAbsCoords();
		this.create();
	}

	private setAbsCoords() {
		const secondPointCoords = getCoords(this.x2, this.y2);
		const thirdPointCoords = getCoords(this.x3, this.y3);

		this.x2 = secondPointCoords.x;
		this.y2 = secondPointCoords.y;

		this.x3 = thirdPointCoords.x;
		this.y3 = thirdPointCoords.y;

		if (this.flipVertical) {
			this.flipVertically();
		}
	}

	private flipVertically() {
		const gap = this.x2 - this.x1;
		this.x1 = this.x2;
		this.x2 = this.x2 + gap;
	}

	private create() {
		this.shape.fill(this.shape.color);
		this.shape.p.strokeWeight(0);
		this.shape.p.triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
	}
}
