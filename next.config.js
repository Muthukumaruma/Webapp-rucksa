const webpack = require("webpack");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");

module.exports = withSass({
  // ---- DISABLE NEXT's FIle System Routing ---
  useFileSystemPublicRoutes: true,
  assetPrefix: "",
  //---- END ---

  // --- SASS START ---
  loader: "sass-loader",
  options: {
    sassOptions: {
      includePaths: ["sass"]
    }
  },
  // --- SASS END ---

  // --- NEXT CONFIG START ---
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || " http://api.rucksa.us/"
  }

  // --- NEXT CONFIG END ---
});
