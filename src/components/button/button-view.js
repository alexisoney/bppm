import React, {useContext} from 'react';
import {Link} from 'gatsby';
import path from 'path';
import SbEditable from 'storyblok-react';

import {PageTransitionContext} from '../page-transition/page-transition';

export default props => {
  const {navigate} = useContext(PageTransitionContext);

  let buttonClassName = 'button';
  buttonClassName += props.className ? ` ${props.className}` : '';
  buttonClassName += props.blok ? ` button--centered` : '';
  buttonClassName += props.blok && props.blok.outlined ? ` button--outlined` : '';

  if (props.blok) {
    if (props.blok.link.url || props.blok.file) {
      const url = props.blok.link.url ? props.blok.link.url : props.blok.file;

      if (props.link && props.link.linktype === 'story') {
        return (
          <SbEditable content={props.blok}>
            <Link onClick={e => navigate(e)} className={buttonClassName} to={path.normalize(`/${url}/`)}>
              <span className='button__text'>{props.blok.text}</span>
            </Link>
          </SbEditable>
        );
      } else {
        return (
          <SbEditable content={props.blok}>
            <a className={buttonClassName} href={url} target='_blank' rel='noopener noreferrer'>
              <span className='button__text'>{props.blok.text}</span>
            </a>
          </SbEditable>
        );
      }
    } else {
      return <div className={buttonClassName}>{props.blok.text}</div>;
    }
  }

  if (props.link) {
    if (props.link.linktype === 'story') {
      const url = props.link.cached_url === 'home' ? '' : props.link.cached_url;

      return (
        <Link onClick={e => navigate(e)} className={buttonClassName} to={path.normalize(`/${url}/`)}>
          <span className='button__text'>{props.children}</span>
        </Link>
      );
    } else {
      return (
        <a className={buttonClassName} href={props.link.cached_url} target='_blank' rel='noopener noreferrer'>
          <span className='button__text'>{props.children}</span>
        </a>
      );
    }
  }

  return <div className={buttonClassName}>{props.children}</div>;
};
