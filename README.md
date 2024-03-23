# async-signal

distinct utilities for signaling in async contexts.

## Installation

```bash
npm install async-signal
```

## Usage

### Dirty

Dirty signals are signals that can be marked and listened to.
They trigger active listeners when they are emitted to.

```typescript
import { dirty } from 'async-signal';

const { emit, signal } = dirty<number>();

signal().then(() => {
	console.log('signal received');
});

emit();
```

### Events

Events build on top of [dirty](#dirty) signals.
They allow for enqueuing data in a FILO queue and
applying async iteration over the queue.

```typescript
import { event } from 'async-signal';

const { iterator, enqueue } = event<number>();

enqueue(1);
enqueue(2);

for await (const item of iterator) {
	console.log(item);	// 1, 2
}
```
