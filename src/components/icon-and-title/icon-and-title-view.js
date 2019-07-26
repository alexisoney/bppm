import React from 'react';
import SbEditable from 'storyblok-react';

export default props => {
  return (
    <SbEditable content={props.blok}>
      <section className='icon-and-title'>
        <h1 className='icon-and-title__title'>{props.blok.title}</h1>
      </section>
    </SbEditable>
  );
};
