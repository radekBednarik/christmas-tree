import "./style.css";
import p5 from "p5";
import { Rectangle } from "./objects";
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

		new Rectangle(0, 90, 100, 10, "white", p);
	};
}
