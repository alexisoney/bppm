import React from 'react';
import path from 'path';

const cloudinaryURL = 'https://res.cloudinary.com/studio-basilic-tropical/image/upload/';
const cloudinaryFolder = 'BPPM';

export const Img = props => {
  if (props.url && isCloudinaryURL(props.url)) {
    const breakpoints = [800, 1080, 1440, 1920, 2560];
    const fileName = path.basename(props.url, path.extname(props.url));
    const parameters = props.parameters ? props.parameters.toString() : '';
    const sizes = props.sizes || '100vw';

    let webpSet = '';
    let jpgSet = '';
    let defaultSrc = '';

    breakpoints.forEach((size, index) => {
      webpSet += getURL(fileName, 'webp', size, parameters);
      jpgSet += getURL(fileName, 'jpg', size, parameters);

      if (index === 0) defaultSrc = getURL('jpg', size).split(' ')[0];
    });

    return (
      <div className={props.className}>
        <picture className='cloudinary'>
          <source type='image/webp' sizes={sizes} srcSet={webpSet} />
          <img
            className='cloudinary__image'
            alt={props.alt || ''}
            sizes={sizes}
            srcSet={jpgSet}
            src={defaultSrc}
            style={props.style}
          />
        </picture>
      </div>
    );
  }

  return null;
};

function isCloudinaryURL(url) {
  return url.split(cloudinaryURL)[1] !== undefined;
}

function getURL(fileName, ext, size, parameters) {
  const parameter = normalizeParameter(`c_fit,f_auto,q_80,w_${size},${parameters}`);
  const url = path.normalize(`${cloudinaryURL}/${parameter}/${cloudinaryFolder}/${fileName}.${ext} ${size}w,`);

  return url;

  function normalizeParameter(options) {
    return options.replace(/,,/g, ',').replace(/(^,|,$)/g, '');
  }
}
