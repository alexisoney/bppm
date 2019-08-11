import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../button';
import {Img} from '../../cloudinary';
import {createNumber} from '../utils';
import {markdownToHTML} from '../../../utils';

const Left = ({index, title, text, button, link, image}) => (
  <div className='fullpage-left'>
    <Img className='fullpage-left__image' url={image} parameters='e_grayscale' />

    <div className='fullpage-left__wrapper'>
      <p className='fullpage__index'>{createNumber(index)}</p>
      <h1 className='fullpage__title'>{markdownToHTML(title)}</h1>
      <div className='fullpage-left__content'>
        <p className='fullpage__text'>{markdownToHTML(text)}</p>
        <Button link={link}>{button}</Button>
      </div>
    </div>
  </div>
);

Left.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string,
  button: PropTypes.string,
  link: PropTypes.object,
  image: PropTypes.string,
};

export default Left;
