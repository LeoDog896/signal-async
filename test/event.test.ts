import { expect, test } from "vitest";
import { event } from "../src/index.js";

test("event filo queue", async (): Promise<void> => {
	const listener = await event<number>();

	return new Promise<void>(async (resolve) => {
		listener.enqueue(1);
		listener.enqueue(2);
		listener.enqueue(3);

		let i = 1;
		for await (const item of listener.iterator) {
			expect(item).toBe(i);

			i++;

			if (i > 3) {
				resolve();
			}
		}
	});
});
