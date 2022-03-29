import MP4Box from '../../../lib/mp4box.all';
import { useEffect } from 'react';
// audio variable
// let audioUrl = "audio1.mp4";
let file = null;
let audioTrack = null;
let encodingAudioTrack = null;
var countSample = 0;
var nbSampleTotal = 0;
let audioTotalTimestamp = 0;
const nbSampleMax = 30;

//---- AUDIO DECODING VARIABLES
const FPS = 25;
const ONE_SECOND_IN_MICROSECOND = 1000000;
const BITRATE = 15000000;
const MICROSECONDS_PER_FRAME = ONE_SECOND_IN_MICROSECOND / FPS;
const SAMPLE_RATE = 44100;

const encodingFrameDistance = 5;
let encodedAudioFrameCount = 0;
let waitingAudioReading = false;
var handleAudioEncoding = true;
var audioEncoder = null;
var audioDecoder = null;
var audioFrames = [];
var decodedAudioFrameCount = 0;
var processingAudio = false;
let totalaudioEncodeCount = 0;

let waitingFrame = false;
let isRenderFile = false;
export const renderAudio = (props) => {
    console.log('props', props);
    const { audioFile, outputFile, videoDuration } = props;
    let readNextFrame = () => {
        if (processingAudio) {
            if (audioFrames.length == 0) {
                if (decodedAudioFrameCount > 0) {
                    if (!waitingFrame) {
                        waitingFrame = true;
                        //console.log("call getNextSampleArray ",decodedAudioFrameCount)
                        getNextSampleArray();
                    }
                }
            } else {
                onAudioFrameReadyToUse(audioFrames.shift());
            }
            return;
        }
    };

    let onAudioFrameReadyToUse = async (audioFrame) => {
        /*
        //just an example to expose how to get audio-sample-buffers from AudioData object :
        //
        //let leftChannel = new Float32Array(audioSampleLength * 4);
        //audioFrame.copyTo(leftChannel,leftChannelOptions);
        //
        //let rightChannel = leftChannel;
        //if(audioFrame.numberOfChannels > 1){
        //    rightChannel = new Float32Array(audioSampleLength * 4);
        //    audioFrame.copyTo(rightChannel,rightChannelOptions);
        //}
        
        
        */
        if (isRenderFile) {
            onAudioDemuxingComplete();
        } else {
            await audioEncoder.encode(audioFrame);
            audioFrame.close();

            decodedAudioFrameCount++;

            if (decodedAudioFrameCount == nbSampleTotal) onAudioDemuxingComplete();
            else readNextFrame();
        }
    };

    let onAudioDemuxingComplete = () => {
        console.log('onAudioDemuxCompleted !');
        audioDecoder.close();
    };

    let getNextSampleArray = () => {
        file.start();
    };

    let setupAudioDecoder = (config) => {
        let timeout = null;
        countSample = 0;
        processingAudio = true;
        waitingFrame = true;
        nbSampleTotal = audioTrack.nb_samples;
        console.log('audio nb sample total = ', nbSampleTotal);
        audioDecoder = new window['AudioDecoder']({
            output: (audioFrame) => {
                audioFrames.push(audioFrame);

                if (timeout) clearTimeout(timeout);
                timeout = setTimeout(() => {
                    if (waitingFrame) {
                        waitingFrame = false;
                        readNextFrame();
                    }
                }, 15);
            },
            error: (err) => {
                console.log('WebCodec.AudioDecoder error : ', err);
            },
        });

        audioDecoder.configure(config);

        file.setExtractionOptions(audioTrack.id, null, { nbSamples: nbSampleMax });
    };
    let setupAudioEncoder = (config) => {
        const audioEncodingTrackOptions = {
            timescale: SAMPLE_RATE,
            media_duration: 0,
            duration: 0,
            nb_samples: 0,
            samplerate: SAMPLE_RATE,
            width: 0,
            height: 0,
            hdlr: 'soun',
            name: 'SoundHandler',
            type: 'opus',
        };

        const audioEncodingSampleOptions = {
            duration: 0,
            dts: 0,
            cts: 0,
            is_sync: false,
        };

        audioEncoder = new window.AudioEncoder({
            output: (encodedChunk, config) => {
                if (encodingAudioTrack === null) {
                    var cutDuration = (videoDuration / 1000) * ONE_SECOND_IN_MICROSECOND;
                    totalaudioEncodeCount = Math.floor(cutDuration / encodedChunk.duration);
                    audioEncodingTrackOptions.nb_samples = totalaudioEncodeCount;
                    const trackDuration = cutDuration / ONE_SECOND_IN_MICROSECOND;
                    // audioEncodingTrackOptions.duration = trackDuration;
                    audioEncodingTrackOptions.duration = trackDuration * SAMPLE_RATE;
                    audioEncodingTrackOptions.media_duration = trackDuration * SAMPLE_RATE;
                    encodingAudioTrack = outputFile.addTrack(audioEncodingTrackOptions);
                }
                const buffer = new ArrayBuffer(encodedChunk.byteLength);
                encodedChunk.copyTo(buffer);

                // const sampleDuration = encodedChunk.duration / SAMPLE_RATE;
                const sampleDuration =
                    (encodedChunk.duration / ONE_SECOND_IN_MICROSECOND) * SAMPLE_RATE;

                audioEncodingSampleOptions.dts = encodedAudioFrameCount * sampleDuration;
                audioEncodingSampleOptions.cts = encodedAudioFrameCount * sampleDuration;
                audioEncodingSampleOptions.duration = sampleDuration;
                audioEncodingSampleOptions.is_sync = encodedChunk.type === 'key';
                outputFile.addSample(encodingAudioTrack, buffer, audioEncodingSampleOptions);

                encodedAudioFrameCount++;
                if (encodedAudioFrameCount >= totalaudioEncodeCount) {
                    isRenderFile = true;
                    onAudioEncodingComplete();
                } else if (waitingAudioReading) {
                    continueReading();
                }
            },
            error: (err) => {
                console.error('AudioEncoder error : ', err);
            },
        });
        audioEncoder.configure(config);
    };

    const continueReading = () => {
        if (processingAudio) {
            waitingAudioReading =
                decodedAudioFrameCount - encodedAudioFrameCount > encodingFrameDistance;
            if (waitingAudioReading === false) {
                readNextFrame();
            } else {
                // console.log('waiting audioEncoder');
            }
        }
    };

    const onAudioEncodingComplete = () => {
        audioEncoder.close();
        handleAudioEncoding = false;
        saveFile();
    };

    const saveFile = () => {
        outputFile.save('video.mp4');
    };

    const startAudioConfig = () => {
        setupAudioEncoder({
            // codec: audioTrack.codec, // AudioEncoder does not support this field
            codec: 'opus',
            sampleRate: audioTrack.audio.sample_rate,
            numberOfChannels: audioTrack.audio.channel_count,
            bitrate: audioTrack.bitrate,
        });

        setupAudioDecoder({
            codec: audioTrack.codec,
            sampleRate: audioTrack.audio.sample_rate,
            numberOfChannels: audioTrack.audio.channel_count,
        });

        getNextSampleArray();
    };

    file = MP4Box.createFile();

    file.onerror = (e) => {
        console.log('file onerror ', e);
    };

    file.onError = (e) => {
        console.warn('MP4Box file error => ', e);
    };
    file.onReady = (info) => {
        // muxStarted = true;
        audioTrack = info.audioTracks[0];
        console.log('audioTrack ', audioTrack);

        if (audioTrack) {
            // audioSamplerate = audioTrack.audio.sample_rate;
            // audioChannelCount = audioTrack.audio.channel_count;
            // audioNbSample = audioTrack.nb_samples;

            audioTotalTimestamp =
                (audioTrack.samples_duration / audioTrack.audio.sample_rate) *
                ONE_SECOND_IN_MICROSECOND;
        }
        onVideoReadyToPlay();
        //=> at the bottom of the code , will call getNextSampleArray();
        //                               |===> will call file.start();
    };

    let testCount = 0;
    file.onSamples = (trackId, ref, samples) => {
        if (audioTrack.id == trackId) {
            file.stop();
            countSample += samples.length;

            //console.log("onSample ",countSample+" VS "+nbSampleTotal)
            // if (countSample > videoFrames.length) {
            //   audioDecoder.flush();
            // }
            for (const sample of samples) {
                testCount++;
                if (testCount <= nbSampleTotal / 2) {
                    const type = sample.is_sync ? 'key' : 'delta';
                    const chunk = new window['EncodedAudioChunk']({
                        type: type,
                        timestamp: sample.cts,
                        duration: sample.duration,
                        data: sample.data,
                        offset: sample.offset,
                    });
                    audioDecoder.decode(chunk);
                }
            }
            if (countSample == nbSampleTotal / 2) {
                audioDecoder.flush();
            }
        }
    };


    const resetField = () => {
        // audio variable
        // let audioUrl = "audio1.mp4";
        let file = null;
        let audioTrack = null
        let encodingAudioTrack = null;
        var countSample = 0;
        var nbSampleTotal = 0;
        let audioTotalTimestamp = 0;
        const nbSampleMax = 30;

        //---- AUDIO DECODING VARIABLES
        const FPS = 25;
        const ONE_SECOND_IN_MICROSECOND = 1000000;
        const BITRATE = 15000000;
        const MICROSECONDS_PER_FRAME = ONE_SECOND_IN_MICROSECOND / FPS;
        const SAMPLE_RATE = 44100;

        const encodingFrameDistance = 5;
        let encodedAudioFrameCount = 0;
        let waitingAudioReading = false;
        var handleAudioEncoding = true;
        var audioEncoder = null;
        var audioDecoder = null;
        var audioFrames = [];
        var decodedAudioFrameCount = 0;
        var processingAudio = false;
        let totalaudioEncodeCount = 0;

        let waitingFrame = false;
        let isRenderFile = false;
    }

    let loadFile = (audioFile) => {
        resetField();
        console.log("audioFile", audioFile)
        var url = null;
        if (audioFile.name === undefined) {
            url = audioFile;
        } else {
            url = URL.createObjectURL(audioFile);
        }
        console.log("url", url)
        fetch(url).then((response) => {
            //we fill our Mp4BoxFile with the data of our video file
            let offset = 0;
            let buf;
            let reader = response.body.getReader();

            let push = () => {
                return reader
                    .read()
                    .then(({ done, value }) => {
                        if (done == true) {
                            file.flush(); //-> will call file.onReady
                            startAudioConfig();
                            return;
                        }

                        buf = value.buffer;
                        buf.fileStart = offset;
                        offset += buf.byteLength;
                        file.appendBuffer(buf);
                        push();
                    })
                    .catch((e) => {
                        console.log('reader error ', e);
                    });
            };
            push();
        });
    };

    let onVideoReadyToPlay = () => {
        console.log('audioReadyToPlay');
        getNextSampleArray();
    };

    loadFile(audioFile);
};
