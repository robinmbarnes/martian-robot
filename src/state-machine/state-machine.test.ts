import { test, expect } from '@jest/globals';
import createStateMachine, { Direction, Movement, StateAction } from './state-machine';

test('should init the world correctly', () => {
    const sm = createStateMachine();
    const newState = sm(StateAction.initWorld, {
        xMax: 5,
        yMax: 3
    });
    expect(newState).toEqual({
        xMax: 5,
        yMax: 3,
        robots: []
    });
});

test('should init a robot correctly', () => {
    const sm = createStateMachine();
    sm(StateAction.initWorld, {
        xMax: 5,
        yMax: 3
    });
    const state = sm(StateAction.initRobot, { x: 1, y: 1, direction: Direction.E });
    expect(state).toEqual({
        xMax: 5,
        yMax: 3,
        robots: [{ x: 1, y: 1, direction: Direction.E, isLost: false }]
    });
});

test('robot can do a full right loop + 1', () => {
    const sm = createStateMachine();
    sm(StateAction.initWorld, {
        xMax: 5,
        yMax: 3
    });
    sm(StateAction.initRobot, { x: 1, y: 1, direction: Direction.N });
    sm(StateAction.moveRobot, { movement: Movement.R });
    sm(StateAction.moveRobot, { movement: Movement.R });
    sm(StateAction.moveRobot, { movement: Movement.R });
    sm(StateAction.moveRobot, { movement: Movement.R });
    const state = sm(StateAction.moveRobot, { movement: Movement.R });
    expect(state).toEqual({
        xMax: 5,
        yMax: 3,
        robots: [{ x: 1, y: 1, direction: Direction.E, isLost: false }]
    });
});


test('robot can do a full left loop + 1', () => {
    const sm = createStateMachine();
    sm(StateAction.initWorld, {
        xMax: 5,
        yMax: 3
    });
    sm(StateAction.initRobot, { x: 1, y: 1, direction: Direction.N });
    sm(StateAction.moveRobot, { movement: Movement.L });
    sm(StateAction.moveRobot, { movement: Movement.L });
    sm(StateAction.moveRobot, { movement: Movement.L });
    sm(StateAction.moveRobot, { movement: Movement.L });
    const state = sm(StateAction.moveRobot, { movement: Movement.L });
    expect(state).toEqual({
        xMax: 5,
        yMax: 3,
        robots: [{ x: 1, y: 1, direction: Direction.W, isLost: false }]
    });
});

test('should move robot forward correctly', () => {
    const sm = createStateMachine();
    sm(StateAction.initWorld, {
        xMax: 5,
        yMax: 3
    });
    sm(StateAction.initRobot, { x: 1, y: 1, direction: Direction.N });
    const state = sm(StateAction.moveRobot, { movement: Movement.F });
    expect(state).toEqual({
        xMax: 5,
        yMax: 3,
        robots: [{ x: 1, y: 2, direction: Direction.N, isLost: false }]
    });
});

test('should be able to loose a robot', () => {
    const sm = createStateMachine();
    sm(StateAction.initWorld, {
        xMax: 5,
        yMax: 3
    });
    sm(StateAction.initRobot, { x: 1, y: 1, direction: Direction.N });
    sm(StateAction.moveRobot, { movement: Movement.F });
    sm(StateAction.moveRobot, { movement: Movement.F });
    const state = sm(StateAction.moveRobot, { movement: Movement.F });
    expect(state).toEqual({
        xMax: 5,
        yMax: 3,
        robots: [{ x: 1, y: 3, direction: Direction.N, isLost: true }]
    });
});

test('should be able to save second robot via scent', () => {
    const sm = createStateMachine();
    sm(StateAction.initWorld, {
        xMax: 5,
        yMax: 3
    });

    sm(StateAction.initRobot, { x: 1, y: 1, direction: Direction.N });
    sm(StateAction.moveRobot, { movement: Movement.F });
    sm(StateAction.moveRobot, { movement: Movement.F });
    sm(StateAction.moveRobot, { movement: Movement.F });

    sm(StateAction.initRobot, { x: 1, y: 1, direction: Direction.N });
    sm(StateAction.moveRobot, { movement: Movement.F });
    sm(StateAction.moveRobot, { movement: Movement.F });
    const state = sm(StateAction.moveRobot, { movement: Movement.F });

    expect(state).toEqual({
        xMax: 5,
        yMax: 3,
        robots: [{ x: 1, y: 3, direction: Direction.N, isLost: true }, { x: 1, y: 3, direction: Direction.N, isLost: false }]
    });
});



