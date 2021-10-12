import isEqual from 'lodash/isequal';
import omit from 'lodash/omit';

export enum Direction {
    N = 'N',
    E = 'E',
    S = 'S',
    W = 'W'
}

interface Robot {
    direction: Direction,
    x: number,
    y: number,
    isLost: boolean
}

interface State {
    yMax: number,
    xMax: number,
    robots: Robot[]
}

interface InitWorldPayload {
    xMax: number,
    yMax: number
}

const initWorld = ({ xMax, yMax }: InitWorldPayload, currentState: State) => {
    return {
        ...currentState,
        xMax,
        yMax
    };
};

interface InitRobotPayload {
    direction: Direction,
    x: number,
    y: number
}

const initRobot = ({ direction, x, y }: InitRobotPayload, currentState: State) => {
    const { robots, ...rest } = currentState;
    return {
        ...rest,
        robots: [...robots, {
            direction,
            x,
            y,
            isLost: false
        }]
    };
};

const points = [
    Direction.N,
    Direction.E,
    Direction.S,
    Direction.W
];

interface Coord {
    x: number,
    y: number
}

const movements = {
    'N': ({ x, y }: Coord) => ({ x, y: y + 1 }),
    'E': ({ x, y }: Coord) => ({ x: x + 1, y }),
    'S': ({ x, y }: Coord) => ({ x, y: y - 1 }),
    'W': ({ x, y }: Coord) => ({ x: x - 1, y }),
};

const isAboutToDie = (otherRobots: Robot[], currentRobot: Robot) =>
    otherRobots.some(robot => isEqual(omit(robot, 'isLost'), omit(currentRobot, 'isLost')));

export enum Movement {
    F = 'F',
    L = 'L',
    R = 'R'
}

interface MoveRobotPayload {
    movement: Movement
}

const moveRobot = ({ movement }: MoveRobotPayload, currentState: State) => {
    const { robots, ...rest } = currentState;
    let currentRobot = { ...robots[robots.length - 1] };
    const otherRobots = robots.splice(0, robots.length - 1);
    if (currentRobot.isLost) {
        return currentState;
    }
    const currentPoint = points.findIndex(p => currentRobot.direction === p);
    switch (movement) {
        case Movement.R:
            currentRobot.direction = points[currentPoint < 3 ? currentPoint + 1 : 0];
            break;
        case Movement.L:
            currentRobot.direction = points[currentPoint > 0 ? currentPoint - 1 : 3];
            break;
        case 'F':
            const { x, y } = movements[currentRobot.direction]({ x: currentRobot.x, y: currentRobot.y });
            const { xMax, yMax } = currentState;
            if (!isAboutToDie(otherRobots, currentRobot)) {
                if (x < 0 || y < 0 || x > xMax || y > yMax) {
                    currentRobot.isLost = true;
                } else {
                    currentRobot.x = x;
                    currentRobot.y = y;
                }
            }
    }
    return {
        ...rest,
        robots: [...otherRobots, currentRobot]
    };
};

export enum StateAction {
    initWorld = 'initWorld',
    initRobot = 'initRobot',
    moveRobot = 'moveRobot',
}

interface Handlers {
    initWorld: typeof initWorld,
    initRobot: typeof initRobot,
    moveRobot: typeof moveRobot
}

const handlers: Handlers = {
    initWorld,
    initRobot,
    moveRobot,
};

export default () => {
    let state: State = {
        yMax: 0,
        xMax: 0,
        robots: []
    };
    return (action: StateAction, payload: any) => {
        state = handlers[action](payload, state);
        return state;
    };
};


