exports.handler = async (event) => {
    let fetch;
    try {
        if (!fetch) {
            fetch = (await import('node-fetch')).default;
        }

        const response = await fetch('https://www.dataaccess.com/webservicesserver/NumberConversion.wso', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
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
