import React from 'react';
import Components from './components.js';

import ContactCTA from './contact-cta';
import Footer from './footer';
import Navigation from './navigation';

const Page = props => (
  <>
    <Navigation blok={props.navigation} />
    {props.blok.body &&
      props.blok.body.map(blok =>
        React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok,
        })
      )}
    <ContactCTA blok={props.contactCTA} />
    <Footer blok={props.navigation} />
  </>
);

export default Page;
