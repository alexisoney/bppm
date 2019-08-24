import React from 'react';
import Img from 'gatsby-image';
import {getFluidGatsbyImage} from 'gatsby-storyblok-image';
import ReactMarkdown from 'react-markdown';
import SbEditable from 'storyblok-react';

export default props => {
  const imgFluid = getFluidGatsbyImage(props.blok.image, {maxWidth: 1000});

  return (
    <SbEditable content={props.blok}>
      <div className='map'>
        {imgFluid && (
          <a className='map__image' href={props.blok.link.url} target='_blank' rel='noopener noreferrer'>
            <Img fluid={imgFluid} />
          </a>
        )}
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
