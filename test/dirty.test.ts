import { test } from "vitest";
import { dirty } from "../src/index.js";

test("dirty marker works", () => {
	return new Promise<void>((resolve) => {
		const { signal, emit } = dirty();

		signal().then(() => resolve());

		emit();
	});
});

test("dirty marker doesn't work backwards", () => {
	return new Promise<void>((resolve, reject) => {
		const { signal, emit } = dirty();

		emit();

		queueMicrotask(() => {
			signal().then(() => reject());
			queueMicrotask(resolve);
		});
	});
});
