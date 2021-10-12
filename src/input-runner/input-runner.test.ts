import { Direction } from '../state-machine/state-machine';
import { test, expect } from '@jest/globals';
import runInput from './input-runner';

test('input runner should produce correct state', () => {
    const input = `5 3 
    1 1 E 
    RFRFRFRF

    3 2 N 
    FRRFLLFFRRFLL 

    0 3 W 
    LLFFFLFLFL
    `;
    const state = runInput(input);
    expect(state).toEqual({
        yMax: 3,
        xMax: 5,
        robots: [{
            x: 1,
            y: 1,
            direction: Direction.E,
            isLost: false
        },
        {
            x: 3,
            y: 3,
            direction: Direction.N,
            isLost: true
        },
        {
            x: 2,
            y: 3,
            isLost: false,
            direction: Direction.S
        }]
    });
});