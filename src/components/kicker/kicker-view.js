import React from 'react';
import ReactMarkdown from 'react-markdown';
import SbEditable from 'storyblok-react';

export default props => (
  <SbEditable content={props.blok}>
    <ReactMarkdown className='kicker'>{props.blok.text}</ReactMarkdown>
  </SbEditable>
);
