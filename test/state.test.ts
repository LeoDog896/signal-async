import { test } from "vitest";
import { state } from "../src/index.js";

test("state forward", () => {
	return new Promise<void>((resolve) => {
		const { waitFor, set } = state(1);

		waitFor(2).then(() => resolve());

		set(2);
	});
});


test("state backwards", () => {
	return new Promise<void>((resolve) => {
		const { waitFor, set } = state(1);

		set(2);

		waitFor(2).then(() => resolve());
	});
});
