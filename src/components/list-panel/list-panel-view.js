import React, {useState, useEffect, useRef} from 'react';
import Img from 'gatsby-image';
import {getFluidGatsbyImage} from 'gatsby-storyblok-image';
import {TimelineLite, Power2} from 'gsap';
import {Transition, TransitionGroup} from 'react-transition-group';
import SbEditable from 'storyblok-react';

import {breakpoints} from '../../variables';

export default props => {
  const [active, setActive] = useState(props.blok.items[0]);
  const [imgFluid, setImgFluid] = useState();

  const contentTitle = useRef();

  let componentClassName = 'list-panel';
  componentClassName += props.blok.reverse ? ' list-panel--right' : '';

  useEffect(() => {
    if (active) {
      if (active.image) {
        setImgFluid(getFluidGatsbyImage(active.image, {maxWidth: 500}));
      } else {
        setImgFluid(null);
      }
    }
  }, [active]);

  function contentExit(el) {
    const tl = new TimelineLite();
    // prettier-ignore
    tl.to(el, 0.4, {y: '-50%', opacity: 0, ease: Power2.easeInOut});
  }

  function contentEnter(el) {
    const tl = new TimelineLite();
    // prettier-ignore
    tl.set(el, {y: '50%', display: 'none', opacity: 0})
      .set(el, {display: ''}, 0.4)
      .to(el, 0.4, {y: '0%', opacity: 1, ease: Power2.easeInOut});
  }

  function handleClick(item) {
    setActive(item);
    if (contentTitle.current && window.innerWidth < breakpoints.wide) {
      setTimeout(() => contentTitle.current.scrollIntoView(), 400);
    }
  }

  return (
    <SbEditable content={props.blok}>
      <section className={componentClassName}>
        {imgFluid && <Img className='list-panel__image' fluid={imgFluid} style={{position: ''}} />}
        <ul className='list-panel__titles'>
          {props.blok.items.map(item => {
            let itemClassName = 'list-panel__title';
            if (active) {
              itemClassName += item._uid === active._uid ? ' list-panel__title--active' : '';
            }

            return (
              <li className={itemClassName} key={item._uid} onClick={() => handleClick(item)}>
                <div className='list-panel__title-background list-panel__title-background--hover' />
                <div className='list-panel__title-background list-panel__title-background--active' />
                <div className='list-panel__title-text'>{item.title}</div>
              </li>
            );
          })}
        </ul>
        <TransitionGroup className='list-panel__content-container'>
          {props.blok.items.map(item => {
            if (item._uid !== active._uid) return null;

            return (
              <Transition
                key={item._uid}
                timeout={{exit: 400, enter: 700}}
                onExit={el => contentExit(el)}
                onEnter={el => contentEnter(el)}
              >
                <div className='list-panel__content'>
                  <h1 ref={contentTitle} className='list-panel__content-title'>
                    {item.title}
                  </h1>
                  <hr className='list-panel__content-divider' />
                  <p className='list-panel__content-text'>{item.text}</p>
                </div>
              </Transition>
            );
          })}
        </TransitionGroup>
      </section>
    </SbEditable>
  );
};
