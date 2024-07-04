import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import { Howl } from 'howler';
import './App.css';
//import soundURL from './assets/hey_sondn.mp3';

// var sound = new Howl({
//   src: [soundURL],
// });

// sound.play();

function App() {
    const video = useRef();
    const init = async () => {
        console.log('init...');
        await setupCamera();
        console.log('setup camera success');
    };

    const setupCamera = () => {
        return new Promise((resolve, reject) => {
            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;

            if (navigator.getUserMedia) {
                navigator.getUserMedia(
                    {
                        video: true,
                    },
                    (stream) => {
                        video.current.srcObject = stream;
                        video.current.addEventListener('loadeddata', resolve);
                    },
                    (error) => {
                        reject(error);
                    },
                );
            } else {
                reject();
            }
        });
    };

    useEffect(() => {
        init();

        // Clean up
        return () => {};
    }, []);

    return (
        <div className="main">
            <video className="video" autoPlay ref={video} />

            <div className="control">
                <button className="btn">Train 1</button>
                <button className="btn">Train 2</button>
                <button className="btn">Run</button>
            </div>
        </div>
    );
}

export default App;
