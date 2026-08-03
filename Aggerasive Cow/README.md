# Aggressive Cows

## Problem Statement

You are given an array `arr` of integers representing the positions of stalls arranged along a straight line.

You are also given an integer `cow`, representing the number of cows that need to be placed in the stalls.

Your task is to place all the cows in different stalls such that the **minimum distance between any two cows is as large as possible**.

Return the **largest possible minimum distance** between any two cows.

### Important Conditions

* Each cow must be placed in a different stall.
* A stall can contain only one cow.
* The cows should be placed such that the minimum distance between any two cows is maximized.
* The stall positions are not necessarily given in sorted order.

---

## Example 1

### Input

```text
arr = [1, 2, 4, 8, 9]
cow = 3
```

### Output

```text
3
```

### Explanation

We can place the cows at:

```text
Cow 1 → 1
Cow 2 → 4
Cow 3 → 8
```

The distances are:

```text
4 - 1 = 3
8 - 4 = 4
```

The minimum distance is `3`.

Therefore, the maximum possible minimum distance is:

```text
3
```

---

## Example 2

### Input

```text
arr = [10, 1, 2, 7, 5]
cow = 3
```

After sorting:

```text
[1, 2, 5, 7, 10]
```

One optimal placement is:

```text
Cow 1 → 1
Cow 2 → 5
Cow 3 → 10
```

Distances:

```text
5 - 1 = 4
10 - 5 = 5
```

Therefore:

```text
Output = 4
```

---

# Approach

This problem can be solved using **Binary Search on Answer**.

First, sort the stall positions:

```text
[1, 2, 4, 8, 9]
```

The answer must lie between:

```text
Minimum distance = 1
Maximum distance = last stall - first stall
```

For the example:

```text
low = 1
high = 9 - 1 = 8
```

We binary search for the largest possible minimum distance.

For every `mid`, we check:

> Can we place all the cows such that the distance between consecutive placed cows is at least `mid`?

---

## `canPlace()` Function

We greedily place the first cow at the first stall.

Then we move through the stalls and place the next cow whenever:

```text
current position - last placed position >= mid
```

If we can place all cows, then `mid` is possible.

Otherwise, `mid` is impossible.

---

## Binary Search Logic

If `mid` is possible:

```text
ans = mid
low = mid + 1
```

Why?

Because we want to **maximize** the minimum distance, so we try to find a larger distance.

If `mid` is not possible:

```text
high = mid - 1
```

We need to try a smaller distance.

---

# TypeScript Solution

```ts
function aggressiveCow(arr: number[], cow: number) {
    arr.sort((a, b) => a - b);

    let low = 1;
    let high = arr[arr.length - 1] - arr[0];

    let ans = 0;

    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2);

        if (canPlace(arr, mid, cow)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return ans;
}

function canPlace(
    arr: number[],
    mid: number,
    cow: number
): boolean {
    let lastPlaced = arr[0];
    let cowNum = 1;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] - lastPlaced >= mid) {
            lastPlaced = arr[i];
            cowNum++;
        }

        if (cowNum === cow) {
            return true;
        }
    }

    return false;
}

let arr = [1, 2, 4, 8, 9];

console.log(aggressiveCow(arr, 3));
```

### Output

```text
3
```

---

# Dry Run

For:

```text
arr = [1, 2, 4, 8, 9]
cow = 3
```

After sorting:

```text
[1, 2, 4, 8, 9]
```

Initial search range:

```text
low = 1
high = 8
```

### `mid = 4`

Try to place 3 cows with minimum distance `4`:

```text
Cow 1 → 1
Cow 2 → 8
```

Cannot place the third cow.

Therefore:

```text
4 is impossible
high = 3
```

---

### `mid = 2`

We can place:

```text
Cow 1 → 1
Cow 2 → 4
Cow 3 → 8
```

So:

```text
2 is possible
ans = 2
low = 3
```

---

### `mid = 3`

We can place:

```text
Cow 1 → 1
Cow 2 → 4
Cow 3 → 8
```

Distances:

```text
4 - 1 = 3
8 - 4 = 4
```

So:

```text
3 is possible
ans = 3
low = 4
```

Now:

```text
low > high
```

Binary search ends.

Final answer:

```text
3
```

---

# Complexity

### Time Complexity

Sorting:

```text
O(n log n)
```

Binary search:

```text
O(log(maxPosition - minPosition))
```

Each binary-search step calls `canPlace()`:

```text
O(n)
```

Therefore:

```text
O(n log n + n log(maxPosition - minPosition))
```

### Space Complexity

```text
O(1)
```

excluding the sorting implementation's internal space.

---

# Key Concept

This is a **Binary Search on Answer** problem.

The important pattern is:

```text
Problem asks:
"Maximum possible minimum distance"
```

Therefore:

```text
If mid works:
    try bigger
    low = mid + 1

If mid doesn't work:
    try smaller
    high = mid - 1
```

### Remember

**Aggressive Cows → maximize the minimum**

**Book Allocation → minimize the maximum**
