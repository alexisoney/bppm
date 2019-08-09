import React, {useState} from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import SbEditable from 'storyblok-react';

import Center from './center';
import Footer from '../footer';
import FullpageNavigation from './navigation';
import Grid from './grid';
import Left from './left';
import Right from './right';
import SiteNavigation from '../navigation';
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
  const sectionsClassName = 'fullpage__section';

  const sections = props.blok.sections.filter(section => {
    return typeof ComponentList[section.component] !== 'undefined' ? section : null;
  });

  const [active, setActive] = useState(0);
  const [fullpageApi, setFullpageApi] = useState(null);

  return (
    <>
      <FullpageNavigation fullpageApi={fullpageApi} sections={sections} active={active} />
      <ReactFullpage
        className='fullpage'
        sectionSelector={`.${sectionsClassName}`}
        sectionsColor={[]}
        licenseKey={'YOUR_KEY_HERE'} // Get one from https://alvarotrigo.com/fullPage/pricing/
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
