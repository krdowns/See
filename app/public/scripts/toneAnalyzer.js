const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
    version: '3.16.1',
    iam_apikey: '86b6a234-a16f-452f-8f2b-5753025248c3',
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
  });
  
  toneAnalyzer.method(params,
      function (err, response) {
        // The error will be the first argument of the callback
        if (err.code == 404) {
    
          // Handle Not Found (404) error
        } else if (err.code == 413) {
    
          // Handle Request Too Large (413) error
        } else {
          console.log('Unexpected error: ', err.code);
          console.log('error:', err);
        }
      });
  toneAnalyzer.methodName({
      parameters,
      headers: {
          'Custom-Header': '{header_value}'
      }
      },
      function (err, response) {
          if (err) {
          console.log('error:', err);
          } else {
          console.log(response);
          }
      }
      );
  toneAnalyzer.methodName({
      parameters
      },
      function (err, result, response) {
          if (err) {
          console.log('error:', err);
          } else {
          console.log(response.headers);
          }
      }
      );
