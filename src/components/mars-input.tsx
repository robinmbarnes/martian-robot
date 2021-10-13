import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

interface MarsInputPropType {
    onSubmit: (input: string) => void
}

export default ({ onSubmit }: MarsInputPropType) => {
    const textRef = useRef<null | HTMLTextAreaElement>(null);
    return (
        <>
            <Form.Control
                as="textarea"
                placeholder="Enter input here"
                style={{ height: '300px' }}
                ref={textRef}
                className="mb-3"
            />
            <Button onClick={() => onSubmit(textRef.current?.value || '')}>Run input</Button>
        </>
    );
};