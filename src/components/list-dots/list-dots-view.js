import React, {useState, useRef, useEffect} from 'react';
import SbEditable from 'storyblok-react';

import {breakpoints} from '../../variables';

export default props => {
  const [active, setActive] = useState(props.blok.items[0]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const items = useRef();

  function getWindowWith() {
    return window.innerWidth;
  }

  function handleClick(item) {
    setActive(item);
    console.log(windowWidth, breakpoints.wide);
    if (windowWidth < breakpoints.wide && items.current) {
      const clickedIndex = props.blok.items.findIndex(i => i._uid === item._uid);
      items.current.style.transform = `translateX(${-50 * (clickedIndex - 1)}vw)`;
    }
  }

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
          {props.blok.items.map(item => {
            let itemClassName = 'list-dots__item';
            itemClassName += item._uid === active._uid ? ' list-dots__item--active' : '';

            return (
              <li className={itemClassName} key={item._uid} onClick={() => handleClick(item)}>
                {item.title}
                <div className='list-dots__icon-container'>
                  <div className='list-dots__icon' />
                </div>
              </li>
            );
          })}
          <div className='list-dots__background-line' />
        </ul>
        <div className='list-dots__content'>
          <div>
            <h1 className='list-dots__content-title'>{active.title}</h1>
            <hr className='list-dots__content-divider' />
          </div>
          <p className='list-dots__content-text'>{active.text}</p>
        </div>
      </section>
    </SbEditable>
  );
};
