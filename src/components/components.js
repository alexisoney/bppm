import React from 'react';

import ContactCTA from './contact-cta';
import Fullpage from './fullpage';
import Hero from './hero';
import Kicker from './kicker';
import Navigation from './navigation';
import Page from './page';
import Text from './text';
import Title from './title';

const ComponentNotFound = props => <div>Component {props.blok.component} is not defined. Add it to components.js</div>;

const ComponentList = {
  contactCTA: ContactCTA,
  fullpage: Fullpage,
  hero: Hero,
  kicker: Kicker,
  page: Page,
  text: Text,
  title: Title,
  navigation: Navigation,
};

const Components = type => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound;
  }
  return ComponentList[type];
};

export default Components;
