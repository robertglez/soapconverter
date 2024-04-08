// This URL should point to your Netlify function endpoint, not directly to the SOAP service
const functionUrl = '/.netlify/functions/proxy';

fetch(functionUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'text/xml; charset=utf-8',
    },
    body: soapRequest // The same SOAP request XML you were trying to send directly
})
.then(response => response.text())
.then(responseText => {
    // process the responseText as before
})
.catch(error => {
    console.error('Error:', error);
    document.getElementById('result').innerText = 'Error fetching the conversion result.';
});

