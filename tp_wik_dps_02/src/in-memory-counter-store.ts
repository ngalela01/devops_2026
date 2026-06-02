import type { CounterStore } from './counterStore';

export class InMemoryCounterStore implements CounterStore {
  private count = 0;

  increment() {
    this.count++;
  }

  getCount() {
    return this.count;
  }
}
