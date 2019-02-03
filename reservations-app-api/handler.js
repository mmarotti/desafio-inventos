const aws = require('aws-sdk')
const ses = new aws.SES()
const myEmail = "elmarotti@gmail.com"
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

function generateEmailParams () {
  // const { email, name, content } = JSON.parse(body)
  // console.log(email, name, content)
  // if (!(email && name && content)) {
  //   throw new Error('Missing parameters! Make sure to add parameters \'email\', \'name\', \'content\'.')
  // }

  return {
    Source: myEmail,
    Destination: { ToAddresses: [myEmail] },
    ReplyToAddresses: ["matheusmarotti@id.uff.br"],
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: 'Fala tu meno'
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Um pedido!`
      }
    }
  }
}

module.exports.send = async (event) => {
  try {
    const emailParams = generateEmailParams()
    const data = await ses.sendEmail(emailParams).promise()
    return generateResponse(200, data)
  } catch (err) {
    return generateError(500, err)
  }
}
