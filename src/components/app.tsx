import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import inputRunner from '../input-runner/input-runner';
import { State } from '../state-machine/state-machine';
import MarsInput from './mars-input';
import MarsOutput from './mars-output';

export default () => {
    const [state, setState] = useState<null | State>(null);
    const handleSubmit = (input: string) => {
        setState(inputRunner(input));
    };
    return (
        <Container>
            <Row><Col><h1>Mars Robots</h1></Col></Row>
            <Row>
                <Col>
                    <MarsInput onSubmit={handleSubmit} />
                </Col>
                <Col>
                    <MarsOutput state={state} />
                </Col>
            </Row>
        </Container>
    );
};