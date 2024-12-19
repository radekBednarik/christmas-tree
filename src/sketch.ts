import "./style.css";
import p5 from "p5";
import {
	createSnowflakes,
	drawGround,
	drawSnowflakes,
	drawTree,
} from "./drawers";
import { getViewportSize } from "./window";

new p5(sketch);

function sketch(p: p5) {
	const snowflakes = createSnowflakes(500, "#FFFFFF", p);

	p.setup = () => {
		const window = getViewportSize();

		p.createCanvas(window.width, window.height);
		p.colorMode("hsb");
		p.frameRate(30);
		// p.noLoop();
	};

	p.draw = () => {
		p.background("#0D3B66");

		drawGround(0, 85, 100, 15, "#FFFFFF", p);
		drawTree(
			12,
			{ x1: 40, y1: 30, x2: 50, y2: 30, x3: 50, y3: 20 },
			"#228B22",
			p,
		);

		drawSnowflakes(snowflakes, 500, "#FFFFFF", p);
	};
}
