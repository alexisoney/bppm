import React from 'react';
import SbEditable from 'storyblok-react';

export default props => {
  return (
    <SbEditable content={props.blok}>
      <div className='icon-and-title'>
        <img className='icon-and-title__icon' src={props.blok.icon} alt='' />
        <p className='icon-and-title__title'>{props.blok.title}</p>
      </div>
    </SbEditable>
  );
};
