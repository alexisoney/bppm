import React from 'react';

import ContactCTA from './contact-cta';
import Fullpage from './fullpage';
import Grid from './grid';
import Hero from './hero';
import IconAndTitle from './icon-and-title';
import Kicker from './kicker';
import ListDots from './list-dots';
import ListPanel from './list-panel';
import Navigation from './navigation';
import Page from './page';
import TeamMember from './team-member';
import Text from './text';
import Title from './title';

const ComponentNotFound = props => <div>Component {props.blok.component} is not defined. Add it to components.js</div>;

const ComponentList = {
  contactCTA: ContactCTA,
  fullpage: Fullpage,
  grid: Grid,
  hero: Hero,
  iconAndTitle: IconAndTitle,
  kicker: Kicker,
  listDots: ListDots,
  listPanel: ListPanel,
  page: Page,
  teamMember: TeamMember,
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
