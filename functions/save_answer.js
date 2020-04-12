exports.handler = async (event) => {
  //     const NetlifyAPI = require('netlify')
  // const client = new NetlifyAPI('e783c7165042462942370fa9a36f19e9e05ff07523f7e67f79ddfed504047092')
  // const sites = await client.listSites()
  // const submissions = await client.listSiteSubmissions({site_id: '4f2e921e-d119-4f58-b481-0251cd59e350'})
  //     const subject = event.queryStringParameters.name || 'World'
  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify(submissions),
  //     }
  return {
    statusCode: 200,
    body: JSON.stringify(JSON.parse(event.body)),
  }
}
