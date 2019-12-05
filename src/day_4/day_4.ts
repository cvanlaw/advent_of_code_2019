import { DaySolution } from "../_models/day-solution.model";

export class DayFourSolution implements DaySolution {
    private lowerBound = 359282;
    private uppperBound = 820401;

    public getSolution(): string {
        let passwordCount = 0;
        for (let i = this.lowerBound; i <= this.uppperBound; i++) {
            if (!this.meetsAdjacencyRule(i)) {
                continue;
            }

            if (!this.meetsIncreasingRule(i)) {
                continue;
            }

            passwordCount++;
        }

        return passwordCount.toString();
    }

    private meetsIncreasingRule(candidate: number): boolean {
        const digits = this.numberToArray(candidate);

        let i = 1;
        for (const digit of digits) {
            if (i === digits.length) {
                break;
            }

            if (digit > digits[i]) {
                return false;
            }
            i++;
        }

        return true;
    }

    private meetsAdjacencyRule(candidate: number): boolean {
        const digits = this.numberToArray(candidate);

        let i = 1;
        for (const digit of digits) {
            if (i === digits.length) {
                return false;
            }

            if (digit === digits[i]) {
                return true;
            }
            i++;
        }

        return false;
    }

    private numberToArray(valueToSplit: number): number[] {
        const sNumber = valueToSplit.toString();
        const numberArray: number[] = [];

        for (let i = 0; i < sNumber.length; i++) {
            numberArray.push(+sNumber[i]);
        }

        return numberArray;
    }
}
