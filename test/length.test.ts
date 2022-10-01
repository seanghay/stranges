import { expect, it, describe } from "vitest";
import { length } from "../index";

describe("parse length", () => {
	it("should return total length of the range", () => {
		expect(length("0-9")).toEqual(10);
		expect(length("9-0")).toEqual(10);
		expect(length("99-0,0-99")).toEqual(200);
		expect(length("1")).toEqual(1);
	});
});
