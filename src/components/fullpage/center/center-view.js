import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../button';
import {Img} from '../../cloudinary';
import {createNumber} from '../utils';
import {markdownToHTML} from '../../../utils';

const Center = ({index, title, text, button, link, image}) => (
  <div className='fullpage-center'>
    <Img className='fullpage-center__image' url={image} parameters='e_grayscale' />

    <div className='fullpage-center__wrapper'>
      <p className='fullpage__index'>{createNumber(index)}</p>
      <h1 className='fullpage__title'>{markdownToHTML(title)}</h1>
      <div className='fullpage-center__content'>
        <p className='fullpage__text'>{markdownToHTML(text)}</p>
        <Button link={link}>{button}</Button>
      </div>
    </div>
  </div>
);

Center.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string,
  button: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
};

export default Center;
