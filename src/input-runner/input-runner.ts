import createStateMachine, { State } from '../state-machine/state-machine';
import parseInput from '../input-parser/input-parser';

export default (input: string) => {
    const commands = parseInput(input);
    const sm = createStateMachine();
    return commands.reduce((state: null | State, currentCommand) => sm(currentCommand.action, currentCommand.payload), null);
};