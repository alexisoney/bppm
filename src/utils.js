import React from 'react';
import ReactMarkdown from 'react-markdown';

export function markdownToHTML(markdown) {
  return (
    <ReactMarkdown source={markdown} allowedTypes={['text', 'strong']} unwrapDisallowed={true} />
  );
}
