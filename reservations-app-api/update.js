import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "reservations",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      reservationId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET client_name = :client_name, email = :email, phone = :phone, minion = :minion",
    ExpressionAttributeValues: {
      ":client_name": data.client_name || null,
      ":email": data.email || null,
      ":phone": data.phone || null,
      ":minion": data.minion || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    console.log(e)
    return failure({ status: false });
  }
}












$ npx aws-api-gateway-cli-test --username='admin@minions.com' --password='banana123!' --user-pool-id='us-east-2_ciR8PSm7C' --app-client-id='ikvoqnhpfnqra05pkm7qfcjnh' --cognito-region='us-east-2' --identity-pool-id='us-east-2:496b3d05-f87e-4004-a823-6de9307c2a20' --invoke-url='mj51zfu62a' --api-gateway-region='us-east-2' --path-template='/reservations' --method='POST' --body='{"content":"hello world","attachment":"hello.jpg"}'
