import React from 'react';

import video from './assets/video.mp4';

export default props => (
  <>
    <h1 className='fullpage-video__headline'>{props.headline}</h1>
    <div className='fullpage-video__container'>
      <video className='fullpage-video__element' muted data-autoplay loop data-keepplaying>
        <source data-src={video} type='video/mp4' />
      </video>
    </div>
  </>
);
