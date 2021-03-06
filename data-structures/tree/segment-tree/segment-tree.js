class Node {
  constructor() {
    this.val = 0;
    this.left = null;
    this.right = null;
    this.l = 0;
    this.r = 0;
  }
}

class SegmentTree {
  constructor(data) {
    this.data = data;
    this.root = null;
    this.init(0, data.length - 1);
  }

  init(l, r) {
    if (l === r) {
      if (this.root === null) {
        this.root = new Node();
        this.root.l = l;
        this.root.r = r;
        this.root.val = this.data[l];
      } else {
        let node = new Node();
        node.l = l;
        node.r = r;
        node.val = this.data[l];
        return node;
      }
    }
    let m = Math.floor((l + r) / 2);
    if (this.root === null) {
      this.root = new Node();
      this.root.l = l;
      this.root.r = r;
      this.root.left = this.init(l, m);
      this.root.right = this.init(m + 1, r);
      this.root.val = this.root.left.val + this.root.right.val;
    } else {
      let node = new Node();
      node.l = l;
      node.r = r;
      node.left = this.init(l, m);
      node.right = this.init(m + 1, r);
      node.val = node.left.val + node.right.val;
      return node;
    }
  }

  getVal(l, r, node = this.root) {
    if (l === node.l && r === node.r) return node.val;
    if (l > node.r || r < node.l) return 0;
    if (node.right && l >= node.right.l) {
      return this.getVal(l, r, node.right);
    } else if (node.left && r <= node.left.r) {
      return this.getVal(l, r, node.left);
    } else {
      return this.getVal(l, node.left.r, node.left) + this.getVal(node.right.l, r, node.right);
    }
  }
}
