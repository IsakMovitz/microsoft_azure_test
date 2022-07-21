const sdk = require('microsoft-cognitiveservices-speech-sdk');
const fs = require('fs');

// Seems like Node can't use input from a mic, need to create a web-based environment 
// https://docs.microsoft.com/sv-se/azure/cognitive-services/speech-service/how-to-select-audio-input-devices
// https://docs.microsoft.com/sv-se/azure/cognitive-services/speech-service/how-to-recognize-speech?pivots=programming-language-javascript

key = "<key>" 
region = "<region>"   

/**
 * Function logs the text of the input sound-file
 * @param {*} key your resource key
 * @param {*} region your resource region
 * @param {*} text text to convert to audio/speech
 * @param {*} filename for output
 */

function speechFileToText(key, region, soundFile) {

    let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(soundFile));
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechRecognitionLanguage = "sv-SE";

    let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
 
    recognizer.recognizeOnceAsync(result => {

        console.log(`RECOGNIZED: Text=${result.text}`);
        recognizer.close();
    });
}

speechFileToText(key, region,"swe_recording.wav");


function speechBufferToText(key, region,arrayBuffer) {
    let pushStream = sdk.AudioInputStream.createPushStream();

    pushStream.write(arrayBuffer.slice());
    pushStream.close();

    let audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechRecognitionLanguage = "sv-SE";


    let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    recognizer.recognizeOnceAsync(result => {
        console.log(`RECOGNIZED: Text=${result.text}`);
        recognizer.close();
    });
}


