function productExceptSelf(nums: number[]): number[] {
    let res: number[] = new Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        res[i] = res[i - 1] * nums[i - 1];
    }
    let suffix = 1;
    for (let j = nums.length - 2; j >= 0; j--) {
        suffix *= nums[j + 1];
        // console.log(j,suffix,nums[j + 1])
        res[j] *= suffix

    }
    return res;
}
