import React from 'react';
import { State } from '../state-machine/state-machine';

export default ({ state }: { state: State | null }) => {
    if (!state) {
        return null;
    }
    const { robots } = state;
    return (
        <ul className="list-unstyled">
            {robots.map(robot => {
                const data = `${robot.x} ${robot.y} ${robot.direction} ${robot.isLost ? 'LOST' : ''}`;
                return (
                    <li key={data}>{data}</li>
                );
            })}
        </ul>
    );
};