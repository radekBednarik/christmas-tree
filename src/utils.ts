export function getRandomNumber(max: number) {
	return Math.floor(Math.random() * (max + 1));
}

export function getMonotonicArray(min: number, max: number) {
	const arr = [];

	for (let i = min; i < max; i++) {
		arr.push(i);
	}

	return arr;
}

export const CHROMATIC_COLORS: {
	name: string;
	rgb: [number, number, number];
}[] = [
	{ name: "Red", rgb: [255, 0, 0] },
	{ name: "Green", rgb: [0, 255, 0] },
	{ name: "Blue", rgb: [0, 0, 255] },
	{ name: "Yellow", rgb: [255, 255, 0] },
	{ name: "Cyan", rgb: [0, 255, 255] },
	{ name: "Magenta", rgb: [255, 0, 255] },
	{ name: "Orange", rgb: [255, 165, 0] },
	{ name: "Purple", rgb: [128, 0, 128] },
];

export function getAvgOfTwo(a: number, b: number) {
	return (a + b) / 2;
}

export function getTotalOfFlakes(windowWidth: number) {
	if (windowWidth >= 2000) {
		return 3000;
	}

	if (windowWidth >= 1000) {
		return 2000;
	}

	return 1000;
}
