import React from 'react';
import SbEditable from 'storyblok-react';

import {Img} from '../cloudinary';
import linkedinIcon from '../../assets/icon_linkedin.svg';

export default props => {
  const {darkmode, description, linkedin, name, picture, strengths} = props.blok;

  return (
    <SbEditable content={props.blok}>
      <div className={`team-member ${darkmode && 'team-member--dark'}`}>
        <div className='team-member__content'>
          <h3 className='team-member__name'>{name}</h3>
          <hr className='team-member__divider' />
          <p className='team-member__description'>{description}</p>
          <a href={linkedin.url} target='_blank' rel='noopener noreferrer'>
            <img className='team-member__social-icon' src={linkedinIcon} alt='Linkedin' />
          </a>
        </div>
        <Img className='team-member__picture' url={picture} />
        <ul className='team-member__strengths'>
          {strengths.map(category => (
            <li className='team-member__strength' key={category._uid}>
              {category.title}
              <ul className='team-member__strength-items'>
                {category.items.map(item => (
                  <li key={item._uid} className='team-member__strength-item'>
                    {item.text}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </SbEditable>
  );
};
