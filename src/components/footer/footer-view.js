import React from 'react';
import {Link} from 'gatsby';

import logoSVG from '../../assets/logo_white.svg';

export default props => {
  if (!props.blok.navigations_items) return null;

  return (
    <div className={`footer ${props.className}`}>
      <img className='footer__logo' src={logoSVG} alt='BPPM' />
      <ul className='footer__items'>
        {props.blok.navigations_items.map(item => {
          if (item.component !== 'link' && item.link.linktype !== 'story') return null;
          return (
            <li key={item._uid} className='footer__item'>
              <Link className='footer__link' to={`/${item.link.cached_url}`}>
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
