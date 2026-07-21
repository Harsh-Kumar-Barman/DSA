function twoSum(nums: number[], target: number): number[] {
    // Create a map to store: number -> its index
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        // Check if the complement already exists in our map
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }

        // If not, store the current number and its index in the map
        map.set(nums[i], i);
    }

    return [];
};


// brute force solution
// const n = nums.length;

// for (let i = 0; i < n; i++) {
//     for(let j = i+1; j<n; j++){
//         if(nums[i] + nums[j] === target){
//             return [i, j];
//         }
//     }
// }
// return []