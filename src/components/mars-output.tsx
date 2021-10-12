import React from 'react';
import { State } from '../state-machine/state-machine';

export default ({ state }: { state: State | null }) => {
    return (<div>{JSON.stringify(state)}</div>);
};