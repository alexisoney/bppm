import React from 'react';
import SbEditable from 'storyblok-react';

export default props => {
  let componentClassName = 'title';
  componentClassName += props.blok.align_right ? ' title--right' : '';
  componentClassName += props.blok.colored ? ' title--colored' : '';
  componentClassName += props.blok.no_index ? ' title--no-index' : '';

  return (
    <SbEditable content={props.blok}>
      <div id={props.blok.index ? props.blok.index : ''} className={componentClassName}>
        {!props.blok.no_index && <p className='title__index'>{props.blok.index}</p>}
        <h2 className='title__text'>{props.blok.text}</h2>
        {props.blok.no_index && <hr className='title__divider' />}
      </div>
    </SbEditable>
  );
};
