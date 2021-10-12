import { test, expect } from '@jest/globals';
import { Direction, Movement, StateAction } from '../state-machine/state-machine';
import parseInput from './input-parser';

test('should produce correct world init command', () => {
    const input = '50 3';
    const commands = parseInput(input);
    expect(commands).toEqual([{
        action: StateAction.initWorld,
        payload: {
            xMax: 50,
            yMax: 3
        }
    }]);
});

test('should produce correct robot init', () => {
    const input = `50 3
        1 1 E
    `;
    const commands = parseInput(input);
    expect(commands).toEqual([{
        action: StateAction.initWorld,
        payload: {
            xMax: 50,
            yMax: 3
        }
    },
    {
        action: StateAction.initRobot,
        payload: {
            x: 1,
            y: 1,
            direction: Direction.E
        }
    }
    ]);
});

test('should produce correct robot movement', () => {
    const input = `50 3
        1 1 E
        RRLF
    `;
    const commands = parseInput(input);
    expect(commands).toEqual([{
        action: StateAction.initWorld,
        payload: {
            xMax: 50,
            yMax: 3
        }
    },
    {
        action: StateAction.initRobot,
        payload: {
            x: 1,
            y: 1,
            direction: Direction.E
        }
    },
    {
        action: StateAction.moveRobot,
        payload: {
            movement: Movement.R
        }
    },
    {
        action: StateAction.moveRobot,
        payload: {
            movement: Movement.R
        }
    },
    {
        action: StateAction.moveRobot,
        payload: {
            movement: Movement.L
        }
    },
    {
        action: StateAction.moveRobot,
        payload: {
            movement: Movement.F
        }
    }
    ]);
});

test('should produce correct second robot movement', () => {
    const input = `50 3
        1 1 E
        RRLF

        2 12 W
        LF
    `;
    const commands = parseInput(input);
    expect(commands).toEqual([{
        action: StateAction.initWorld,
        payload: {
            xMax: 50,
            yMax: 3
        }
    },
    {
        action: StateAction.initRobot,
        payload: {
            x: 1,
            y: 1,
            direction: Direction.E
        }
    },
    {
        action: StateAction.moveRobot,
        payload: {
            movement: Movement.R
        }
    },
    {
        action: StateAction.moveRobot,
        payload: {
            movement: Movement.R
        }
    },
    {
        action: StateAction.moveRobot,
        payload: {
            movement: Movement.L
        }
    },
    {
        action: StateAction.moveRobot,
        payload: {
            movement: Movement.F
        }
    },
    {
        action: StateAction.initRobot,
        payload: {
            x: 2,
            y: 12,
            direction: Direction.W
        }
    },
    {
        action: StateAction.moveRobot,
        payload: {
            movement: Movement.L
        }
    },
    {
        action: StateAction.moveRobot,
        payload: {
            movement: Movement.F
        }
    },
    ]);
});