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
