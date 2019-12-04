import { DaySolution } from "../_models/day-solution.model";
import * as fs from "fs";
import * as path from "path";
import { Point } from "../_models/point.model";

export class DayThreeSolution implements DaySolution {
    public getSolution(): string {
        const wires = this.getInputFromFile();
        const wire1 = this.parsePointsFromWiresInput(wires[0]);
        const wire2 = this.parsePointsFromWiresInput(wires[1]);
        const intersections = this.findIntersections(wire1, wire2);

        return this.findClosestIntersection(intersections);
    }

    private findClosestIntersection(intersections: Point[]): string {
        let closestIntersection = 0;
        let numberOfMoves = 0;

        for (const point of intersections) {
            const distance = Math.abs(point.x) + Math.abs(point.y);
            if (numberOfMoves === 0 || point.moveNumber < numberOfMoves) {
                closestIntersection = distance;
                numberOfMoves = point.moveNumber;
            }
        }

        return `Intersection distance: ${closestIntersection.toString()} number of moves: ${numberOfMoves}`;
    }

    private findIntersections(
        wire1: Map<string, Point>,
        wire2: Map<string, Point>
    ): Point[] {
        const points: Point[] = [];

        wire1.forEach((value: Point, key: string) => {
            if (wire2.has(key)) {
                value.moveNumber += wire2.get(key).moveNumber;
                points.push(value);
            }
        });

        return points;
    }

    private parsePointsFromWiresInput(wireInput: string[]): Map<string, Point> {
        const currentPoint: Point = {
            x: 0,
            y: 0,
            moveNumber: 0
        };
        const points = new Map<string, Point>();
        points.set(JSON.stringify(currentPoint), {
            x: currentPoint.x,
            y: currentPoint.y,
            moveNumber: currentPoint.moveNumber
        });

        let i = 1;
        for (const entry of wireInput) {
            const direction = entry.substring(0, 1);
            const length = +entry.substring(1);
            for (let j = 0; j < length; j++) {
                this.movePoint(direction, currentPoint);

                const json = JSON.stringify(currentPoint);
                if (points.has(json)) {
                    i++;
                    continue;
                }

                points.set(json, {
                    x: currentPoint.x,
                    y: currentPoint.y,
                    moveNumber: i++
                });
            }
        }

        return points;
    }

    private movePoint(direction: string, point: Point): void {
        switch (direction.toLowerCase()) {
            case "d":
                point.y--;
                break;
            case "u":
                point.y++;
                break;
            case "r":
                point.x++;
                break;
            case "l":
                point.x--;
                break;
        }
    }

    private getInputFromFile(): string[][] {
        let wires = fs
            .readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8")
            .split("\n");
        return [wires[0].split(","), wires[1].split(",")];
    }
}
