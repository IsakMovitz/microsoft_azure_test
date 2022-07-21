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











// function synthesizeSpeech() {
//     const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
//     const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

//     const response = synthesizer.speakTextAsync(
//         "Getting the response as an in-memory stream.",
//         result => {
//             synthesizer.close();

//             console.log(result.audioData)
//             return result.audioData;
//         },
//         error => {
//             console.log(error);
//             synthesizer.close();
//         });
    
//     console.log(response)
// }

// synthesizeSpeech()

//########################################################################

// const textToSoundfile = async (key, region, text, filename)=> {
    
//     // convert callback function to promise
//     return new Promise((resolve, reject) => {
        
//         const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
//         speechConfig.speechSynthesisOutputFormat = 5; // mp3
        
//         let audioConfig = null;
        
//         if (filename) {
//             audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
//         }
        
//         const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

//         const result = synthesizer.speakTextAsync(
//             text,
//             result => {
                
//                 const { audioData } = result;

//                 synthesizer.close();
                
//                 if (filename) {
                    
//                     // return stream from file
//                     const audioFile = fs.createReadStream(filename);
//                     resolve(audioFile);
                    
//                 } else {
                    
//                     // return stream from memory
//                     const bufferStream = new PassThrough();
//                     bufferStream.end(Buffer.from(audioData));
//                     resolve(bufferStream);
//                 }
//             },
//             error => {
//                 synthesizer.close();
//                 reject(error);
//             }); 
//     });

// };

// textToSoundfile(key,region,"Hello world")   // "test2.mp3"


// ############################################################
// Turn callback into Promise? 

// const textToBuffer = async (text) =>{
//     key = "41548085e09c48339f8a20a08144cb12" 
//     region = "eastus" 
//     const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
//     speechConfig.speechRecognitionLanguage = "sv-SE";
//     const synthesizer =  new sdk.SpeechSynthesizer(speechConfig);


//     // const response = await synthesizer.speakTextAsync(text)
//     // await synthesizer.close()
//     // const audioData  = response.audioData

//     // console.log(audioData)
//     const response = await synthesizer.speakTextAsync(
//         text,
//         result =>  {
//             synthesizer.close();
//             const audioData = await result.audioData

//             console.log(audioData)
//             return audioData;
            
//         },
//         error => {
//             console.log(error);
//             synthesizer.close();
//         });

//     return audioData
// }

// textToBuffer("hej")



// ##############################################################################################################

// const synthesizeSpeech = () => {

//     const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
//     const synthesizer =  new sdk.SpeechSynthesizer(speechConfig);

//     const result_cb  = async function(result){
//         synthesizer.close();
//         const res = await result.audioData
//         console.log("A")

//         return res;
//     }

//     const error_cb = async function(error){

//         console.log(error);
//         synthesizer.close();

//     }
        
//     return synthesizer.speakTextAsync("hej",result_cb, error_cb);


// }

// synthesizeSpeech()

// console.log("C")

// synthesizerResult = await synthesizer.speakTextAsync("hej",result_cb,error_cb)



