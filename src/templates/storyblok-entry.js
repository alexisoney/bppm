import React from 'react';

import Components from '../components/components.js';
import '../styles/styles.scss';

class StoryblokEntry extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (state.story.uuid === props.pageContext.story.uuid) {
      return null;
    }

    return StoryblokEntry.prepareStory(props);
  }

  static prepareStory(props) {
    const story = Object.assign({}, props.pageContext.story);
    const navigation = Object.assign({}, props.pageContext.navigation);
    const contactCTA = Object.assign({}, props.pageContext.contactCTA);
    story.content = JSON.parse(story.content);
    navigation.content = JSON.parse(navigation.content);
    navigation.content.navigations_items.forEach(item => {
      if (item.link.cached_url === 'home') item.link.cached_url = '';
    });
    contactCTA.content = JSON.parse(contactCTA.content);

    return {story, navigation, contactCTA};
  }

  constructor(props) {
    super(props);
    this.state = StoryblokEntry.prepareStory(props);
  }

  render() {
    let content = this.state.story.content;
    let navigation = this.state.navigation.content;
    let contactCTA = this.state.contactCTA.content;

    return (
      <>
        {React.createElement(Components(content.component), {
          key: content._uid,
          blok: content,
          navigation: navigation,
          contactCTA: contactCTA,
        })}
      </>
    );
  }
}

export default StoryblokEntry;
