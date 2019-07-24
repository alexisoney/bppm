import React, {useState} from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import SbEditable from 'storyblok-react';

import Footer from '../footer';
import FullpageNavigation from './navigation';
import SiteNavigation from '../navigation';
import Text from './text';
import Video from './video';

const sectionsClassName = 'fullpage__section';

export default props => {
  const [fullpageApi, setFullpageApi] = useState(null);
  const [active, setActive] = useState(0);

  const sections = props.blok.sections.filter(section => (section.component === 'fullpage__section' ? section : null));

  // eslint-disable-next-line
  function onLeave(origin, destination, direction) {
    setActive(destination.index);
  }

  return (
    <>
      <FullpageNavigation fullpageApi={fullpageApi} sections={sections} active={active} />
      <ReactFullpage
        className='fullpage'
        sectionSelector={`.${sectionsClassName}`}
        sectionsColor={[]}
        licenseKey={'YOUR_KEY_HERE'} // Get one from https://alvarotrigo.com/fullPage/pricing/
        responsiveWidth={1200}
        // responsiveHeight={1000}
        onLeave={onLeave}
        render={comp => {
          setFullpageApi(comp.fullpageApi);
          return (
            <ReactFullpage.Wrapper>
              {sections.map((section, index) => {
                const isFirst = index === 0;
                const isLast = index === sections.length - 1;

                let sectionClassName = sectionsClassName;
                sectionClassName += !section.video && !section.background ? ' fp-auto-height' : '';
                // sectionClassName += !section.video && !section.background && !isLast ? ' fp-auto-height' : '';

                return (
                  <SbEditable key={section._uid} content={section}>
                    <div className={sectionClassName}>
                      {isFirst && <SiteNavigation blok={props.navigation} />}
                      {section.video && <Video {...section} />}
                      {!section.video && <Text {...section} index={index} isLast={isLast} footer={props.navigation} />}
                      {/* {isLast && <Footer className={``} blok={props.navigation} />} */}
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
};
