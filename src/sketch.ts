import "./style.css";
import p5 from "p5";
import { getViewportSize } from "./window";

function sketch(p: p5) {
	p.setup = () => {
		const window = getViewportSize();
		p.createCanvas(window.width, window.height);
	};

	p.draw = () => {
		p.background("#3178c6");
	};
}

new p5(sketch);
