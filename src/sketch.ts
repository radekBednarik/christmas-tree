import "./style.css";
import p5 from "p5";
import octokat from "./assets/images/github-mark.png";
import {
	createSnowflakes,
	drawGround,
	drawSnowflakes,
	drawStar,
	drawTree,
} from "./drawers";
import { getViewportSize } from "./window";

new p5(sketch, document.querySelector<HTMLDivElement>("#canvas-wrapper")!);

(document.getElementById("octokat") as HTMLImageElement).src = octokat;

function sketch(p: p5) {
	const FLAKES_COUNT = 800;
	const COLOR_SNOW = "#FFFFFF";
	const COLOR_SKY = "#0D3B66";
	const COLOR_STAR = "#FFD700";

	const snowflakes = createSnowflakes(FLAKES_COUNT, COLOR_SNOW, p);

	p.setup = () => {
		const window = getViewportSize();

		p.createCanvas(window.width, window.height);
		p.colorMode("hsb");
		p.frameRate(30);
		p.noLoop();
	};

	p.draw = () => {
		p.background(COLOR_SKY);

		drawGround(0, 85, 100, 15, COLOR_SNOW, p);
		drawTree(
			12,
			{ x1: 40, y1: 30, x2: 50, y2: 30, x3: 50, y3: 20 },
			"#228B22",
			p,
		);
		drawStar(
			[
				[0, 10],
				[10, 20],
				[5, 5],
				[20, 0],
				[5, -5],
				[0, -10],
				[-5, -5],
				[-20, 0],
				[-5, 5],
				[-10, 20],
			],
			50,
			20,
			COLOR_STAR,
			p,
		);
		drawSnowflakes(snowflakes, FLAKES_COUNT, COLOR_SNOW, p);
	};
}
