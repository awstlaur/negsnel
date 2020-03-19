type Config = object & {
    initialDisplayBoxScale: number;
    nudgeAmt: number;
    screenShift: number;
    trajectoryEndpointRadius: number;
    trajectoryIters: number;

    backgroundColor: string;
    polyColor: string;
    polyStrokeColor: string;
    orbitColor: string;
    startCircleColor: string;
    endCircleColor: string;
    draggingCircleColor: string;
    endTrajectoryColor: string;
    zoomBoxStrokeColor: string;

    directionMap: {
        up: number;
        left: number;
        down: number;
        right: number;
        w: number;
        a: number;
        s: number;
        d: number;
    };

    zoomScaleMap: {
        i: number;
        o: number;
    };

    moveTrajPointsMap: {
        alt: boolean;
        shift: boolean;
    };
};

/**
 * App-wide configuration
 */
const config = {
    initialDisplayBoxScale: 5,
    nudgeAmt: 0.015,
    screenShift: 0.02,
    trajectoryEndpointRadius: 5,
    trajectoryIters: 100,

    backgroundColor: "white",
    polyColor: "lightgrey",
    polyStrokeColor: "blue",
    orbitColor: "red",
    startCircleColor: "green",
    endCircleColor: "red",
    draggingCircleColor: "yellow",
    endTrajectoryColor: "pink",
    zoomBoxStrokeColor: "orange",

    directionMap: {
        up: 0,
        left: 1,
        down: 2,
        right: 3,
        w: 0,
        a: 1,
        s: 2,
        d: 3,
    },

    zoomScaleMap: {
        i: 0.9,
        o: 1.1,
    },

    moveTrajPointsMap: {
        alt: false,
        shift: true,
    },
};

export default config;
