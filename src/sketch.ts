import "./style.css";
import p5 from "p5";
import { getCoords, getViewportSize } from "./window";

new p5(sketch);

function sketch(p: p5) {
	p.setup = () => {
		const window = getViewportSize();

		p.createCanvas(window.width, window.height);
		p.colorMode("hsb");
		p.noLoop();
	};

	p.draw = () => {
		p.background("#0D3B66");

		drawGround(p);
	};
}

function drawGround(p: p5) {
	const startPoint = getCoords(0, 90);
	const endPoint = getCoords(100, 90);

	const coords = {
		x1: startPoint.x,
		y1: startPoint.y,
		x2: endPoint.x,
		y2: endPoint.y,
	};

	p.stroke("white");
	p.line(coords.x1, coords.y1, coords.x2, coords.y2);
}
