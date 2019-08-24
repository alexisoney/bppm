import React from 'react';
import SbEditable from 'storyblok-react';

import Button from '../button';
import {Img} from '../cloudinary';

export default props => {
  const {background, button, catchup, headline, link, text} = props.blok;

  return (
    <SbEditable content={props.blok}>
      <div className='callback'>
        <div className='callback__background'>
          <Img className='callback__background-image' url={background} />
        </div>
        <h1 className='callback__title'>
          <span className='callback__catchup'>{catchup}</span>
          <br />
          {headline}
        </h1>
        <p className='callback__text'>{text}</p>
        <Button link={link}>{button}</Button>
      </div>
    </SbEditable>
  );
};
