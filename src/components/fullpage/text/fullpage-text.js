import React from 'react';
import Img from 'gatsby-image';
import {getFluidGatsbyImage} from 'gatsby-storyblok-image';
import PropTypes from 'prop-types';

import Button from '../../button';
import Footer from '../../footer';
import {createNumber} from '../utils';
import {markdownToHTML} from '../../../utils';

const Text = props => {
  const {align, background, footer, cta, index, isLast, link} = props;

  let componentClassName = 'fullpage-text';
  componentClassName += align[0] ? ` fullpage-text--${align[0]}` : '';
  componentClassName += background ? '' : ' fullpage-text--no-background';
  componentClassName += isLast ? ' fullpage-text--last' : '';

  const imgFluid = getFluidGatsbyImage(background, {maxWidth: 3840});

  const number = createNumber(index);
  const headline = markdownToHTML(props.headline);
  const description = markdownToHTML(props.description);

  return (
    <div className={componentClassName}>
      {imgFluid && <Img className='fullpage-text__image' fluid={imgFluid} style={{position: ''}} />}

      <div className='fullpage-text__wrapper'>
        <p className='fullpage-text__number'>{number}</p>
        <h1 className='fullpage-text__headline'>{headline}</h1>
        <div className='fullpage-text__content'>
          <p className='fullpage-text__description'>{description}</p>
          {cta && <Button link={link}>{cta}</Button>}
        </div>
      </div>

      {/* {isLast && <Footer className={``} blok={footer} />} */}
    </div>
  );
};

Text.propTypes = {
  align: PropTypes.array,
  background: PropTypes.string,
  cta: PropTypes.string,
  description: PropTypes.string,
  headline: PropTypes.string,
  index: PropTypes.number.isRequired,
};

export default Text;
