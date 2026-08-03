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

function canPlace(arr: number[], mid: number, cow: number): boolean {
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
//                         0, 1, 2, 3, 4     
console.log(aggressiveCow([0, 3, 4, 7, 10, 9], 4))