import React, {createRef, useState} from 'react';
import {TweenLite, TimelineLite, Power2} from 'gsap';
import Lottie from 'lottie-react-web';
import {TransitionGroup, Transition} from 'react-transition-group';

import animation from './animation.json';

const styles = {
  loader: {
    opacity: 0,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  },
};

export default function PageTransition({children, path}) {
  const [toggleLoader, setToggleLoader] = useState(false);

  const loader = createRef();
  const wrapper = createRef();

  const speed = {
    exit: 0.8,
    enter: 0.8,
    loader: 0.25,
    loading: 1.2,
    overlap: 0.5,
  };

  const ease = Power2.easeInOut;

  return (
    <TransitionGroup component={null}>
      <Transition
        key={path}
        timeout={{
          exit: speed.exit * 1000,
          enter: (speed.loading + speed.enter) * 1000,
        }}
        onExiting={onExiting}
        onEnter={onEnter}
        onEntering={onEntering}
      >
        <>
          <div ref={loader} style={styles.loader}>
            <Lottie
              width={200}
              speed={1.4}
              isPaused={!toggleLoader}
              options={{animationData: animation, autoplay: false, loop: false}}
            />
          </div>
          <div ref={wrapper}>{children}</div>
        </>
      </Transition>
    </TransitionGroup>
  );

  // React Transition Group
  function onExiting() {
    TweenLite.to(wrapper.current, speed.exit, {opacity: 0, ease: ease});
  }

  function onEnter() {
    wrapper.current.style.position = 'absolute';
    wrapper.current.style.width = '100%';
    wrapper.current.style.opacity = '0';
  }

  function onEntering() {
    const tl = new TimelineLite();
    tl.delay(speed.exit)
      .add(displayLoader(), `-=${speed.overlap}`)
      .add(displayPage(), `-=${speed.overlap}`);
  }

  // GSAP Timelines
  function displayLoader() {
    const el = loader.current;
    const tl = new TimelineLite();

    return tl
      .call(setToggleLoader, [true])
      .to(el, speed.loader, {opacity: 1, ease: ease})
      .to(el, speed.loader, {opacity: 0, ease: ease}, speed.loading - speed.loader)
      .set(el, {display: 'none'})
      .call(setToggleLoader, [false]);
  }

  function displayPage() {
    const el = wrapper.current;
    const tl = new TimelineLite();

    // prettier-ignore
    return tl
      .set(el, {position: '', width: '', opacity: 0})
      .to(el, speed.enter, {opacity: '1', ease: ease});
  }
}
