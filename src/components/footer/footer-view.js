import React, {useContext} from 'react';
import {Link} from 'gatsby';
import path from 'path';

import logoSVG from '../../assets/logo_white.svg';
import {PageTransitionContext} from '../page-transition/page-transition';

export default props => {
  if (!props.blok.navigations_items) return null;

  const {navigate} = useContext(PageTransitionContext);

  const logoURL =
    props.blok.navigations_items[0].component === 'link' ? props.blok.navigations_items[0].link.cached_url : '';

  return (
    <div className={`footer ${props.className}`}>
      <Link onClick={e => navigate(e)} className='footer__link' to={path.normalize(`/${logoURL}/`)}>
        <img className='footer__logo' src={logoSVG} alt='BPPM' />
      </Link>
      <ul className='footer__items'>
        {props.blok.navigations_items.map(item => {
          if (item.component !== 'link' && item.link.linktype !== 'story') return null;
          return (
            <li key={item._uid} className='footer__item'>
              <Link
                onClick={e => navigate(e)}
                className='footer__link'
                to={path.normalize(`/${item.link.cached_url}/`)}
              >
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
      <hr className='footer__divider' />
      <p className='footer__copyright'>© {new Date().getFullYear()} BPPM - All rights reserved</p>
    </div>
  );
};
