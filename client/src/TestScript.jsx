import React from 'react'
import { CopyBlock } from 'react-code-blocks';

export default function TestScript({code}) {
    return (
        <div style={{width: '70%', border: '1px solid black', margin: '5px'}}>
            <CopyBlock
            text={code}
            language= "python"
            showLineNumbers={true}
            wrapLines
            size
            />
        </div>
        // <div>
        //     {code}
        // </div>
        
      );
}
