function maxSubArray(nums: number[]): number {
    let currentSum = 0;
    let maximumSum = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < nums.length; i++) {
        currentSum += nums[i]
        maximumSum = Math.max(maximumSum, currentSum)
        if (currentSum < 0) {
            currentSum = 0
        }
    }
    return maximumSum
};