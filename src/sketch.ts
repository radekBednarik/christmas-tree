import "./style.css";
import p5 from "p5";
import octokat from "./assets/images/github-mark.png";
import {
	createSnowflakes,
	createStar,
	drawGround,
	drawSnowflakes,
	drawStar,
	drawTree,
} from "./drawers";
import { getAspectRatio, getViewportSize } from "./window";

new p5(sketch, document.querySelector<HTMLDivElement>("#canvas-wrapper")!);

(document.getElementById("octokat") as HTMLImageElement).src = octokat;

function sketch(p: p5) {
	const FLAKES_COUNT = 800;
	const COLOR_SNOW = "#FFFFFF";
	const COLOR_SKY = "#0D3B66";
	const COLOR_STAR = "#FFD700";

	const wSize = getViewportSize();
	let aspectRatio = getAspectRatio(wSize);

	const treeInitCoords = { x1: 40, y1: 30, x2: 50, y2: 30, x3: 50, y3: 20 };
	const snowflakes = createSnowflakes(FLAKES_COUNT, COLOR_SNOW, p);
	const star = createStar(
		[
			[0, 10],
			[8, 25],
			[5, 5],
			[15, -4],
			[3.5, -5],
			[0, -25],
			[-3.5, -5],
			[-15, -4],
			[-5, 5],
			[-8, 25],
		],
		50,
		18,
		aspectRatio,
		COLOR_STAR,
		p,
	);

	p.setup = () => {
		p.createCanvas(wSize.width, wSize.height);
		p.colorMode("rgb");
		p.frameRate(30);
		// p.noLoop();
	};

	p.draw = () => {
		p.background(COLOR_SKY);

		drawGround(0, 85, 100, 15, COLOR_SNOW, p);
		drawTree(12, treeInitCoords, aspectRatio, "#228B22", p);
		drawStar(star);
		drawSnowflakes(snowflakes, FLAKES_COUNT, COLOR_SNOW, p);
	};

	p.windowResized = () => {
		p.resizeCanvas(wSize.width, wSize.height);
		aspectRatio = getAspectRatio(getViewportSize());
	};
}
