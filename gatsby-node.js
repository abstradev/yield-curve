const fetch = require("node-fetch")
const parser = require("fast-xml-parser")

exports.createPages = async ({ actions: { createPage } }) => {
  const date = new Date();
  const url = `https://data.treasury.gov/feed.svc/DailyTreasuryYieldCurveRateData?$filter=month(NEW_DATE) eq ${date.getMonth() + 1} and year(NEW_DATE) eq ${date.getFullYear()}`;

  await fetch(url, {
    method: "GET",
    mode: "cors",
  })
  .then(res => res.text())
  .then(text => {
    const data = parseData(text)
    createPage({
      path: "/",
      component: require.resolve("./src/templates/index.js"),
      context: { data },
    })
  })
  .catch(err => {
    const data = parseData(require('./data/DailyTreasuryYieldCurveRateData'));
    createPage({
      path: "/",
      component: require.resolve('./src/templates/index.js'),
      context: { data, error: err }
    });
  });
}

function parseData(text) {
  if (parser.validate(text) === true) {
    const data = parser.parse(text)
    return data
  }
}
