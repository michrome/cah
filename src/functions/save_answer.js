const queryString = require('query-string')
const postgres = require('postgres')

exports.handler = async (event) => {
  const parsed = queryString.parse(event.body)
  console.log(`To: ${parsed.who}`)
  console.log(`From: ${parsed.postedBy}`)
  console.log(`Answer: ${parsed.answer}`)
  const referer = event.headers.referer

  const sql = postgres({
    ssl: {
      rejectUnauthorized: false,
    },
  })
  const pgresult = await sql`INSERT INTO answers (who, postedby, answer) VALUES (${parsed.who}, ${parsed.postedBy}, ${parsed.answer})`
  console.log(pgresult)
  sql.end({ timeout: 2 })

  return {
    statusCode: 302,
    ///worked: body: JSON.stringify(event.body)
    body: JSON.stringify(event), // You must return a string
    headers: {
      Location: referer,
    },
  }
}
