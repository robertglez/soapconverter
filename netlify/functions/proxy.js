// Netlify Functions: /netlify/functions/proxy.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const response = await fetch('https://www.dataaccess.com/webservicesserver/NumberConversion.wso', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
    },
    body: event.body // Forward the SOAP request from the client
  });
  const data = await response.text();
  return {
    statusCode: 200,
    body: data
  };
};
