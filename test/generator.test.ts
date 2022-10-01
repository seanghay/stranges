import { expect, it, describe } from "vitest";
import parse from "../index";

describe("parse range", () => {
	it("should be an iterator", () => {
		expect(Symbol.iterator in parse("1-10")).toBeTruthy();
	});

	it("should parse single number", () => {
		const gen = parse("10");
		expect(gen.next().value).toEqual(10);
	
    const gen1 = parse("-10");
		expect(gen1.next().value).toEqual(-10);
	
  });


	it("should parse single range number", () => {
		const gen = parse("1-4");
		expect(gen.next().value).toEqual(1);
		expect(gen.next().value).toEqual(2);
		expect(gen.next().value).toEqual(3);
		expect(gen.next().value).toEqual(4);
		expect(gen.next().done).toEqual(true);
	});

	it("should parse multiple ranges", () => {
		const gen = parse("1-4,4-1, 10-12");
		expect(gen.next().value).toEqual(1);
		expect(gen.next().value).toEqual(2);
		expect(gen.next().value).toEqual(3);
		expect(gen.next().value).toEqual(4);

		// reverse
		expect(gen.next().value).toEqual(4);
		expect(gen.next().value).toEqual(3);
		expect(gen.next().value).toEqual(2);
		expect(gen.next().value).toEqual(1);

		expect(gen.next().value).toEqual(10);
		expect(gen.next().value).toEqual(11);
		expect(gen.next().value).toEqual(12);
		expect(gen.next().done).toEqual(true);
	});

	it("should parse inverted range", () => {
		const gen = parse("4-1");
		expect(gen.next().value).toEqual(4);
		expect(gen.next().value).toEqual(3);
		expect(gen.next().value).toEqual(2);
		expect(gen.next().value).toEqual(1);
		expect(gen.next().done).toEqual(true);
	});

	it("should throw an error if giving invalid input", () => {
		expect(() => parse("").next()).toThrowError("input is invalid");
	});

});
