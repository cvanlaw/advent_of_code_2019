import { DaySolution } from "../_models/day-solution.model";
import * as fs from "fs";
import * as path from "path";

export class DayTwoSolution implements DaySolution {
    public getSolution(): string {
        const input = fs
            .readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8")
            .split(",");

        input[1] = "12";
        input[2] = "2";

        for (let i = 0; i < input.length; i += 4) {
            if (input[i] === "99") {
                break;
            }

            if (input[i] === "1") {
                let firstValue = +input[+input[i + 1]];
                let secondValue = +input[+input[i + 2]];
                input[+input[i + 3]] = (firstValue + secondValue).toString();
            } else if (input[i] === "2") {
                let firstValue = +input[+input[i + 1]];
                let secondValue = +input[+input[i + 2]];
                input[+input[i + 3]] = (firstValue * secondValue).toString();
            }
        }

        return input[0];
    }
}
