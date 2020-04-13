const postgres = require('postgres')

exports.handler = async (event) => {
  const answersFor = event.queryStringParameters.for
  console.log(`Getting answers for ${answersFor}`)
  const sql = postgres({
    ssl: {
      rejectUnauthorized: false,
    },
  })

  //const pgresult = await sql`SELECT * FROM answers ORDER BY createdat DESC LIMIT 5;`
  const pgresult = await sql`
    SELECT
        DISTINCT ON (postedby)
        postedby,
        who,
        answer,
        createdat
    FROM
        answers
    WHERE
        createdat > NOW() - INTERVAL '10 minutes'
        AND
        who = ${ answersFor }
    ORDER BY
        postedby, createdat DESC
    LIMIT
        6
    `
  //console.log(pgresult)
  sql.end({ timeout: 2 })

  return {
    statusCode: 200,
    ///worked: body: JSON.stringify(event.body)
    //body: JSON.stringify(Array.from({length: 5}, () => Math.floor(Math.random() * 40))), // You must return a string
    body: JSON.stringify(pgresult), // You must return a string
  }
}
