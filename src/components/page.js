import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';

import Components from './components.js';
import ContactCTA from './contact-cta';
import Footer from './footer';
import Navigation from './navigation';
import {siteName, siteURL} from '../variables';

const Page = props => {
  let SEO = {
    title: `${siteName} - ${props.blok.seo_title}`,
    description: props.blok.seo_description,
    logo: 'https://res.cloudinary.com/studio-basilic-tropical/image/upload/BPPM/BPPM_logo.jpg',
    url: siteURL + props.pagePath,
  };

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

  useEffect(() => {
    if (typeof window !== undefined) {
      document.querySelector('html').style.scrollBehavior = 'smooth';
    }
    return () => {
      if (typeof window !== undefined) {
        document.querySelector('html').style.scrollBehavior = '';
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{SEO.title}</title>
        <meta name='description' content={SEO.description} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={SEO.title} />
        <meta property='og:description' content={SEO.description} />
        <meta property='og:url' content={SEO.url} />
        <meta property='og:image' content={SEO.logo} />
        <meta property='og:image:secure_url' content={SEO.logo} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:site_name' content={siteName} />
        <meta name='twitter:image:alt' content={SEO.title} />
      </Helmet>
      <Navigation blok={props.navigation} />
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
