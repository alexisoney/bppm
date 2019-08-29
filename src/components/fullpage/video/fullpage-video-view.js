import React, {useContext, useEffect, useRef} from 'react';
import {Power3, TweenMax} from 'gsap';

import {PageTransitionContext} from '../../page-transition/page-transition';

const path = 'https://res.cloudinary.com/studio-basilic-tropical/video/upload';
const videoFile = 'BPPM/golden-gate-bridge-drive-NCBGJZ2_xlhglm';
const placeholder =
  'https://res.cloudinary.com/studio-basilic-tropical/image/upload/w_1920,q_80/BPPM/bppm_video-placeholder.jpg';

export default props => {
  const {appeared} = useContext(PageTransitionContext);

  const titleElement = useRef();
  const videoElement = useRef();

  useEffect(() => {
    if (titleElement && titleElement.current) {
      const el = titleElement.current.querySelectorAll('span');

      if (!appeared) {
        TweenMax.set(el, {opacity: 0, y: 200});
      } else {
        TweenMax.staggerTo(el, 0.8, {y: 0, opacity: 1, ease: Power3.easeOut}, 0.4);
      }
    }
  }, [appeared]);

  const title = props.title
    .split(' ')
    .map(el => `<span class='fullpage-video__title-word'>${el} </span>`)
    .join('');

  return (
    <>
      <div className='fullpage-video__container'>
        <video
          ref={videoElement}
          className='fullpage-video__element'
          muted
          autoPlay
          loop
          preload='auto'
          data-keepplaying
          poster={placeholder}
        >
          <source src={`${path}/w_1920,q_80/${videoFile}.mp4`} type='video/mp4' />
          <source src={`${path}/w_1920,q_80/${videoFile}.webm`} type='video/webm' />
        </video>
      </div>
      <h1 ref={titleElement} className='fullpage-video__title' dangerouslySetInnerHTML={{__html: title}} />
    </>
  );
};
