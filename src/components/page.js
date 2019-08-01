import React from 'react';
import Components from './components.js';

import ContactCTA from './contact-cta';
import Footer from './footer';
import Navigation from './navigation';
import PageNavigation from './page-navigation';

const Page = props => {
  let titles = [];

  if (props.blok.body) {
    let titleIndex = 0;
    props.blok.body.forEach(blok => {
      if (blok.component === 'title') {
        if (blok.no_index) return null;

        ++titleIndex;
        blok.index = titleIndex < 10 ? `0${titleIndex}` : titleIndex;
        titles.push({
          id: titleIndex,
          text: blok.text,
          link: blok.index,
        });
      }
    });

    props.blok.body.forEach(blok => {
      if (blok.component === 'hero') {
        blok.anchors = titles;
      }
    });
  }

  let hasContactForm;
  if (props.blok.body) {
    hasContactForm = props.blok.body.findIndex(blok => blok.component === 'contactForm') !== -1;
  }

  return (
    <>
      <Navigation blok={props.navigation} />
      {/* {titles.length > 0 && <PageNavigation titles={titles} />} */}
      {props.blok.body &&
        props.blok.body.map(blok =>
          React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok,
          })
        )}
      {!hasContactForm && <ContactCTA blok={props.contactCTA} />}
      <Footer blok={props.navigation} />
    </>
  );
};

export default Page;
