document.getElementById('numberForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const number = document.getElementById('numberInput').value;

    const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
      <ubiNum>${number}</ubiNum>
    </NumberToWords>
  </soap:Body>
</soap:Envelope>`;

    fetch('/.netlify/functions/proxy', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
        },
        body: soapRequest
    })
    .then(response => response.text())
    .then(responseText => {
        console.log(responseText); // Add this to log the raw response text

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, "text/xml");

        // Ensure you are using the correct tag name here
        const resultTag = xmlDoc.getElementsByTagName("NumberToWordsResult")[0];
        if (!resultTag) {
            console.error('NumberToWordsResult tag not found');
            document.getElementById('result').innerText = 'Error: NumberToWordsResult tag not found in the response.';
            return;
        }

        const result = resultTag.childNodes[0].nodeValue;
        document.getElementById('result').innerText = `In words: ${result}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error fetching the conversion result.';
    });
});
