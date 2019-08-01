import React, {useRef} from 'react';

export default props => {
  const items = useRef();

  function handleClick(id) {
    const el = items.current;
    console.log(el.getElementById('01'));
    // if (items.current) items.current.getElementByID(id).scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div className='page-navigation'>
      <ul className='page-navigation__items' ref={items}>
        {props.titles.map(title => {
          return (
            <li key={title.id} className='page-navigation__item' onClick={() => handleClick(title.link)}>
              <span className='page-navigation__anchor'>{title.text}</span>
              <span className='page-navigation__number'>{title.link}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
