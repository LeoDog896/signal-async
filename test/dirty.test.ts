import { test } from "vitest";
import { dirty } from "../src/index.js";

test("dirty marker works", () => {
	return new Promise<void>((resolve) => {
		const marker = dirty();

		marker.signal().then(() => resolve());

		marker.emit();
	});
});
