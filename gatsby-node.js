const path = require('path');

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions;

  return new Promise((resolve, reject) => {
    const storyblokEntry = path.resolve('src/templates/storyblok-entry.js');

    resolve(
      graphql(
        `
          {
            stories: allStoryblokEntry {
              edges {
                node {
                  id
                  lang
                  name
                  created_at
                  uuid
                  slug
                  field_component
                  full_slug
                  content
                  is_startpage
                  parent_id
                  group_id
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const entries = result.data.stories.edges;
        const contents = entries.filter(entry => {
          return entry.node.field_component !== 'navigation' && entry.node.field_component !== 'contactCTA';
        });

        contents.forEach((entry, index) => {
          const pagePath = entry.node.full_slug === 'home' ? '' : `${entry.node.full_slug}/`;

          const navigation = entries.filter(globalEntry => {
            return globalEntry.node.field_component === 'navigation' && globalEntry.node.lang == entry.node.lang;
          });
          if (!navigation.length) {
            throw new Error(
              'The global navigation item has not been found. Please create a content item with the content type navigation in Storyblok.'
            );
          }

          const contactCTA = entries.filter(globalEntry => {
            return globalEntry.node.field_component === 'contactCTA' && globalEntry.node.lang == entry.node.lang;
          });

          createPage({
            path: `/${pagePath}`,
            component: storyblokEntry,
            context: {
              navigation: navigation[0].node,
              story: entry.node,
              contactCTA: contactCTA[0].node,
            },
          });
        });
      })
    );
  });
};
