import React from 'react';
import {createNumber} from '../utils';

export default ({fullpageApi, sections, active}) => {
  if (!fullpageApi) return null;

  const {moveTo} = fullpageApi;

  let darkBackground = false;
  if (
    active &&
    (active.isLast ||
      (sections[active.index] && ['fullpage-grid', 'fullpage-center'].includes(sections[active.index].component)))
  ) {
    darkBackground = true;
  }

  let itemsClassName;
  itemsClassName = 'fullpage-navigation__items';
  itemsClassName += darkBackground ? ' fullpage-navigation__items--light' : '';

  let wrapperStyle = {};
  if (active.item) {
    wrapperStyle = {
      position: 'absolute',
      top: `${active.item.offsetTop + active.item.offsetHeight / 2}px`,
    };
  }

  return (
    <div className='fullpage-navigation' style={wrapperStyle}>
      <ul className={itemsClassName}>
        {sections.map((section, index) => {
          const isActive = index === active.index;
          const showFooter = active.index === sections.length && index === sections.length - 1;

          let itemClassName;
          itemClassName = 'fullpage-navigation__item';
          itemClassName += isActive ? ' fullpage-navigation__item--active' : '';

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
