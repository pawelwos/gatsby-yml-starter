import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Highlight = ({codeString, lang = "jsx"}) => {
  return (
    <SyntaxHighlighter language={lang} style={docco}>
      {codeString}
    </SyntaxHighlighter>
  )
}

export default Highlight