const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const response = await fetch('https://www.dataaccess.com/webservicesserver/NumberConversion.wso', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        // Additional headers as required by the SOAP API
      },
      body: event.body // Pass the SOAP request body received from the client
    });
    const data = await response.text();
    return {
      statusCode: 200,
      body: data
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
