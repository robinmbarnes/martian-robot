import React, { useState } from 'react';
import inputRunner from '../input-runner/input-runner';
import { State } from '../state-machine/state-machine';
import MarsInput from './mars-input';
import MarsOutput from './mars-output';

export default () => {
    const [state, setState] = useState<null | State>(null);
    const handleSubmit = (input: string) => {
        setState(inputRunner(input));
    };
    return <div><MarsInput onSubmit={handleSubmit} /><MarsOutput state={state} /></div>;
};