/**
 * Returns window size as `{x, y}` where
 * `x` corresponds to `window.innerWidth` and
 * `y` to `window.innerHeight`.
 */
export function getViewportSize() {
	return {
		width: window.innerWidth,
		height: window.innerHeight,
	};
}

/**
 * Returns exact coordinates of `{x, y}` given provided
 * relative coordinates with regard to window size.
 */
export function getCoords(relX: number, relY: number) {
	if (0 > relX || 100 < relX || 0 > relY || 100 < relY) {
		throw new Error(
			"Coordinates are expected to be as percentages and must be within <0, 100> interval.",
		);
	}

	const wCoords = getViewportSize();

	return {
		x: Math.floor((relX / 100) * wCoords.width),
		y: Math.floor((relY / 100) * wCoords.height),
	};
}

/**
 * @param w width of the window as percentage
 * @param h heigh of the window as percentage
 */
export function getAbsoluteWidthAndHeight(w: number, h: number) {
	const wSize = getViewportSize();

	return {
		w: Math.floor((w / 100) * wSize.width),
		h: Math.floor((h / 100) * wSize.height),
	};
}

/**
 * Returns absolute position as `{x, y}` that is relative to the
 * provided anchor point coords.
 *
 * IMPORTANT: On Y axis, positive `relY` means going DOWN on Y axis
 * and vice versa.
 * @param aX anchor X as absolute x position on window width
 * @param aY anchor Y as absolute y position on window height
 * @param relX x as relative position to anchor X. Positive to right. Negative to left.
 * @param relY y sa relative position to anchor Y. Positive to down. Negative to up.
 *
 */
export function getCoordsRelativeToAnchorPoint(
	aX: number,
	aY: number,
	relX: number,
	relY: number,
) {
	return {
		x: Math.floor(aX * (1 + relX / 100)),
		y: Math.floor(aY * (1 + relY / 100)),
	};
}
