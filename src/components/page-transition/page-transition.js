import React, {createRef, useState} from 'react';
import {navigate} from 'gatsby';
import {TweenLite, TimelineLite, Power3} from 'gsap';
import Lottie from 'lottie-react-web';
import {TransitionGroup, Transition} from 'react-transition-group';

import animation from '../../assets/arrows_loader.json';
import animationLogo from '../../assets/logo_intro.json';

export const PageTransitionContext = React.createContext();

export default function PageTransition({children, path}) {
  const [appeared, setAppeared] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [toggleIntro, setToggleIntro] = useState(false);
  const [toggleLoader, setToggleLoader] = useState(false);

  const intro = createRef();
  const loader = createRef();
  const wrapper = createRef();

  const speed = {
    exit: 0.8,
    enter: 0.8,
    loader: 0.25,
    loading: 2,
    overlap: 0.5,
  };
  const ease = Power3.easeOut;

  return (
    <TransitionGroup component={null}>
      <Transition
        key={path}
        timeout={{
          exit: 0,
          enter: (speed.loading + speed.enter) * 1000,
        }}
        appear
        onEnter={onEnter}
        onEntering={onEntering}
      >
        <>
          {!loaded && (
            <div ref={intro} className='page-transition__intro'>
              <div className='page-transition__intro-lottie'>
                <Lottie
                  isPaused={!toggleIntro}
                  options={{animationData: animationLogo, autoplay: false, loop: false}}
                />
              </div>
            </div>
          )}
          <div ref={loader} className='page-transition__loader'>
            <Lottie
              width={200}
              isPaused={!toggleLoader}
              options={{animationData: animation, autoplay: false, loop: false}}
            />
          </div>
          <div className='page-transition__children' ref={wrapper}>
            <PageTransitionContext.Provider
              value={{appeared: appeared, loaded: loaded, navigate: triggerExit, canScroll: canScroll}}
            >
              {children}
            </PageTransitionContext.Provider>
          </div>
        </>
      </Transition>
    </TransitionGroup>
  );

  function triggerExit(e) {
    if (wrapper && wrapper.current) {
      e.preventDefault();
      if (e.currentTarget.href !== window.location.href) {
        setCanScroll(false);

        const link = e.currentTarget.pathname === '/home/' ? '/' : e.currentTarget.pathname;
        const tl = new TimelineLite({onComplete: () => navigate(link)});

        if (!loaded) {
          tl.to(intro.current, 0.4, {height: '100vh', ease: Power3.easeOut});
        } else {
          tl.to(wrapper.current, speed.exit, {opacity: 0, ease: ease});
        }
        tl.call(setAppeared, [false]);
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  }

  // React Transition Group
  function onEnter() {
    if (wrapper && wrapper.current) TweenLite.set(wrapper.current, {opacity: 0});
  }

  function onEntering() {
    const tl = new TimelineLite();

    if (
      typeof window !== undefined &&
      (window.location.pathname.includes('thanks') || window.location.pathname.includes('404'))
    ) {
      tl.set(intro.current, {height: '0vh'})
        .add(displayLoader())
        .add(displayPage(), `-=${speed.overlap}`)
        .call(setCanScroll, [true]);
    } else if (!loaded) {
      // prettier-ignore
      tl
        .delay(0.4)
        .call(setToggleIntro, [true])
        .add(displayPage())
        .set('body', {overflow: 'hidden'})
        .call(scrollTop)
        .to(intro.current, 0.6, { height: '0vh', ease: Power3.easeOut }, 4.2)
        .call(setAppeared, [true], null, '-=0.2')
        .set('body', {overflowY: 'visible', overflowX: 'hidden'})
        .call(setLoaded, [true])
        .call(setCanScroll, [true]);
    } else {
      tl.delay(speed.exit)
        .add(displayLoader(), `-=${speed.overlap}`)
        .add(displayPage(), `-=${speed.overlap}`)
        .call(setAppeared, [true], null, '-=0.2')
        .call(setCanScroll, [true]);
    }
  }

  // GSAP Timelines

  function displayLoader() {
    const el = loader.current;
    const tl = new TimelineLite();

    return tl
      .set('body', {overflow: 'hidden'})
      .call(scrollTop)
      .set(el, {display: 'block'})
      .call(setToggleLoader, [true])
      .to(el, speed.loader, {opacity: 1, ease: ease})
      .to(el, speed.loader, {opacity: 0, ease: ease}, speed.loading - speed.loader)
      .set('body', {overflowY: 'visible', overflowX: 'hidden'})
      .set(el, {display: 'none'})
      .call(setToggleLoader, [false]);
  }

  function displayPage() {
    const el = wrapper.current;
    const tl = new TimelineLite();

    // prettier-ignore
    return tl
      .set(el, { position: '', width: '', opacity: 0 })
      .to(el, speed.enter, { opacity: '1', ease: ease });
  }

  function scrollTop() {
    window.scrollTo(0, 0);
  }
}
