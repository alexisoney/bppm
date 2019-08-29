import React, {useContext} from 'react';
import {Link} from 'gatsby';
import path from 'path';
import PropTypes from 'prop-types';

import Button from '../../button';
import {createNumber} from '../utils';
import {Img} from '../../cloudinary';
import {markdownToHTML} from '../../../utils';
import {PageTransitionContext} from '../../page-transition/page-transition';

const Grid = ({index, title, images, button, link}) => {
  const {navigate} = useContext(PageTransitionContext);

  return (
    <div className='fullpage-grid'>
      <p className='fullpage__index'>{createNumber(index)}</p>
      <h1 className='fullpage__title'>{markdownToHTML(title)}</h1>
      <div className='fullpage-grid__items'>
        {images &&
          images.map(item => {
            return (
              <Link
                to={path.normalize(`/${link.cached_url}/`)}
                onClick={e => navigate(e)}
                key={item._uid}
                className='fullpage-grid__item'
              >
                <Img
                  className='fullpage-grid__image'
                  url={item.image}
                  parameters='e_grayscale'
                  style={item.position ? {objectPosition: item.position[0]} : null}
                />
                <div className='fullpage-grid__gradient' />
                <p className='fullpage-grid__title'>{item.title}</p>
              </Link>
            );
          })}
      </div>
      <Button link={link}>{button}</Button>
    </div>
  );
};

Grid.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  images: PropTypes.array,
  button: PropTypes.string,
  link: PropTypes.object,
};

export default Grid;
