import React, { useRef } from 'react';

interface MarsInputPropType {
    onSubmit: (input: string) => void
}

export default ({ onSubmit }: MarsInputPropType) => {
    const textRef = useRef<null | HTMLTextAreaElement>(null);
    return (
        <div>
            <textarea ref={textRef}></textarea>
            <input type="button" value="Submit" onClick={() => onSubmit(textRef.current?.value || '')} />
        </div>
    );
};