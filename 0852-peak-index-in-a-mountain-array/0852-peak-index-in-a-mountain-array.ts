function peakIndexInMountainArray(arr: number[]): number {
    let i = 1;
    let j = arr.length - 2;
    // let res = -Infinity;
    while (i <= j) {
        let mid = Math.floor((i + j) / 2)
        console.log(i, j, mid, arr[mid])
        if (arr[mid - 1] <= arr[mid] && arr[mid] >= arr[mid+1]) {
            return mid
        }
        if (arr[mid - 1] < arr[mid]) {
            i = mid + 1
        } else {j = mid - 1}
    }

    return -1
};