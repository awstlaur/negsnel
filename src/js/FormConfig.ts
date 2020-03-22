import BrickTiling from "./tiling/BrickTiling";
import config from "./config";
import ParallelogramTiling from "./tiling/ParallelogramTiling";
import Tiling from "./tiling/Tiling";
import TriangleTiling from "./tiling/TriangleTiling";
import TwoSquareTiling from "./tiling/TwoSquareTiling";

export type FormID =
    | "set-iters"
    | "parallelogram"
    | "triangle"
    | "triangle-angles"
    | "brick"
    | "two-square";

export type FormParameter = {
    name: string;
    placeholder: string;
    id: string;
    minInclusive: number;
    minExclusive: number;
    maxInclusive: number;
    maxExclusive: number;
};

export type FormData = {
    parameters: FormParameter[];
    message: string;
    name: string;
    newTiling: boolean;
    tiling: (params: number[]) => Tiling;
};

const FormConfig: Record<FormID, FormData> = {
    "set-iters": {
        name: "Set Iterations",
        message:
            `This sets the number of iterations computed, N. The default is ${config.trajectoryIters}.` +
            " We won't enforce a maximum, but even 10,000 takes a while.",
        parameters: [
            {
                name: "Iterations",
                placeholder: "N",
                id: "N",
                minInclusive: 0,
                minExclusive: 0,
                maxInclusive: Number.POSITIVE_INFINITY,
                maxExclusive: Number.POSITIVE_INFINITY,
            },
        ],
        newTiling: false,
        tiling: (): never => {
            throw new Error("no tiling");
        },
    },

    parallelogram: {
        name: "Parallelogram Tiling",
        message:
            "This window sets the tiling to the standard tiling by parallelograms with " +
            " sides of length 1 and L, and an angle &#952; measured in degrees.",
        parameters: [
            {
                name: "Length",
                placeholder: "L",
                id: "L",
                minInclusive: 0,
                minExclusive: 0,
                maxInclusive: Number.POSITIVE_INFINITY,
                maxExclusive: Number.POSITIVE_INFINITY,
            },
            {
                name: "Angle",
                placeholder: "&#952;",
                id: "theta",
                minInclusive: 0,
                minExclusive: 0,
                maxInclusive: 180,
                maxExclusive: 180,
            },
        ],
        newTiling: true,
        tiling: ParallelogramTiling.prototype.fromParameters,
    },

    triangle: {
        name: "Triangle Tiling",
        message:
            "This window sets the tiling to the standard tiling by triangulated " +
            "parallelograms with sides of length 1 and L, and an angle &#952; measured in " +
            " degrees. The diagonal is opposite &#952;.",
        parameters: [
            {
                name: "Length",
                placeholder: "L",
                id: "L",
                minInclusive: 0,
                minExclusive: 0,
                maxInclusive: Number.POSITIVE_INFINITY,
                maxExclusive: Number.POSITIVE_INFINITY,
            },
            {
                name: "Angle",
                placeholder: "&#952;",
                id: "theta",
                minInclusive: 0,
                minExclusive: 0,
                maxInclusive: 180,
                maxExclusive: 180,
            },
        ],
        newTiling: true,
        tiling: TriangleTiling.prototype.fromParameters,
    },

    "triangle-angles": {
        name: "Triangle Tiling",
        message:
            "This window sets the tiling to the standard tiling by triangulated " +
            "parallelograms with angles &#966; and &#952; (both measured in degrees), and a " +
            "base  length of 1. The diagonal is opposite &#952;.",
        parameters: [
            {
                name: "Angle &#966;",
                placeholder: "&#966;",
                id: "phi",
                minInclusive: 0,
                minExclusive: 0,
                maxInclusive: 180,
                maxExclusive: 180,
            },
            {
                name: "Angle &#952;",
                placeholder: "&#952;",
                id: "theta",
                minInclusive: 0,
                minExclusive: 0,
                maxInclusive: 180,
                maxExclusive: 180,
            },
        ],
        newTiling: true,
        tiling: TriangleTiling.prototype.fromAngles,
    },

    brick: {
        name: "Brick Tiling",
        message:
            "This window constructs the tiling by square bricks with offset T, a real " +
            "number between zero and one.",
        parameters: [
            {
                name: "Offset",
                placeholder: "T",
                id: "T",
                minInclusive: 0,
                minExclusive: Number.NEGATIVE_INFINITY,
                maxInclusive: 1,
                maxExclusive: Number.POSITIVE_INFINITY,
            },
        ],
        newTiling: true,
        tiling: BrickTiling.prototype.fromParameters,
    },

    "two-square": {
        name: "Two Square Tiling",
        message:
            "This window sets the tiling to two-square tiling with side-lengths " +
            "L<sub>1</sub> and L<sub>2</sub>.",
        parameters: [
            {
                name: "Length 1",
                placeholder: "L_1",
                id: "L_1",
                minInclusive: 0,
                minExclusive: 0,
                maxInclusive: Number.POSITIVE_INFINITY,
                maxExclusive: Number.POSITIVE_INFINITY,
            },
            {
                name: "Length 2",
                placeholder: "L_2",
                id: "L_2",
                minInclusive: 0,
                minExclusive: 0,
                maxInclusive: Number.POSITIVE_INFINITY,
                maxExclusive: Number.POSITIVE_INFINITY,
            },
        ],
        newTiling: true,
        tiling: TwoSquareTiling.prototype.fromParameters,
    },
};

export default FormConfig;
