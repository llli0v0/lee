function BubbleSort(A) {
    let times = A.length;
    while (times - 1) {
        for (let i = 0; i < A.length - 1; i++) {
            if (A[i] > A[i + 1])
                [A[i], A[i + 1]] = [A[i + 1], A[i]];
        }
        times--;
    }
    return A;
}