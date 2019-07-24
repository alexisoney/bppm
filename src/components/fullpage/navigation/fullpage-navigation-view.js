import React from 'react';
import {createNumber} from '../utils';

export default ({fullpageApi, sections, active}) => {
  if (!fullpageApi) return null;

  const {moveTo} = fullpageApi;

  let darkBackground = false;
  if (sections[active] && !sections[active].align[0] && sections[active].background) {
    darkBackground = true;
  }

  let itemsClassName;
  itemsClassName = 'fullpage-navigation__items';
  itemsClassName += darkBackground ? ' fullpage-navigation__items--light' : '';

  return (
    <div className='fullpage-navigation'>
      <ul className={itemsClassName}>
        {sections.map((section, index) => {
          const isActive = index === active;
          const showFooter = active === sections.length && index === sections.length - 1;

          let itemClassName;
          itemClassName = 'fullpage-navigation__item';
          itemClassName += isActive || showFooter ? ' fullpage-navigation__item--active' : '';

          return (
            <li key={section._uid} className={itemClassName} onClick={() => moveTo(index + 1)}>
              <span className='fullpage-navigation__anchor'>{section.anchor}</span>
              <span className='fullpage-navigation__number'>{createNumber(index)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
