const aws = require('aws-sdk')
const ses = new aws.SES()
const myEmail = "rayssa@inventosdigitais.com.br"
const myDomain = "*"

function generateResponse (code, payload) {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': myDomain,
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(payload)
  }
}

function generateError (code, err) {
  console.log(err)
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': myDomain,
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(err.message)
  }
}

function generateEmailParams (body) {

  const { client_name, email, minion, phone } = JSON.parse(body)

  return {
    Source: "elmarotti@gmail.com",
    Destination: { ToAddresses: [myEmail, "elmarotti@gmail.com"] },
    ReplyToAddresses: ["elmarotti@gmail.com"],
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Nova reserva do minion ${minion} pelo cliente ${client_name} - ${email} - ${phone}`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Novo pedido de ${email}`
      }
    }
  }
}

module.exports.send = async (event) => {
  try {
    const emailParams = generateEmailParams(event.body)
    const data = await ses.sendEmail(emailParams).promise()
    return generateResponse(200, data)
  } catch (err) {
    return generateError(500, err)
  }
}
