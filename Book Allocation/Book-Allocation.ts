function bookAllocation(arr: number[], n: number, m: number) {
    if (m > n) return -1
    let maxNum = Math.max(...arr);
    let sum = 0

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    while (maxNum <= sum) {
        let mid = Math.floor((maxNum + sum) / 2);
        let student = countStudent(arr, mid)
        if (student > m) {
            maxNum = mid + 1
        } else {
            sum = mid - 1
        }
    }
    return maxNum

}


function countStudent(arr: number[], mid: number) {
    let pagecount = 0
    let studentcount = 1;
    for (let i = 0; i < arr.length; i++) {
        if (pagecount + arr[i] <= mid) {
            pagecount += arr[i];
        } else {
            studentcount++;
            pagecount = arr[i];
        }
    }
    return studentcount
}

let arr = [25, 46, 28, 49, 24]


console.log(bookAllocation(arr, 5, 4))