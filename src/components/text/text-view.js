import React from 'react';
import ReactMarkdown from 'react-markdown';
import SbEditable from 'storyblok-react';

export default props => (
  <SbEditable content={props.blok}>
    <div className='text'>
      <p className='text__quote'>
        <ReactMarkdown allowedTypes={['strong', 'text']} unwrapDisallowed={true}>
          {props.blok.quote}
        </ReactMarkdown>
      </p>
      <ReactMarkdown
        className='text__content'
        allowedTypes={['break', 'paragraph', 'emphasis', 'strong', 'thematicBreak', 'text']}
      >
        {props.blok.text}
      </ReactMarkdown>
    </div>
  </SbEditable>
);
