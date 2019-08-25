import React from 'react';
import SbEditable from 'storyblok-react';

import arrows from '../../assets/arrows_red.svg';
import arrowsWhite from '../../assets/arrows_white.svg';
import {Img} from '../cloudinary';

export default props => {
  const {title, image, anchors} = props.blok;

  return (
    <SbEditable content={props.blok}>
      <div className='hero'>
        <div className='hero__background'>
          <Img className='hero__background-image' url={image} parameters='e_grayscale' />
          <img className='hero__background-watermark' src={arrowsWhite} alt='' />
          <img className='hero__background-arrows' alt='' src={arrows} onClick={arrowsScroll} />
        </div>
        <h1 className='hero__title'>{title}</h1>
        <ul className='hero__anchors'>
          {anchors.map(anchor => (
            <li key={anchor.id} className='hero__anchor'>
              <a href={`#${anchor.link}`} className='hero__link'>
                {anchor.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SbEditable>
  );

  function arrowsScroll() {
    if (typeof window !== undefined) {
      window.scrollTo({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }
};
