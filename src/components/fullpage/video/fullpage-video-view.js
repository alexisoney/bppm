import React, {useContext, useEffect, useRef} from 'react';
import {Power2, TweenMax} from 'gsap';

import {PageTransitionContext} from '../../page-transition/page-transition';

const path = 'https://res.cloudinary.com/studio-basilic-tropical/video/upload';
const file = 'BPPM/golden-gate-bridge-drive-NCBGJZ2_xlhglm';

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
        TweenMax.staggerTo(el, 0.8, {y: 0, opacity: 1, ease: Power2.easeInOut}, 0.03);
      }
    }
  }, [appeared]);

  useEffect(() => {
    if (appeared && videoElement && videoElement.current) {
      videoElement.current.play().catch(() => null);
    }
  }, [appeared]);

  const title = props.title
    .split(' ')
    .map(el => `<span class='fullpage-video__title-word'>${el} </span>`)
    .join('');

  return (
    <>
      <div className='fullpage-video__container'>
        <video ref={videoElement} className='fullpage-video__element' muted loop preload='auto' data-keepplaying>
          <source src={`${path}/w_1920,q_80/${file}.mp4`} type='video/mp4' />
          <source src={`${path}/w_1920,q_80/${file}.webm`} type='video/webm' />
        </video>
      </div>
      <h1 ref={titleElement} className='fullpage-video__title' dangerouslySetInnerHTML={{__html: title}} />
    </>
  );
};
