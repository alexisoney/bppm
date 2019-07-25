import React from 'react';
import Img from 'gatsby-image';
import {getFluidGatsbyImage} from 'gatsby-storyblok-image';
import SbEditable from 'storyblok-react';

import arrows from '../../assets/arrows_red.svg';

export default props => {
  const {title, image, anchors} = props.blok;

  const imgFluid = getFluidGatsbyImage(image, {maxWidth: 3840});

  return (
    <SbEditable content={props.blok}>
      <div className='hero'>
        <div className='hero__background'>
          {imgFluid && <Img className='hero__background-image' fluid={imgFluid} />}
          <img className='hero__background-arrows' alt='' src={arrows} />
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
};
