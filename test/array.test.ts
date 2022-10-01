import { expect, it, describe } from "vitest";
import { parseAsArray } from "../index";

describe("parse range as array", () => {
	it("should create an array", () => {
		expect(Array.isArray(parseAsArray("1-5"))).toBeTruthy();
		expect(parseAsArray("1-5")).toEqual([1, 2, 3, 4, 5]);
		expect(parseAsArray("1..5")).toEqual([1, 2, 3, 4, 5]);
		expect(parseAsArray("1...5")).toEqual([1, 2, 3, 4]);
	});
});
