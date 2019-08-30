import React, {useEffect, useRef} from 'react';
import {TweenLite, Power3} from 'gsap';
import SbEditable from 'storyblok-react';

import {Img} from '../cloudinary';
import linkedinIcon from '../../assets/icon_linkedin.svg';

export default props => {
  const {darkmode, description, linkedin, name, picture, strengths} = props.blok;

  const component = useRef();

  if (typeof IntersectionObserver !== 'undefined') {
    const imageObserver = new IntersectionObserver(
      (entry, observer) => {
        if (entry[0].isIntersecting) {
          TweenLite.to(entry[0].target, 0.8, {x: 0, opacity: 1, ease: Power3.easeOut});
          observer.unobserve(entry[0].target);
        } else {
          const x = darkmode ? -50 : 50;
          TweenLite.to(entry[0].target, 0.8, {x, opacity: 0, ease: Power3.easeOut});
        }
      },
      {threshold: 0.3}
    );

    const strenghtsObserver = new IntersectionObserver(
      (entry, observer) => {
        if (entry[0].isIntersecting) {
          TweenLite.to(entry[0].target, 0.8, {y: 0, opacity: 1, ease: Power3.easeOut});
          observer.unobserve(entry[0].target);
        } else {
          TweenLite.to(entry[0].target, 0.8, {y: 50, opacity: 0, ease: Power3.easeOut});
        }
      },
      {threshold: 0.5}
    );

    useEffect(() => {
      const image = component.current.querySelector('.team-member__picture');
      const strenghts = component.current.querySelector('.team-member__strengths');

      imageObserver.observe(image);
      strenghtsObserver.observe(strenghts);

      return () => {
        imageObserver.unobserve(image);
        strenghtsObserver.unobserve(strenghts);
      };
    });
  }

  return (
    <SbEditable content={props.blok}>
      <div ref={component} className={`team-member ${darkmode && 'team-member--dark'}`}>
        <div className='team-member__content'>
          <h3 className='team-member__name'>{name}</h3>
          <hr className='team-member__divider' />
          <p className='team-member__description'>{description}</p>
          <a href={linkedin.url} target='_blank' rel='noopener noreferrer'>
            <img className='team-member__social-icon' src={linkedinIcon} alt='Linkedin' />
          </a>
        </div>
        <Img className='team-member__picture' url={picture} sizes='(max-width: 800px) 100vw, 50vw' />
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
