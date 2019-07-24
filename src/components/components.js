import ContactCTA from './contact-cta';
import Fullpage from './fullpage';
import Hero from './hero';
import Navigation from './navigation';
import Page from './page';
import ComponentNotFound from './component_not_found';

const ComponentList = {
  contactCTA: ContactCTA,
  fullpage: Fullpage,
  hero: Hero,
  page: Page,
  navigation: Navigation,
};

const Components = type => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound;
  }
  return ComponentList[type];
};

export default Components;
