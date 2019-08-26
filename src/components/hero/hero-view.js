import React, {useContext, useRef, useEffect} from 'react';
import {Power2, TweenMax, TimelineMax} from 'gsap';
import SbEditable from 'storyblok-react';

import arrows from '../../assets/arrows_red.svg';
import arrowsWhite from '../../assets/arrows_white.svg';
import {Img} from '../cloudinary';
import {PageTransitionContext} from '../page-transition/page-transition';

export default props => {
  const {image, anchors} = props.blok;

  const {appeared} = useContext(PageTransitionContext);

  const anchorsElement = useRef();
  const titleElement = useRef();

  const title = props.blok.title
    .split(' ')
    .map(el => `<span class='fullpage-video__title-word'>${el} </span>`)
    .join('');

  useEffect(() => {
    if (titleElement && anchorsElement) {
      const title = titleElement.current.querySelectorAll('span');
      const anchors = anchorsElement.current;

      if (!appeared) {
        TweenMax.set(title, {opacity: 0, y: 200});
        TweenMax.set(anchors, {opacity: 0, y: 50});
      } else {
        const tl = new TimelineMax();
        // prettier-ignore
        tl.staggerTo(title, 0.8, {y: 0, opacity: 1, ease: Power2.easeInOut}, 0.4)
          .to(anchors, 0.4, {y: 0, opacity: 1, ease: Power2.easeInOut})
      }
    }
  }, [appeared]);

  return (
    <SbEditable content={props.blok}>
      <div className='hero'>
        <div className='hero__background'>
          <Img className='hero__background-image' url={image} parameters='e_grayscale' />
          <img className='hero__background-watermark' src={arrowsWhite} alt='' />
          <img className='hero__background-arrows' alt='' src={arrows} onClick={arrowsScroll} />
        </div>
        <h1 ref={titleElement} className='hero__title' dangerouslySetInnerHTML={{__html: title}} />
        <ul ref={anchorsElement} className='hero__anchors'>
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
