import "./style.css";
import p5 from "p5";
import { drawTree } from "./drawers";
import { Rectangle } from "./objects";
import { getViewportSize } from "./window";

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

		new Rectangle(0, 90, 100, 10, "#FFFFFF", p);

		drawTree(
			12,
			{ x1: 50, y1: 50, x2: 60, y2: 50, x3: 60, y3: 40 },
			"#228B22",
			p,
		);
	};
}
