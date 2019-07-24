import React from 'react';
import SbEditable from 'storyblok-react';

export default props => {
  let componentClassName = 'title';
  componentClassName += props.blok.align_right ? ' title--right' : '';

  return (
    <SbEditable content={props.blok}>
      <div id={props.blok.index} className={componentClassName}>
        <p className='title__index'>{props.blok.index}</p>
        <h2 className='title__text'>{props.blok.text}</h2>
      </div>
    </SbEditable>
  );
};
