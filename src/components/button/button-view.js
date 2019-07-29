import React from 'react';
import {Link} from 'gatsby';
import SbEditable from 'storyblok-react';

export default props => {
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
            <Link className='button' to={url}>
              {props.blok.text}
            </Link>
          </SbEditable>
        );
      } else {
        return (
          <SbEditable content={props.blok}>
            <a className='button' href={url} target='_blank' rel='noopener noreferrer'>
              {props.blok.text}
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
      return (
        <Link className='button' to={`/${props.link.cached_url}`}>
          {props.children}
        </Link>
      );
    } else {
      return (
        <a className='button' href={props.link.cached_url} target='_blank' rel='noopener noreferrer'>
          {props.children}
        </a>
      );
    }
  }

  return <div className={buttonClassName}>{props.children}</div>;
};
