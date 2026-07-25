function majorityElement(nums: number[]): number {
      let freq = 0;
    let ans = 0;
    for (let i = 0; i < nums.length; i++) {
        if (freq == 0) {
            ans = nums[i];
        }
        if (nums[i] == ans) {
            freq++;
        }
        else {
            freq--;
        }
    }
    return ans;
};