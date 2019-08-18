import React, {useEffect, useRef, useContext} from 'react';
import {TweenLite} from 'gsap';

import {PageTransitionContext} from '../page-transition/page-transition';

export default ({children}) => {
  const {canScroll} = useContext(PageTransitionContext);

  const container = useRef();
  const viewport = useRef();
  const scrollArea = useRef();

  const containerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
  };

  const scrollAreaStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '1px',
  };

  const viewportStyle = {
    overflow: 'hidden',
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  let scrollRequest = 0;
  let scrollPosition = 0;
  let requestId = null;

  function handleScroll() {
    scrollRequest++;
    if (!requestId) {
      requestId = requestAnimationFrame(() => updateScroller());
    }
  }

  function updateScroller() {
    if (window !== undefined && container && container.current) {
      const scrollY = window.pageYOffset || 0;

      scrollPosition += (scrollY - scrollPosition) * 0.05;

      if (Math.abs(scrollY - scrollPosition) < 0.05) {
        scrollPosition = scrollY;
        scrollRequest = 0;
      }

      TweenLite.set(container.current, {y: -scrollPosition});

      requestId = scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
    }
  }

  function initSmoothScroll() {
    if (scrollArea && scrollArea.current && container && container.current) {
      const height = container.current.clientHeight;

      if (canScroll) {
        TweenLite.set(scrollArea.current, {height: `${height}px`});
        TweenLite.set(container.current, {rotation: 0.01, force3D: true});
      } else {
        TweenLite.set(scrollArea.current, {height: 0});
      }

      handleScroll();
    }
  }

  useEffect(() => {
    if (window !== undefined) {
      initSmoothScroll();

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', initSmoothScroll);
      return () => window.removeEventListener('resize', initSmoothScroll);
    }
  }, []);

  useEffect(() => initSmoothScroll(), [canScroll]);

  return (
    <>
      <div ref={scrollArea} style={scrollAreaStyle} />
      <div ref={viewport} style={viewportStyle}>
        <div ref={container} style={containerStyle}>
          {children}
        </div>
      </div>
    </>
  );
};
