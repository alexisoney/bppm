import React from 'react';
import SbEditable from 'storyblok-react';

import Components from '../components';

export default props => {
  return (
    <SbEditable content={props.blok}>
      <div className='grid'>
        {props.blok.columns.map(blok => {
          return (
            <div key={blok._uid} className='grid__column'>
              {React.createElement(Components(blok.component), {
                blok: blok,
              })}
            </div>
          );
        })}
      </div>
    </SbEditable>
  );
};
