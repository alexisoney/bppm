import React from 'react';
import SbEditable from 'storyblok-react';

import Components from '../components/components.js';
import config from '../../gatsby-config';

const loadStoryblokBridge = function(cb) {
  let sbConfigs = config.plugins.filter(item => {
    return item.resolve === 'gatsby-source-storyblok';
  });
  let sbConfig = sbConfigs.length > 0 ? sbConfigs[0] : {};
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `//app.storyblok.com/f/storyblok-latest.js?t=${sbConfig.options.accessToken}`;
  script.onload = cb;
  document.getElementsByTagName('head')[0].appendChild(script);
};

const getParam = function(val) {
  var result = '';
  var tmp = [];

  window.location.search
    .substr(1)
    .split('&')
    .forEach(function(item) {
      tmp = item.split('=');
      if (tmp[0] === val) {
        result = decodeURIComponent(tmp[1]);
      }
    });

  return result;
};

class StoryblokEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {story: null, globalNavi: {content: {}}, contactCTA: {content: {}}};
  }

  componentDidMount() {
    loadStoryblokBridge(() => {
      this.initStoryblokEvents();
    });
  }

  loadStory(payload) {
    window.storyblok.get(
      {
        slug: getParam('path'),
        version: 'draft',
      },
      data => {
        this.setState({story: data.story});
        this.loadGlovalNavi(data.story.lang);
        this.loadContactCTA(data.story.lang);
      }
    );
  }

  loadGlovalNavi(lang) {
    const language = lang === 'default' ? '' : lang + '/';
    window.storyblok.get(
      {
        slug: `${language}navigation`,
        version: 'draft',
      },
      data => {
        data.story.content.navigations_items.forEach(item => {
          if (item.link.cached_url === 'home') item.link.cached_url = '';
        });
        this.setState({globalNavi: data.story});
      }
    );
  }

  loadContactCTA(lang) {
    const language = lang === 'default' ? '' : lang + '/';
    window.storyblok.get(
      {
        slug: `${language}contact-cta`,
        version: 'draft',
      },
      data => {
        this.setState({contactCTA: data.story});
      }
    );
  }

  initStoryblokEvents() {
    this.loadStory({storyId: getParam('path')});

    let sb = window.storyblok;

    sb.on(['change', 'published'], payload => {
      this.loadStory(payload);
    });

    sb.on('input', payload => {
      if (this.state.story && payload.story.id === this.state.story.id) {
        payload.story.content = sb.addComments(payload.story.content, payload.story.id);
        this.setState({story: payload.story});
      }
    });

    sb.pingEditor(() => {
      if (sb.inEditor) {
        sb.enterEditmode();
      }
    });
  }

  render() {
    if (this.state.story == null || !this.state.globalNavi.content._uid || !this.state.contactCTA.content._uid) {
      return <div />;
    }

    let content = this.state.story.content;
    let globalNavi = this.state.globalNavi.content;
    let contactCTA = this.state.contactCTA.content;

    return (
      <SbEditable content={content}>
        <div>
          {React.createElement(Components(content.component), {
            key: content._uid,
            blok: content,
            navigation: globalNavi,
            contactCTA: contactCTA,
          })}
        </div>
      </SbEditable>
    );
  }
}

export default StoryblokEntry;
