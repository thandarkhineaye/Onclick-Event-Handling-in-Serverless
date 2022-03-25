import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
//import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';

const index: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  var renderedPage = renderFullPage( 'Go Serverless ! Your function executed successfully!');
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: renderedPage
  };
  
  return response
};

const result: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const response = {
      statusCode: 200,
      body: JSON.stringify(event) 
  }
  return response
};

function renderFullPage(renderedContent) {

  return `<!DOCTYPE html>
  <html>
      <head>
          <meta charset="utf-8">
      </head>
      <body>
          <div id="container">${renderedContent}</div>
          <button onclick='call_api_end_point()'>Click Me</button>
          <script type='text/javascript'>
            function call_api_end_point(){
              window.location = "https://localhost/dev/insert";
            }
          </script> 
      </body>
  </html>`;
}
export const main = middyfy(index);
export const result_endpoint = middyfy(result);
