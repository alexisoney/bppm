import React, {useEffect, useRef} from 'react';
import {Power2, TweenLite, TimelineLite} from 'gsap';
import lottie from 'lottie-web';
import ReactMarkdown from 'react-markdown';

import arrows from '../../assets/arrows_red.svg';
import illustrationJSON from '../../assets/gestion_projet.json';
import {breakpoints} from '../../variables';

const isBrowser = typeof window !== undefined;

const Story = props => {
  const wrapper = useRef();
  const scene = useRef();
  const illustration = useRef();

  let wrapperAbsoluteTop, wrapperAbsoluteBottom, chapterHeight;
  let chapters;
  let svgAnimation;

  const svgAnimationSegments = [[0, 150], [150, 315], [315, 470], [470, 930]];

  useEffect(() => {
    if (isBrowser) {
      svgAnimation = lottie.loadAnimation({
        container: illustration.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: illustrationJSON,
      });

      initComponent();

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', initComponent);
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', initComponent);
      }
    };
  }, []);

  if (!props.blok && props.blok.chapters.length < 1) {
    return null;
  }

  return (
    <div ref={wrapper} className='story'>
      <div ref={scene} className='story__scene'>
        <div ref={illustration} className='story__illustration' />
        {props.blok.chapters.map(chapter => (
          <div className='story__chapter' key={chapter._uid}>
            <div className='story__content'>
              <h3 className='story__title'>{chapter.title}</h3>
              <ul className='story__text'>{markdownToList(chapter.content)}</ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function handleScroll() {
    if (window.innerWidth >= breakpoints.medium) {
      const scrollYTop = window.pageYOffset;
      const scrollYBottom = window.pageYOffset + window.innerHeight;

      if (scrollYBottom >= wrapperAbsoluteBottom) {
        window.requestAnimationFrame(() => {
          TweenLite.set(scene.current, {position: 'sticky'});
        });
      } else if (scrollYTop >= wrapperAbsoluteTop) {
        window.requestAnimationFrame(() => {
          TweenLite.set(scene.current, {position: 'fixed'});
        });
      } else if (scene.current.style.position === 'fixed') {
        window.requestAnimationFrame(() => {
          TweenLite.set(scene.current, {position: 'sticky'});
        });
      }

      for (let i = 0; i <= 3; i++) {
        let minScroll = wrapperAbsoluteTop + chapterHeight * (i - 0.33);
        let maxScroll = wrapperAbsoluteTop + chapterHeight * (i + 0.67);

        if (scrollYTop > minScroll && scrollYTop < maxScroll) {
          if (parseFloat(chapters[i].style.opacity) === 0) {
            TweenLite.to(chapters[i], 0.4, {opacity: 1, y: '0%', ease: Power2.easeInOut});
            svgAnimation.playSegments(svgAnimationSegments[i], true);
          }
        } else {
          if (parseFloat(chapters[i].style.opacity) > 0) {
            const tl = new TimelineLite();
            tl.to(chapters[i], 0.4, {opacity: 0, y: '-25%', ease: Power2.easeInOut}).set(chapters[i], {y: '25%'});
          }
        }
      }
    }
  }

  function initComponent() {
    chapters = Array.from(document.querySelectorAll('.story__chapter'));

    if (window.innerWidth >= breakpoints.medium) {
      TweenLite.set(wrapper.current, {height: '400vh'});
      TweenLite.set(scene.current, {position: 'sticky', top: 0, left: 0, height: '100vh', width: '100%'});
      TweenLite.set(illustration.current, {display: 'block', position: 'absolute', top: 0, left: 0});
      TweenLite.set(chapters, {position: 'absolute', top: 0, left: 0, height: '100%', opacity: 0, y: '25%'});

      const wrapperRelativeTop = wrapper.current.getBoundingClientRect().top;
      const wrapperRelativeBottom = wrapper.current.getBoundingClientRect().bottom;
      const pageYOffset = window.pageYOffset;
      wrapperAbsoluteTop = wrapperRelativeTop + pageYOffset;
      wrapperAbsoluteBottom = wrapperRelativeBottom + pageYOffset;

      chapterHeight = wrapper.current.offsetHeight / 5;

      handleScroll();
    } else {
      wrapper.current.removeAttribute('style');
      scene.current.removeAttribute('style');
      illustration.current.removeAttribute('style');
      chapters.forEach(chapter => chapter.removeAttribute('style'));

      svgAnimation.playSegments(
        [svgAnimationSegments[0][0], svgAnimationSegments[svgAnimationSegments.length - 1][1]],
        true
      );
    }
  }

  function markdownToList(markdown) {
    return (
      <ReactMarkdown
        source={markdown}
        renderers={{
          listItem: ({children}) => <li style={{backgroundImage: `url(${arrows})`}}>{children}</li>,
        }}
        allowedTypes={['text', 'listItem']}
        unwrapDisallowed={true}
      />
    );
  }
};

export default Story;
