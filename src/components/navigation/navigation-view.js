import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'gatsby';
import SbEditable from 'storyblok-react';

import logoSVG from '../../assets/logo.svg';
import menuIcon from '../../assets/icon_menu.svg';
import closeIcon from '../../assets/icon_close.svg';

export default props => {
  if (!props.blok.navigations_items) return null;

  const wrapper = useRef();
  const logo = useRef();
  const items = useRef();

  const [wrapperWidth, setWrapperWidth] = useState();
  const [navigationWidth, setNavigationWidth] = useState();

  useEffect(() => {
    setNavigationWidth(getNavigationWidth());
    setWrapperWidth(getWrapperWidth());

    function handleResize() {
      setWrapperWidth(getWrapperWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (wrapper.current) {
      if (wrapperWidth <= navigationWidth) {
        wrapper.current.classList.add('navigation--small');
      } else {
        wrapper.current.classList.remove('navigation--small');
        setIsOpen(false);
      }
    }
  }, [wrapperWidth]);

  function getWrapperWidth() {
    if (wrapper.current) {
      return window.innerWidth * 0.8;
    }
    return null;
  }

  function getNavigationWidth() {
    let width = 0;
    if (items.current) {
      items.current.querySelectorAll('.navigation__item').forEach(item => {
        width = width + item.offsetWidth;
      });
    }
    if (logo.current) width = width + logo.current.offsetWidth;
    return width;
  }

  const [isOpen, setIsOpen] = useState(false);

  function toggleNavigation() {
    setIsOpen(state => !state);
  }

  useEffect(() => {
    if (wrapper.current) {
      if (isOpen) {
        wrapper.current.classList.add('navigation--open');
      } else {
        wrapper.current.classList.remove('navigation--open');
      }
    }
  }, [isOpen]);

  return (
    <nav className='navigation' ref={wrapper}>
      <div className='navigation__background' />
      <img className='navigation__logo' src={logoSVG} alt='BPPM' ref={logo} />
      <div className='navigation__button' onClick={toggleNavigation}>
        <span className='navigation__button-open'>
          <img alt='Menu' src={menuIcon} />
        </span>
        <span className='navigation__button-close'>
          <img alt='Close' src={closeIcon} />
        </span>
      </div>
      <ul className='navigation__items' ref={items}>
        {props.blok.navigations_items.map(item => {
          if (item.component !== 'link' && item.link.linktype !== 'story') return null;
          return (
            <SbEditable key={item._uid} content={item}>
              <li className='navigation__item'>
                <Link
                  className='navigation__link'
                  to={`/${item.link.cached_url}`}
                  activeClassName='navigation__link--active'
                >
                  {item.text}
                </Link>
              </li>
            </SbEditable>
          );
        })}
      </ul>
    </nav>
  );
};
