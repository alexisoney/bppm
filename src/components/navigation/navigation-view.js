import React, {useEffect, useRef, useState, useContext} from 'react';
import {Link} from 'gatsby';
import path from 'path';
import SbEditable from 'storyblok-react';

import LogoSVG from '../../assets/logo';
import menuIcon from '../../assets/icon_menu.svg';
import {PageTransitionContext} from '../page-transition/page-transition';
import closeIcon from '../../assets/icon_close.svg';

export default props => {
  if (!props.blok.navigations_items) return null;

  const items = useRef();
  const logo = useRef();
  const wrapper = useRef();

  const {appeared} = useContext(PageTransitionContext);
  const [isOpen, setIsOpen] = useState(false);
  const [navigationWidth, setNavigationWidth] = useState();
  const [wrapperWidth, setWrapperWidth] = useState();

  let logoURL;
  logoURL = props.blok.navigations_items.filter(item => item.isLogo)[0];
  logoURL = logoURL && logoURL.link.linktype === 'story' ? logoURL.link.cached_url : '';

  useEffect(() => {
    setNavigationWidth(getNavigationWidth());
    setWrapperWidth(getWrapperWidth());

    function handleResize() {
      window.requestAnimationFrame(() => {
        setWrapperWidth(getWrapperWidth());
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (wrapper.current) {
      wrapper.current.classList.add('navigation--appeared');
    }
  }, [appeared]);

  useEffect(() => {
    if (wrapper.current) {
      if (isOpen) {
        wrapper.current.classList.add('navigation--open');
      } else {
        wrapper.current.classList.remove('navigation--open');
      }
    }
  }, [isOpen]);

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

  return (
    <nav className='navigation' ref={wrapper}>
      <div className='navigation__background' />
      <Link className='navigation__logo' ref={logo} to={path.normalize(`/${logoURL ? logoURL : ''}/`)}>
        <LogoSVG className='navigation__logo-image' />
      </Link>
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
          if (item.isLogo) return null;
          if (item.component !== 'link' && item.link.linktype !== 'story') return null;
          return (
            <SbEditable key={item._uid} content={item}>
              <li className='navigation__item'>
                <Link
                  className='navigation__link'
                  to={path.normalize(`/${item.link.cached_url}/`)}
                  activeClassName='navigation__link--active'
                >
                  <div className='navigation__link-background navigation__link-background--hover' />
                  <div className='navigation__link-background navigation__link-background--active' />
                  {item.text}
                </Link>
              </li>
            </SbEditable>
          );
        })}
      </ul>
      {/* <div className='navigation__overlay navigation__overlay-one' />
      <div className='navigation__overlay navigation__overlay-two' /> */}
    </nav>
  );

  function getNavigationWidth() {
    if (!items.current && !logo.current) return null;

    let width = 0;

    items.current.querySelectorAll('.navigation__item').forEach(item => {
      width = width + item.offsetWidth;
    });

    width = width + logo.current.offsetWidth;

    return width;
  }

  function getWrapperWidth() {
    if (wrapper.current) {
      return window.innerWidth * 0.8; // Because set as 80% in CSS
    }
    return null;
  }

  function toggleNavigation() {
    setIsOpen(state => !state);
  }
};
