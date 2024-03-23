export interface Dirty {
	emit: () => void;
	signal: () => Promise<void>;
}

/**
 * A signal that waits for it to be marked as dirty, where
 * the promise will complete.
 */
export function dirty() {
	const resolveQueue: (() => void)[] = [];

	return {
		emit: () => {
			while (resolveQueue.length > 0) {
				resolveQueue.shift()!();
			}
		},
		signal: () => {
			return new Promise<void>((resolve) => {
				resolveQueue.push(resolve);
			});
		}
	}
}
