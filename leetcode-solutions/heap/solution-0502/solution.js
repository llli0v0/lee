/**
 * @param {number} k
 * @param {number} W
 * @param {number[]} Profits
 * @param {number[]} Capital
 * @return {number}
 */
var findMaximizedCapital = function(k, W, Profits, Capital) {
  let A = [];

  for (let i = 0; i < Profits.length; i++) {
    A.push([Capital[i], Profits[i]]);
  }

  A.sort((a, b) => a[0] - b[0]);

  let heap = new Heap(1);

  while (k) {
    while (A.length && A[0][0] <= W) {
      let a = A.shift();
      a[1] = -a[1];
      heap.heappush(a);
    }

    if (heap.heap.length) W -= heap.heappop()[1];
    k--;
  }
  return W;
};

class Heap {
  constructor(key) {
    this.heap = [];
    // compare with key, In order to satisfy compare object
    if (key !== undefined) {
      this.comparetor = (a, b) => a[key] - b[key];
    } else {
      this.comparetor = (a, b) => a - b;
    }
  }
  lessThan(a, b) {
    return this.comparetor(a, b) < 0;
  }
  equal(a, b) {
    return this.comparetor(a, b) === 0;
  }
  biggerThan(a, b) {
    return this.comparetor(a, b) > 0;
  }
  heappush(item) {
    this.heap.push(item);
    let index = this.heap.length - 1;
    let parentIndex = this.getParentIndex(index);
    while (parentIndex >= 0 && this.biggerThan(this.heap[parentIndex], this.heap[index])) {
      let temp = this.heap[parentIndex];
      this.heap[parentIndex] = this.heap[index];
      this.heap[index] = temp;
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }
  heappop() {
    if (this.heap.length <= 1) return this.heap.pop();
    let popItem = this.heap[0];
    this.heap[0] = this.heap.pop();
    let index = 0;
    let leftChildIndex = this.getLeftChildIndex(index);
    let rightChildIndex = this.getRightChildIndex(index);
    while (
      leftChildIndex < this.heap.length && this.biggerThan(this.heap[index], this.heap[leftChildIndex]) ||
      rightChildIndex < this.heap.length && this.biggerThan(this.heap[index], this.heap[rightChildIndex])
    ) {
      let swapIndex;
      if (leftChildIndex < this.heap.length && rightChildIndex < this.heap.length) {
        swapIndex = this.lessThan(this.heap[leftChildIndex], this.heap[rightChildIndex]) ? leftChildIndex : rightChildIndex;
      } else {
        swapIndex = leftChildIndex;
      }
      let temp = this.heap[index];
      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = temp;
      index = swapIndex;
      leftChildIndex = this.getLeftChildIndex(index);
      rightChildIndex = this.getRightChildIndex(index);
    }
    return popItem;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }
  getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }
  getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }
}