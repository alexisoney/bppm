import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../button';
import {Img} from '../../cloudinary';
import {createNumber} from '../utils';
import {markdownToHTML} from '../../../utils';

const Grid = ({index, title, images, button, link}) => (
  <div className='fullpage-grid'>
    <p className='fullpage__index'>{createNumber(index)}</p>
    <h1 className='fullpage__title'>{markdownToHTML(title)}</h1>
    <div className='fullpage-grid__items'>
      {images &&
        images.map(item => {
          return (
            <div key={item._uid} className='fullpage-grid__item'>
              <Img
                className='fullpage-grid__image'
                url={item.image}
                parameters='e_grayscale'
                style={item.position ? {objectPosition: item.position[0]} : null}
              />
              <p className='fullpage-grid__title'>{item.title}</p>
            </div>
          );
        })}
    </div>
    <Button link={link}>{button}</Button>
  </div>
);

Grid.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  images: PropTypes.array,
  button: PropTypes.string,
  link: PropTypes.object,
};

export default Grid;
