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
