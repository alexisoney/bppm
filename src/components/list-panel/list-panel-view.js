import React, {useState, useRef} from 'react';
import {TimelineLite, Power3} from 'gsap';
import {Transition, TransitionGroup} from 'react-transition-group';
import SbEditable from 'storyblok-react';

import {Img} from '../cloudinary';

export default props => {
  const [active, setActive] = useState(props.blok.items[0]);

  const contentTitle = useRef();

  let componentClassName = 'list-panel';
  componentClassName += props.blok.reverse ? ' list-panel--right' : '';

  return (
    <SbEditable content={props.blok}>
      <section className={componentClassName}>
        <TransitionGroup className='list-panel__image-container'>
          {props.blok.items.map(item => {
            if (item._uid !== active._uid) return null;

            return (
              <Transition
                key={item._uid}
                timeout={{exit: 400, enter: 700}}
                onExit={el => imageExit(el)}
                onEnter={el => imageEnter(el)}
              >
                <Img className='list-panel__image' url={item.image} sizes='(max-width: 1080px) 100vw, 50vw' />
              </Transition>
            );
          })}
        </TransitionGroup>

        <ul className='list-panel__titles'>
          {props.blok.items.map(item => {
            let itemClassName = 'list-panel__title';
            if (active) {
              itemClassName += item._uid === active._uid ? ' list-panel__title--active' : '';
            }

            return (
              <li className={itemClassName} key={item._uid} onClick={() => setActive(item)}>
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
                timeout={{exit: 300, enter: 700}}
                onExiting={el => contentExiting(el)}
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

  function contentEnter(el) {
    const tl = new TimelineLite();
    const title = el.querySelector('.list-panel__content-title');
    const divider = el.querySelector('.list-panel__content-divider');
    const text = el.querySelector('.list-panel__content-text');

    // prettier-ignore
    tl.set(el, {display: 'none'})
      .set([title,divider,text], {y: 100, opacity: 0})
      .set(el, {display: ''}, 0.4)
      .to([title,divider], 0.4, {y: 0, opacity: 1, ease: Power3.easeOut})
      .to(text, 0.4, {y: 0, opacity: 1, ease: Power3.easeOut}, '-=0.2');
  }

  function contentExiting(el) {
    const tl = new TimelineLite();
    const title = el.querySelector('.list-panel__content-title');
    const divider = el.querySelector('.list-panel__content-divider');
    const text = el.querySelector('.list-panel__content-text');
    // prettier-ignore
    tl.to([title,divider], 0.3, {y: -100, opacity: 0, ease: Power3.easeOut})
      .to(text, 0.3, {y: -100, opacity: 0, ease: Power3.easeOut}, '-=0.2');
  }

  function imageEnter(el) {
    const tl = new TimelineLite();
    // prettier-ignore
    tl.set(el, {display: 'none', scale: 0.98, opacity: 0})
      .set(el, {display: ''}, 0.4)
      .to(el, 0.4, {scale: 1, opacity: 1, ease: Power3.easeOut});
  }

  function imageExit(el) {
    const tl = new TimelineLite();
    // prettier-ignore
    tl.to(el, 0.4, {scale: 0.98, opacity: 0});
  }
};
