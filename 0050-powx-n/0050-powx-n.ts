function myPow(num: number, pow: number): number {
    
    if (pow < 0) {
        pow = -pow;
        num = 1 / num;
    }
    if (pow == 0) {
        return 1;
    }
    if (num == 0) {
        return 0;
    }
    if (num == 1) {
        return 1;
    }

    if (num == -1 && pow % 2 == 0) {
        return 1
    }
    if (num == -1 && pow % 2 != 0) {
        return -1
    }


    let binFrom = pow;
    let ans = 1;
    while (binFrom > 0) {
        if (binFrom % 2 == 1) {
            ans *= num;
        }
        num *= num;
        binFrom = Math.floor(binFrom / 2);
    }
    return ans;
};