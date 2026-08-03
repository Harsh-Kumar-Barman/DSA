# 📚 Book Allocation Problem

## Problem Statement

You are given an array `arr[]` of integers where `arr[i]` represents the number of pages in the `i-th` book.

You are also given an integer `m`, representing the number of students.

Your task is to **allocate all the books to exactly `m` students** such that:

* Each student gets **at least one book**.
* Each book is allocated to **exactly one student**.
* Books must be allocated in **contiguous order**.
* The goal is to **minimize the maximum number of pages assigned to any student**.

Return the minimum possible value of the maximum pages assigned to a student.

If it is impossible to allocate the books, return `-1`.

---

## Examples

### Example 1

**Input:**

```text
arr = [12, 34, 67, 90]
m = 2
```

**Output:**

```text
113
```

**Explanation:**

There are two possible optimal partitions:

```text
Student 1 → [12, 34, 67] = 113 pages
Student 2 → [90] = 90 pages
```

The maximum pages assigned to a student is:

```text
max(113, 90) = 113
```

Therefore, the answer is:

```text
113
```

---

### Example 2

**Input:**

```text
arr = [10, 20, 30, 40]
m = 2
```

**Output:**

```text
60
```

**Explanation:**

One optimal allocation is:

```text
Student 1 → [10, 20, 30] = 60 pages
Student 2 → [40] = 40 pages
```

Therefore:

```text
max(60, 40) = 60
```

So the answer is:

```text
60
```

---

### Example 3

**Input:**

```text
arr = [10, 20, 30]
m = 4
```

**Output:**

```text
-1
```

**Explanation:**

There are only `3` books but `4` students.

Since every student must receive at least one book, allocation is impossible.

Therefore, return:

```text
-1
```

---

## Constraints

* `1 <= arr.length <= 10^5`
* `1 <= arr[i] <= 10^9`
* `1 <= m <= 10^5`
* Every student must receive at least one book.
* Books must be allocated in contiguous order.

---

## Approach

This problem can be solved using **Binary Search on Answer**.

### Step 1: Define the search space

The minimum possible answer is the book with the maximum number of pages:

```text
low = max(arr)
```

Because no student can receive fewer pages than the largest individual book.

The maximum possible answer is the total number of pages:

```text
high = sum(arr)
```

This would happen if one student received all the books.

Therefore:

```text
low = max(arr)
high = sum(arr)
```

---

### Step 2: Find the middle value

Calculate:

```text
mid = low + (high - low) / 2
```

Treat `mid` as the maximum number of pages that a student is allowed to receive.

Then check how many students are required if no student can receive more than `mid` pages.

---

### Step 3: Allocate books

Keep adding books to the current student.

If adding the next book would make the student's pages exceed `mid`, allocate the next book to another student.

For example:

```text
arr = [12, 34, 67, 90]
mid = 113
```

Allocation:

```text
Student 1 → 12 + 34 + 67 = 113
Student 2 → 90
```

Students required:

```text
2
```

Since `2 <= m`, `mid` is a possible answer.

We can try a smaller maximum.

---

### Step 4: Adjust Binary Search

If the number of students required is **less than or equal to `m`**:

```text
high = mid
```

We try to find an even smaller maximum.

If the number of students required is **greater than `m`**:

```text
low = mid + 1
```

We need to allow more pages per student.

---

## Algorithm

```text
1. If m > number of books:
       return -1

2. low = maximum value in arr

3. high = sum of all elements in arr

4. While low < high:

       mid = low + (high - low) / 2

       Count how many students are needed
       if each student can receive at most mid pages.

       If students required <= m:
           high = mid
       Else:
           low = mid + 1

5. Return low
```

---

## TypeScript Implementation

```typescript
function bookAllocation(arr: number[], n: number, m: number): number {
    if (m > n) return -1;

    let low = Math.max(...arr);
    let high = arr.reduce((sum, pages) => sum + pages, 0);

    while (low < high) {
        const mid = Math.floor(low + (high - low) / 2);

        let students = 1;
        let pages = 0;

        for (const book of arr) {
            if (pages + book > mid) {
                students++;
                pages = book;
            } else {
                pages += book;
            }
        }

        if (students <= m) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return low;
}
```

## Complexity

### Time Complexity

```text
O(n log(sum(arr)))
```

We perform a binary search over the possible answer range, and for every `mid`, we scan the array once.

### Space Complexity

```text
O(1)
```

Only a few variables are used.

---

## Key Concept

The important idea in this problem is:

> **Binary Search on Answer**

Instead of directly finding the allocation, we binary-search the **minimum possible maximum number of pages**.

The search range is:

```text
Maximum single book  →  Total pages
```

Then we check whether a particular maximum page limit can be used to allocate the books among `m` students.
