import React from 'react';
import ReactMarkdown from 'react-markdown';
import SbEditable from 'storyblok-react';

import {Img} from '../cloudinary';

export default props => {
  return (
    <SbEditable content={props.blok}>
      <div className='map'>
        <a className='map__image' href={props.blok.link.url} target='_blank' rel='noopener noreferrer'>
          <Img url={props.blok.image} />
        </a>
        <div className='map__content'>
          <p className='map__title'>{props.blok.address_title}</p>
          <p className='map__text'>
            <ReactMarkdown allowedTypes={['break', 'text']} unwrapDisallowed={true}>
              {props.blok.address}
            </ReactMarkdown>
          </p>
          <p className='map__title'>{props.blok.phone_title}</p>
          <p className='map__text'>
            <ReactMarkdown allowedTypes={['break', 'text']} unwrapDisallowed={true}>
              {props.blok.phone}
            </ReactMarkdown>
          </p>
        </div>
      </div>
    </SbEditable>
  );
};
