import { Button } from "@mui/material";
import MP4Box from "../../../lib/mp4box.all";
import { useEffect } from "react";
import { renderAudio } from "./render-audio";
import audio1 from "../../../assets/sound/audio1.mp4"
let time = 0;
let videoFrames = [];
var videoEncoder = null;
var encodingVideoTrack = null;
var outputFile = null;
var encodedVideoFrameCount = 0;
var timestampImage = 0;
var fps = 25;
var videoDuration =0;
export const RenderVideo = (props) => {
    const { listOfImages, audioFile } = props
    const initializeData = async () => {
        
        for (let index = 0; index < listOfImages.length; index++) {
            videoDuration +=listOfImages[index].duration;
            await fetch(listOfImages[index].src)
                .then(response => response.blob())
                .then(blob => createImageBitmap(blob).then((bmp) => {
                    timestampImage += 5000;
                    let videoFrame = new window["VideoFrame"](bmp, { timestamp: timestampImage });
                    console.log("videoFrame", videoFrame)
                    let numberOfFrameByDuration = fps * 5;
                    for (let index = 0; index < numberOfFrameByDuration; index++) {
                        videoFrames.push(videoFrame.clone());
                    }
                    videoFrame.close();
                }));
        }

        setupVideoEncoder({
            codec: 'avc1.42001E',
            width: 720,
            height: 480,
            hardwareAcceleration: "prefer-hardware",
            framerate: fps,
            bitrate: 15000000,
            avc: { format: "avc" }
        })
    }

    const onVideoEncodingComplete = () => {
        console.log("video encoding complete !")
        videoEncoder.close() //<=== in chrome 93 I must add a timeout in order to close the videoEncoder without error (ok in canary) 

        saveFile();
    }

    const saveFile = () => {
        // outputFile.save("video.mp4");
        console.log("Finish to create video file !");
        const params = {
            audioFile,
            outputFile,
            videoDuration
        }
        renderAudio(params);
        
    }

    const encode = async () => {
        await initializeData();
        for (let index = 0; index < videoFrames.length; index++) {
            const videoFrame = videoFrames[index];
            videoEncoder.encode(videoFrame);
            videoFrame.close();
        }

    }

    const setupVideoEncoder = (config) => {
        let videoEncodingTrackOptions = {
            timescale: 1000000,
            w: 720,
            h: 480,
            nb_samples: 0,
            avcDecoderConfigRecord: null
        }
        let videoEncodingSampleOptions = {
            duration: 10000,
            dts: 0,
            cts: 0,
            is_sync: false
        }


        outputFile = MP4Box.createFile();

        videoEncoder = new window["VideoEncoder"]({
            output: (encodedChunk, config) => {

                videoEncodingSampleOptions.duration = 1000000 / Math.ceil(1000 / (videoDuration / videoFrames.length));
                videoEncodingTrackOptions.nb_samples = videoFrames.length;
                if (encodingVideoTrack == null) {
                    videoEncodingTrackOptions.avcDecoderConfigRecord = config.decoderConfig.description;
                    encodingVideoTrack = outputFile.addTrack(videoEncodingTrackOptions);
                }

                let buffer = new ArrayBuffer(encodedChunk.byteLength);
                encodedChunk.copyTo(buffer);
                const timestamp = videoEncodingSampleOptions.duration * encodedVideoFrameCount;
                videoEncodingSampleOptions.dts = videoEncodingSampleOptions.cts = timestamp;
                videoEncodingSampleOptions.is_sync = encodedChunk.type == "key";
                outputFile.addSample(encodingVideoTrack, buffer, videoEncodingSampleOptions);

                encodedVideoFrameCount++;

                if (encodedVideoFrameCount == videoFrames.length) onVideoEncodingComplete();
                // else if (waitingVideoReading) continueReading();
            },
            error: (err) => {
                console.log("VideoEncoder error : ", err);
            }

        });

        videoEncoder.configure(config);
    }

    return (
        <Button onClick={encode}>Create Video</Button>
    )
}