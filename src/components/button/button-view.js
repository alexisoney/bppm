import React from 'react';
import SbEditable from 'storyblok-react';

export default props => {
  let buttonClassName = 'button';
  buttonClassName += props.className ? ` ${props.className}` : '';
  buttonClassName += props.blok ? ` button--centered` : '';
  buttonClassName += props.blok && props.blok.outlined ? ` button--outlined` : '';

  if (props.blok) {
    const Wrapper = ({children}) => (
      <SbEditable content={props.blok}>
        <div className={buttonClassName}>{children}</div>
      </SbEditable>
    );

    if (props.blok.link.url || props.blok.file) {
      const url = props.blok.link.url ? props.blok.link.url : props.blok.file;
      return (
        <Wrapper>
          <a className='button__link' href={url} target='_blank' rel='noopener noreferrer'>
            {props.blok.text}
          </a>
        </Wrapper>
      );
    } else {
      return <Wrapper>{props.blok.text}</Wrapper>;
    }
  }

  return <div className={buttonClassName}>{props.children}</div>;
};
