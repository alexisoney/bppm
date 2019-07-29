module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: 'aRfTd3jtc279dSfFa6fziAtt',
        homeSlug: 'home',
        version: 'draft',
      },
    },
    'gatsby-plugin-react-helmet',
  ],
  siteMetadata: {
    title: 'My page',
  },
};
