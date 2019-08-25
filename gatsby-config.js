module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: 'aRfTd3jtc279dSfFa6fziAtt',
        homeSlug: 'home',
        version: 'draft',
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: process.env.GA_TRACKING_ID,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `BPPM - Supply Chain Specialists`,
        short_name: `BPPM`,
        start_url: `/`,
        background_color: `#222222`,
        theme_color: `#e21e26`,
        display: `standalone`,
        icon: `src/favicon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
