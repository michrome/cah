exports.handler = async event => {
    3  const subject = event.queryStringParameters.name || 'World'
    4  return {
    5    statusCode: 200,
    6    body: `Hello ${subject}!`,
    7  }
    8}