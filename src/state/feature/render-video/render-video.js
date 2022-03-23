import { Button } from "@mui/material";
import MP4Box from "mp4box";
import { useEffect } from "react";
let time = 0;
let videoFrames = [];
var videoEncoder = null;
var encodingVideoTrack = null;
var outputFile = null;
var encodedVideoFrameCount = 0;
var timestampImage = 0;
var fps = 25;
let listOfImagesExample = [
    'image2.jpg', 'https://media.istockphoto.com/photos/eagle-hunter-standing-on-the-background-of-mountains-in-kyrgyzstan-picture-id1341309784?b=1&k=20&m=1341309784&s=170667a&w=0&h=i1AHUOcYCL6_UPAHQWRyJtPXtlzgQfln7TlPf-hcrIs=',
]
export const RenderVideo = (props) => {
    const initializeData = async () => {
        let { listOfImages } = props
        if (listOfImages === undefined) {
            listOfImages = listOfImagesExample
        }
        for (let index = 0; index < listOfImages.length; index++) {
            await fetch(listOfImages[index])
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
        outputFile.save("video.mp4");
        console.log("file saved !");
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
        var videoDuration = 10000;


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
                console.log("timestamp", timestamp)
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