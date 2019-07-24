import React from 'react';

import arrows from '../../assets/arrows_red.svg';

export default props => {
  const {title, image, anchors = []} = props.blok;

  return (
    <div className='hero'>
      <div className='hero__background'>
        {image && <img className='hero__background-image' src={image} alt={title} />}
        <img className='hero__background-arrows' alt='' src={arrows} />
      </div>
      <h1 className='hero__title'>{title}</h1>
      <ul className='hero__anchors'>
        {anchors.map(anchor => (
          <li key={anchor._uid} className='hero__anchor'>
            <a href={`#${anchor.link}`} className='hero__link'>
              {anchor.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
