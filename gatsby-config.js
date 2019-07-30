module.exports = {
  siteMetadata: {
    title: `Yield Curve: Short/Long Term Bonds and Interest Rates`,
    description: `Find out how the yield curve can predict the market (and how accurate it's been in the past)!`,
    author: `@abstra-llc`,
    keywords: 'inverted yield curve, interest rates, recession 2019, bonds, equity, yield curve',
    lang: 'en'
  },
  plugins: [
    `gatsby-plugin-top-layout`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: "UA-144841097-1",
        head: true
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: 'app-invertedyieldcurve-net',
        acl: null
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Yield Curve: Short/Long Term Bonds and Interest Rates',
        short_name: 'Yield Curve',
        description: `Find out how the yield curve can predict the market (and how accurate it's been in the past)!`,
        start_url: '/',
        background_color: '#C4DBE0',
        lang: 'en',
        theme_color: '#0C6980',
        display: 'standalone',
        icon: 'src/images/icon.svg'
      }
    },
    'gatsby-plugin-offline'
  ],
}
