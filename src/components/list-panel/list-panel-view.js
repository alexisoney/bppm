import React, {useState, useEffect, useRef} from 'react';
import Img from 'gatsby-image';
import {getFluidGatsbyImage} from 'gatsby-storyblok-image';
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
                {item.title}
              </li>
            );
          })}
        </ul>
        <div className='list-panel__content'>
          <h1 ref={contentTitle} className='list-panel__content-title'>
            {active && active.title}
          </h1>
          <hr className='list-panel__content-divider' />
          <p className='list-panel__content-text'>{active && active.text}</p>
        </div>
      </section>
    </SbEditable>
  );
};
