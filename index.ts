// most work here were inspired/copied from https://github.com/euank/node-parse-numeric-range/blob/master/index.js
const NUM_REGEX = /^-?\d+$/;
const RANGE_REGEX = /^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/;

export function length(input: string, separator: string = ",") {
	let size = 0;
	const ranges = input.split(separator);
	for (const range of ranges) {
		const str = range.trim();

		if (NUM_REGEX.test(str)) {
			size++;
			continue;
		}

		const result = str.match(RANGE_REGEX);
		if (!result) continue;

		let [, lhs, sep, rhs] = result as any;

		if (lhs && rhs) {
			lhs = parseInt(lhs);
			rhs = parseInt(rhs);
			const incr = lhs < rhs ? 1 : -1;
			if (sep === "-" || sep === ".." || sep === "\u2025") rhs += incr;
			for (let i = lhs; i !== rhs; i += incr) size++;
		}
	}
	return size
}

export function parseAsArray(input: string, separator: string = ","): number[] {
	return Array.from(parse(input, separator));
}

export default function* parse(
	input: string,
	separator: string = ","
): Generator<number> {
	if (input.length == 0) {
		throw new Error("input is invalid");
	}

	const ranges = input.split(separator);
	for (const range of ranges) {
		const str = range.trim();

		if (NUM_REGEX.test(str)) {
			yield parseInt(str);
			continue;
		}

		const result = str.match(RANGE_REGEX);
		if (!result) continue;

		let [, lhs, sep, rhs] = result as any;

		if (lhs && rhs) {
			lhs = parseInt(lhs);
			rhs = parseInt(rhs);
			const incr = lhs < rhs ? 1 : -1;
			if (sep === "-" || sep === ".." || sep === "\u2025") rhs += incr;
			for (let i = lhs; i !== rhs; i += incr) yield i;
		}
	}
}
