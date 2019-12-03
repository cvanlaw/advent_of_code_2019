import * as fs from "fs";
import { DaySolution } from "../_models/day-solution.model";
import * as path from "path";

export class DayOneSolution implements DaySolution {
    public getSolution(): string {
        const input = fs
            .readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8")
            .split("\n");

        const moduleFuels = input.map(x => this.getFuelForModule(+x));
        const total = moduleFuels.reduce((runningSum, num) => runningSum + num);
        return total.toString();
    }

    private getFuelForModule(moduleMass: number): number {
        let fuelRequired = moduleMass / 3;
        fuelRequired = Math.floor(fuelRequired);
        fuelRequired = fuelRequired - 2;

        if (fuelRequired > 0) {
            return fuelRequired + this.getFuelForModule(fuelRequired);
        }

        return 0;
    }
}
