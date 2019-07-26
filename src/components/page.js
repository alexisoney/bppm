import React from 'react';
import Components from './components.js';

import ContactCTA from './contact-cta';
import Footer from './footer';
import Navigation from './navigation';

const Page = props => {
  if (props.blok.body) {
    let titles = [];
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

  return (
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
};

export default Page;
