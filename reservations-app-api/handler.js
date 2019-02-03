const aws = require('aws-sdk')
aws.config.update({
    accessKeyId: "AKIAJJWYMT6YT5TH3E2Q",
    secretAccessKey: "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",
    region: "us-east-2"
  });
const ses = new aws.SES()

function generateResponse (code, payload) {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(payload)
  }
}

function generateError (code, err) {
  console.log(err.msg)
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(err.message)
  }
}

// function generateEmailParams (body) {
//   const { email, name, content } = JSON.parse(body)
//   console.log(email, name, content)
//   if (!(email && name && content)) {
//     throw new Error('Missing parameters! Make sure to add parameters \'email\', \'name\', \'content\'.')
//   }
//
//   return {
//     Source: myEmail,
//     Destination: { ToAddresses: [myEmail] },
//     ReplyToAddresses: [email],
//     Message: {
//       Body: {
//         Text: {
//           Charset: 'UTF-8',
//           Data: `Messagem enviada pelo email ${email} por ${name} \nPedido: ${content}`
//         }
//       },
//       Subject: {
//         Charset: 'UTF-8',
//         Data: `Um pedido do ${myDomain}!`
//       }
//     }
//   }
// }

export async function main (){
  try {
    const emailParams = {
        Source: "elmarotti@gmail.com",
        Destination: { ToAddresses: "elmarotti@gmail.com" },
        ReplyToAddresses: "matheusmarotti@id.uff.br",
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: `Olá`
            }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: `Um pedido!`
          }
        }
      }
    const data = await ses.sendEmail(emailParams).promise()
    return generateResponse(200, data)
  } catch (err) {
    return generateError(500, err)
  }
}
