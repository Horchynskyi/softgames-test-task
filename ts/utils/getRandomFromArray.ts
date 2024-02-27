/**
 * @description
 * Returns random element from array
 *
 * @export
 * @template T
 * @param {T[]} array
 * @param {boolean} [splice=false]
 * @return {*}  {T}
 */
export function getRandomFromArray<T>(array: T[], splice = false): T {
	const randomIndex = Math.floor(Math.random() * array.length);

	if (splice) {
		return array.splice(randomIndex, 1)[0];
	} else {
		return array[randomIndex];
	}
}
