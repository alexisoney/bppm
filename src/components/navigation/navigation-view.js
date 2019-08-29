import React, {useEffect, useRef, useState, useContext} from 'react';
import {Link} from 'gatsby';
import {TimelineLite, Power3} from 'gsap';
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

  const {loaded, navigate} = useContext(PageTransitionContext);
  const [isOpen, setIsOpen] = useState(false);
  const [navigationWidth, setNavigationWidth] = useState();
  const [wrapperWidth, setWrapperWidth] = useState();

  let isAnimating = false;
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

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (wrapper.current && loaded) {
      wrapper.current.classList.add('navigation--appeared');
      setTimeout(() => {
        wrapper.current.style.overflow = 'visible';
      }, 850);
    }
  }, [loaded]);

  useEffect(() => {
    if (wrapper.current) {
      isAnimating = true;

      const tl = new TimelineLite({
        onComplete: () => {
          isAnimating = false;
        },
      });

      const background = document.querySelector('.navigation__background');
      const itemsContainer = document.querySelector('.navigation__items');
      const items = Array.from(document.querySelectorAll('.navigation__item'));
      const languages = document.querySelector('.navigation__languages-items');
      const wrap = wrapper.current;

      if (isOpen) {
        // prettier-ignore
        tl.set(itemsContainer, {display: 'block'})
          .set(items, {display: 'block', opacity: 0})
          .set(languages, {display: 'flex', opacity: 0})
          .to(wrap, 0.4, {height: `${window.innerHeight - 68}px`, ease: Power3.easeOut}, 'show')
          .to(background, 0.4, {opacity: 0.98}, 'show')
          .staggerTo(items, 0.4, {opacity: 1, stagger: {ease: Power3.easeOut, amount: 0.4}}, null, 'show+=0.1')
          .to(languages, 0.4, {opacity: 1, ease: Power3.easeOut});
      } else {
        // prettier-ignore
        tl.to(languages, 0.25, {opacity: 0, ease: Power3.easeOut}, 'hide')
          .to(items, 0.25, {opacity: 0, ease: Power3.easeOut}, 'hide')
          .to(wrap, 0.4, {height: `64px`, ease: Power3.easeOut}, 'close')
          .to(background, 0.4, {opacity: 0.7}, 'close')
          .call(() => languages.removeAttribute('style'))
          .call(() => itemsContainer.removeAttribute('style'))
          .call(() => items.forEach(i => i.removeAttribute('style')))
          .call(() => wrap.style.removeProperty('height'))
          .call(() => background.removeAttribute('style'));
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (wrapper.current) {
      if (wrapperWidth <= navigationWidth) {
        wrapper.current.classList.add('navigation--small');
      } else {
        setIsOpen(false);
        wrapper.current.classList.remove('navigation--small');
      }
    }
  }, [wrapperWidth]);

  return (
    <nav className='navigation' ref={wrapper}>
      <div className='navigation__background' />
      <Link
        onClick={e => handleClick(e)}
        className='navigation__logo'
        ref={logo}
        to={path.normalize(`/${logoURL ? logoURL : ''}/`)}
      >
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
          if (item.component !== 'link' && item.link.linktype !== 'story') return null;
          return (
            <SbEditable key={item._uid} content={item}>
              <li className='navigation__item'>
                <Link
                  onClick={e => handleClick(e)}
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
      <div className='navigation__overlay navigation__overlay-one' />
      <ul className='navigation__languages-items'>
        <li
          className={`navigation__languages-item 
          ${isEnglish() ? '' : 'navigation__languages-item--active'}`}
        >
          <a className='navigation__languages-link' href={`${getWindowLocationOrigin()}/`}>
            FR
          </a>
        </li>
        <li
          className={`navigation__languages-item 
          ${isEnglish() ? 'navigation__languages-item--active' : ''}`}
        >
          <a className='navigation__languages-link' href={`${getWindowLocationOrigin()}/en/home/`}>
            EN
          </a>
        </li>
      </ul>
    </nav>
  );

  function getWindowLocationOrigin() {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return '';
  }

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

  function handleClick(e) {
    e.currentTarget.classList.add('navigation__link--active');
    navigate(e);
  }

  function isEnglish() {
    if (typeof window !== 'undefined') {
      return window.location.href.includes('/en/');
    }

    return false;
  }

  function toggleNavigation() {
    if (!isAnimating) setIsOpen(state => !state);
  }
};
