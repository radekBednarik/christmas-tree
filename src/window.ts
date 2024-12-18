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
