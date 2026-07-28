function singleNonDuplicate(nums: number[]): number {
    let i = 0;
    let j = nums.length - 1;
    while (i <= j) {
        let mid = i + Math.floor((j - i) / 2);
        if (mid == 0 && nums[0] != nums[1]) return nums[mid];

        if (mid == j && nums[j] != nums[j - 1]) return nums[mid]

        if (nums[mid - 1] != nums[mid] && nums[mid] != nums[mid + 1]) return nums[mid]
        if (mid % 2 == 0) {

            if (nums[mid] == nums[mid - 1]) {
                j = mid - 1
            } else {
                i = mid + 1
            }
        } else {

            if (nums[mid] == nums[mid - 1]) {
                i = mid + 1
            } else {
                j = mid - 1
            }
        }
    }
    return -1
};