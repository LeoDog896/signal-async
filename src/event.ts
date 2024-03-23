import { dirty } from "./dirty.js";

export interface QueueEvent<T> {
	iterator: AsyncGenerator<T>;
	enqueue: (item: T) => Promise<void>;
}

export async function event<T>() {
	const items: T[] = [];
	const marker = dirty();

	const iterator = async function* () {
		while (true) {
			while (items.length > 0) {
				yield items.shift()!;
			}

			await marker.signal();
		}
	};

	return {
		iterator: iterator(),
		enqueue: async (item: T) => {
			items.push(item);
			marker.emit();
		},
	};
}
