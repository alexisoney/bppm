import React from 'react';

const path = 'https://res.cloudinary.com/studio-basilic-tropical/video/upload';
const file = 'BPPM/BPPM-Placeholder_tp838n';

export default ({title}) => (
  <>
    <div className='fullpage-video__container'>
      <video className='fullpage-video__element' muted data-autoplay loop data-keepplaying>
        <source data-src={`${path}/w_2560,q_80/${file}.mp4`} type='video/mp4' />
        <source data-src={`${path}/w_2560,q_80/${file}.webm`} type='video/webm' />
      </video>
    </div>
    <h1 className='fullpage-video__title'>{title}</h1>
  </>
);
