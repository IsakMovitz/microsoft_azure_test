const sdk = require('microsoft-cognitiveservices-speech-sdk');
const fs = require('fs');

key = "<key>" 
region = "<region>"     

/**
 * Function creates an mp3-file of the input textstring
 * @param {*} key your resource key
 * @param {*} region your resource region
 * @param {*} text text to convert to audio/speech
 * @param {*} filename for output
 */

function textToSoundFile(key, region, textString, filename ) {

    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechSynthesisOutputFormat = 5; // mp3
    audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig,audioConfig)

    synthesizer.speakTextAsync(
        textString,
        result => {
            synthesizer.close();
            if (result) {
                // Create file 
                return fs.createReadStream(filename);
            }
        },
        error => {
            console.log(error);
            synthesizer.close();
        });
}


textToSoundFile(key,region,"Hello world","test.mp3")


// Code for creating an audio arrayBuffer, separated the callbacks for easier understanding

function synthesizeSpeech(key,region){

    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    const synthesizer =  new sdk.SpeechSynthesizer(speechConfig);

    const result_callback  = function(result){
        synthesizer.close();
      
        console.log(result.audioData)

        // Problem with returning this data from the outer function synthesizeSpeech
        return result.audioData;
    }

    const error_callback = function(error){
        console.log(error);
        synthesizer.close();
    }
    
    synthesizer.speakTextAsync("Hello",result_callback, error_callback)
    
}

//synthesizeSpeech(key, region)



