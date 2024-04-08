document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('numberForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        const number = document.getElementById('numberInput').value;

        // Constructing the SOAP request body
        const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
      <ubiNum>${number}</ubiNum>
    </NumberToWords>
  </soap:Body>
</soap:Envelope>`;

        // Making the SOAP request
        fetch('https://www.dataaccess.com/webservicesserver/NumberConversion.wso', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
            },
            body: soapRequest
        })
        .then(response => response.text())
        .then(responseText => {
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
});
