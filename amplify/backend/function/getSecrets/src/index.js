// Use the following code to retrieve configured secrets from SSM:

const aws = require("aws-sdk");

const { Parameters } = await new aws.SSM()
  .getParameters({
    Names: ["SUPABASE_URL", "SUPABASE_ANON_KEY"].map(
      (secretName) => process.env[secretName],
    ),
    WithDecryption: true,
  })
  .promise();

// Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const ssm = new aws.SSM();
  const apiUrl = await getParameterFromSSM(ssm, "SUPABASE_URL");
  const apiAnonKey = await getParameterFromSSM(ssm, "SUPABASE_ANON_KEY");

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      SUPABASE_URL: apiUrl,
      SUPABASE_ANON_KEY: apiAnonKey,
    }),
  };
  return response;
};

async function getParameterFromSSM(ssm, name) {
  const data = await ssm
    .getParameter({ Name: name, WithDecryption: true })
    .promise();
  return data.Parameter.Value;
}
