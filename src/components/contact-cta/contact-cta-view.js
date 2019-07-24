import React from 'react';

import Button from '../button';

export default props => {
  const {catchline, cta} = props.blok;

  return (
    <div className='contact-cta'>
      <h2 className='contact-cta__catchline'>{catchline}</h2>
      <hr className='contact-cta__divider' />
      <Button className='contact-cta__cta'>{cta}</Button>
    </div>
  );
};
