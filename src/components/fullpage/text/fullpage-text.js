import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../button';
import {createNumber} from '../utils';
import {markdownToHTML} from '../../../utils';

const Center = ({index, title, button, link}) => (
  <div className='fullpage-text'>
    <p className='fullpage__index'>{createNumber(index)}</p>
    <h1 className='fullpage__title'>{markdownToHTML(title)}</h1>
    <Button link={link}>{button}</Button>
  </div>
);

Center.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  button: PropTypes.string,
  link: PropTypes.string,
};

export default Center;
