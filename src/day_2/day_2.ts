import { DaySolution } from "../_models/day-solution.model";
import * as fs from "fs";
import * as path from "path";

export class DayTwoSolution implements DaySolution {
    public getSolution(): string {
        for (let noun = 0; noun < 100; noun++) {
            for (let verb = 0; verb < 100; verb++) {
                const input = this.resetInput();
                const output = this.runProgram(noun, verb, input);

                if (output === "19690720") {
                    return `noun: ${noun} verb: ${verb}`;
                }
            }
        }
    }

    private runProgram(noun: number, verb: number, input: string[]) {
        input[1] = noun.toString();
        input[2] = verb.toString();
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

    private resetInput(): string[] {
        return fs
            .readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8")
            .split(",");
    }
}
