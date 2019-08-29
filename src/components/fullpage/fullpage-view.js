import React, {useState} from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import {Helmet} from 'react-helmet';
import SbEditable from 'storyblok-react';

import Center from './center';
import Footer from '../footer';
import FullpageNavigation from './navigation';
import Grid from './grid';
import Left from './left';
import Right from './right';
import {siteName} from '../../variables';
import SiteNavigation from '../navigation';
import {siteURL} from '../../variables';
import Text from './text';
import Video from './video';

const ComponentList = {
  'fullpage-center': Center,
  'fullpage-grid': Grid,
  'fullpage-left': Left,
  'fullpage-right': Right,
  'fullpage-text': Text,
  'fullpage-video': Video,
};

export default props => {
  let SEO = {
    title: `${siteName} - ${props.blok.seo_title}`,
    description: props.blok.seo_description,
    logo: 'https://res.cloudinary.com/studio-basilic-tropical/image/upload/BPPM/BPPM_logo.jpg',
    url: siteURL + props.pagePath,
  };

  const [active, setActive] = useState(0);
  const [fullpageApi, setFullpageApi] = useState(null);

  const sectionsClassName = 'fullpage__section';
  const sections = props.blok.sections.filter(section => {
    return typeof ComponentList[section.component] !== 'undefined' ? section : null;
  });

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
      <FullpageNavigation fullpageApi={fullpageApi} sections={sections} active={active} />
      <ReactFullpage
        className='fullpage'
        sectionSelector={`.${sectionsClassName}`}
        sectionsColor={[]}
        licenseKey={'YOUR_KEY_HERE'} // Get one from https://alvarotrigo.com/fullPage/pricing/
        easing='easeOutQuart'
        responsiveWidth={1080}
        onLeave={onLeave}
        scrollBar
        render={comp => {
          setFullpageApi(comp.fullpageApi);
          return (
            <ReactFullpage.Wrapper>
              {sections.map((section, index) => {
                const {title, text, button, link, image, images, video} = section;

                let className = sectionsClassName;
                className += section.component === 'fullpage-text' ? ' fp-auto-height' : '';

                return (
                  <SbEditable key={section._uid} content={section}>
                    <div className={className}>
                      {index === 0 && <SiteNavigation blok={props.navigation} />}
                      {// prettier-ignore
                      React.createElement(
                        ComponentList[section.component],
                        {index, title, text, button, link, image, images, video}
                      )}
                    </div>
                  </SbEditable>
                );
              })}
              <Footer className={`${sectionsClassName} fp-auto-height`} blok={props.navigation} />
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </>
  );

  // eslint-disable-next-line
  function onLeave(origin, destination, direction) {
    setActive(destination);
  }
};
