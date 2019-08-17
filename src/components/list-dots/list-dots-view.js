import React, {useState, useRef, useEffect} from 'react';
import {TimelineLite, Power2} from 'gsap';
import {Transition, TransitionGroup} from 'react-transition-group';
import SbEditable from 'storyblok-react';

import {breakpoints} from '../../variables';

export default props => {
  const [active, setActive] = useState(props.blok.items[0]);
  const [windowWidth, setWindowWidth] = useState(0);
  const items = useRef();

  useEffect(() => {
    getWindowWidth();

    window.addEventListener('resize', getWindowWidth);
    return () => window.removeEventListener('resize', getWindowWidth);
  }, []);

  useEffect(() => {
    if (windowWidth >= breakpoints.wide && items.current) {
      items.current.style.transform = '';
    } else {
      if (items.current.style.transform === '') {
        const activeIndex = props.blok.items.findIndex(i => i._uid === active._uid);
        items.current.style.transform = `translateX(${-50 * (activeIndex - 1)}vw)`;
      }
    }
  }, [windowWidth]);

  return (
    <SbEditable content={props.blok}>
      <section className='list-dots'>
        <ul ref={items} className='list-dots__items'>
          <div className='list-dots__background-line' />
          {props.blok.items.map(item => {
            let itemClassName = 'list-dots__item';
            itemClassName += item._uid === active._uid ? ' list-dots__item--active' : '';

            return (
              <li className={itemClassName} key={item._uid} onClick={() => handleClick(item)}>
                {item.title}
                <div className='list-dots__icon-container'>
                  <div className='list-dots__icon-container-border' />
                  <div className='list-dots__icon'>
                    <div className='list-dots__icon-background' />
                    <img className='list-dots__icon-svg' src={item.icon} alt='' />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <TransitionGroup className='list-dots__content-container'>
          {props.blok.items.map(item => {
            if (item._uid !== active._uid) return null;

            return (
              <Transition
                key={item._uid}
                timeout={{exit: 400, enter: 700}}
                onExit={el => contentExit(el)}
                onEnter={el => contentEnter(el)}
              >
                <div className='list-dots__content'>
                  <div>
                    <h1 className='list-dots__content-title'>{item.title}</h1>
                    <hr className='list-dots__content-divider' />
                  </div>
                  <p className='list-dots__content-text'>{item.text}</p>
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
    const title = el.querySelectorAll('div, p')[0];
    const text = el.querySelectorAll('div, p')[1];

    tl.set(el, {visibility: 'hidden'})
      .set([title, text], {y: '50%', opacity: 0})
      .set(el, {visibility: ''}, 0.3)
      .to(title, 0.4, {y: '0%', opacity: 1, ease: Power2.easeInOut})
      .to(text, 0.4, {y: '0%', opacity: 1, ease: Power2.easeInOut}, '-=0.2');
  }

  function contentExit(el) {
    const tl = new TimelineLite();
    const title = el.querySelectorAll('div, p')[0];
    const text = el.querySelectorAll('div, p')[1];

    tl.set(el, {position: 'absolute', bottom: 0, left: 0, width: '100%'})
      .to(title, 0.4, {y: '-50%', opacity: 0, ease: Power2.easeInOut})
      .to(text, 0.4, {y: '-50%', opacity: 0, ease: Power2.easeInOut}, '-=0.2');
  }

  function getWindowWidth() {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  }

  function handleClick(item) {
    setActive(item);
    if (windowWidth < breakpoints.wide && items.current) {
      const clickedIndex = props.blok.items.findIndex(i => i._uid === item._uid);
      items.current.style.transform = `translateX(${-50 * (clickedIndex - 1)}vw)`;
    }
  }
};
