# signal-async

[![NPM Version](https://img.shields.io/npm/v/signal-async)](https://npmjs.com/package/signal-async)

distinct utilities for signaling in async contexts.

## Installation

```bash
npm install signal-async
```

## Usage

### Dirty

Dirty signals are signals that can be marked and listened to.
They trigger active listeners when they are emitted to.

```typescript
import { dirty } from 'signal-async';

const { emit, signal } = dirty();

signal().then(() => {
	console.log('signal received');
});

emit();
```

However, if a signal is emitted before a listener is attached,
the listener will not be triggered.

```typescript
emit();

signal().then(() => {
	console.log('signal received'); // not triggered
});
```

### Events

Events build on top of [dirty](#dirty) signals.
They allow for enqueuing data in a FILO queue and
applying async iteration over the queue.

```typescript
import { event } from 'signal-async';

const { iterator, enqueue } = event<number>();

enqueue(1);
enqueue(2);

for await (const item of iterator) {
	console.log(item);	// 1, 2
}
```

### State

State allows for listening for a certain value,
perfect for waiting for a 'ready' state or transmitting
IO between async contexts.

```typescript
import { state } from 'signal-async';

const { waitFor, set } = state<number>(1);

waitFor(2).then(() => console.log("this will print!"));

set(2);
```

Unlike dirty, this works even if the value is set before
the listener is attached.

```typescript
set(2);

waitFor(2).then(() => console.log("this will print!"));
```
