const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const parser = require('fast-xml-parser');

const cache = new NodeCache();

exports.createPages = async ({actions: {createPage}}) => {
  let data = cache.get('yield');
  if (data == undefined) {
    data = await retrieveData();
    cache.set('yield', data, 86400 / 2);
  }

  createPage({
    path: '/',
    component: require.resolve('./src/templates/index.js'),
    context: {data},
  });
};

async function retrieveData() {
  const date = new Date();
  const url = `https://data.treasury.gov/feed.svc/DailyTreasuryYieldCurveRateData?$filter=month(NEW_DATE) eq ${date.getMonth() +
    1} and year(NEW_DATE) eq ${date.getFullYear()}`;

  return await fetch(url, {
    method: 'GET',
    mode: 'cors',
  })
    .then(res => res.text())
    .then(text => parseData(text));
}

function parseData(text) {
  if (parser.validate(text) === true) {
    const data = parser.parse(text);
    return data;
  }
}
