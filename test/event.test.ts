import { expect, test } from "vitest";
import { event } from "../src/index.js";

test("event filo queue", async (): Promise<void> => {
	const { enqueue, iterator } = event<number>();

	return new Promise<void>(async (resolve) => {
		enqueue(1);
		enqueue(2);
		enqueue(3);

		let i = 1;
		for await (const item of iterator) {
			expect(item).toBe(i);

			i++;

			if (i > 3) {
				resolve();
			}
		}
	});
});

test("event filo queue backwards", async (): Promise<void> => {
	const { enqueue, iterator } = event<number>();

	return new Promise<void>(async (resolve) => {
			queueMicrotask(() => {
			enqueue(1);
			enqueue(2);
			enqueue(3);
		});

		let i = 1;
		for await (const item of iterator) {
			expect(item).toBe(i);

			i++;

			if (i > 3) {
				resolve();
			}
		}
	});
});
