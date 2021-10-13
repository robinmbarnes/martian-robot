import { Direction, InitRobotPayload, InitWorldPayload, Movement, MoveRobotPayload, StateAction } from '../state-machine/state-machine';
import { isInteger, flatten } from 'lodash';

enum LineTypes {
    initWorld,
    initRobot,
    moveRobot,
    blank
}

interface Action {
    action: StateAction,
    payload: InitWorldPayload | InitRobotPayload | MoveRobotPayload
}

const handleInitWorld = (line: string): Action => {
    const [xMax, yMax] = line.split(' ').filter(x => x.trim().length > 0).map(x => parseInt(x));
    return {
        action: StateAction.initWorld,
        payload: { xMax, yMax }
    };
};

const hanldeInitRobot = (line: string): Action => {
    const [x, y, direction] = line.split(' ')
        .filter(x => x.trim().length > 0)
        .map((x, i) => i == 2 ? x : parseInt(x)) as [number, number, Direction];
    return {
        action: StateAction.initRobot,
        payload: { x, y, direction }
    };
};

const hanldeMoveRobot = (line: string): Action[] => line.split('')
    .filter(x => x.trim().length > 0)
    .map(x => ({
        action: StateAction.moveRobot,
        payload: { movement: x } as MoveRobotPayload
    }));

export default (input: string) => {
    let expectedLineType: LineTypes = LineTypes.initWorld;
    const lines = input.split('\n').map(x => x.trim()).filter(x => x.length > 0);
    return flatten(lines.map(line => {
        switch (expectedLineType) {
            case LineTypes.initWorld:
                expectedLineType = LineTypes.initRobot;
                return handleInitWorld(line);
            case LineTypes.initRobot:
                expectedLineType = LineTypes.moveRobot;
                return hanldeInitRobot(line);
            case LineTypes.moveRobot:
                expectedLineType = LineTypes.initRobot;
                return hanldeMoveRobot(line);
        }
    }));
};