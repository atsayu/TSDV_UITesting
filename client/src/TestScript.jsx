import React, { useEffect } from 'react'
import { CopyBlock, nord } from 'react-code-blocks';
import Prism from 'prismjs'
export default function TestScript({code}) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div style={{width: '100%', border: '1px solid black', margin: '5px', fontFamily: 'Fira Code', backgroundColor: ''}}>
            <CopyBlock
            text={code}
            language= "java"
            showLineNumbers={true}
            wrapLines
            codeBlock
            // wrapLongLines
            size
            theme={nord}
            
        
            />
            
        </div>
        
      );
}
