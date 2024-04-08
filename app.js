document.getElementById('numberForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const number = document.getElementById('numberInput').value;

    // Define the soapRequest variable here, so it's available when used below
    const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
      <ubiNum>${number}</ubiNum>
    </NumberToWords>
  </soap:Body>
</soap:Envelope>`;

    // Use the soapRequest in your fetch to the Netlify function
    fetch('/.netlify/functions/proxy', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
        },
        body: soapRequest
    })
    .then(response => response.text())
    .then(responseText => {
        // Assuming the SOAP response is directly in text and parsing is needed
        // to extract the actual content you want to display
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, "text/xml");
        const result = xmlDoc.getElementsByTagName("NumberToWordsResult")[0].childNodes[0].nodeValue;
        document.getElementById('result').innerText = `In words: ${result}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error fetching the conversion result.';
    });
});
