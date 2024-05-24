import { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [inputVideoUrl, setInputVideoUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [captions, setCaptions] = useState([]);
  const videoRef = useRef(null);

  const handleAddCaption = () => {
    if (caption && timestamp) {
      setCaptions([
        ...captions,
        { text: caption, time: parseFloat(timestamp) },
      ]);
      setCaption("");
      setTimestamp("");
    }
  };

  const handleLoadVideo = () => {
    setVideoUrl(inputVideoUrl);
  };

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current.currentTime;
    const currentCaption = captions.find(
      (cap) => cap.time <= currentTime && currentTime < cap.time + 2 // Display caption for 2 seconds
    );
    if (currentCaption) {
      document.getElementById("caption-display").innerText =
        currentCaption.text;
    } else {
      document.getElementById("caption-display").innerText = "";
    }
  };

  return (
    <div className="mx-auto p-4 flex flex-col flex-shrink items-center">
      <h1 className="text-3xl font-medium">Video Caption App</h1>
      <div className="flex mt-4">
        <input
          className="border border-black rounded px-2 mr-4"
          type="text"
          placeholder="Enter video URL"
          value={inputVideoUrl}
          onChange={(e) => setInputVideoUrl(e.target.value)}
        />
        <button
          className="text-sm bg-gray-700 px-2 rounded-md text-gray-50"
          onClick={handleLoadVideo}
        >
          Load Video
        </button>
      </div>
      <div className="my-4">
        <input
          className="border border-black rounded px-2"
          type="text"
          placeholder="Enter caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          className="border border-black rounded pl-2 mx-4"
          type="number"
          placeholder="Enter timestamp (seconds)"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
        <button
          className="border border-black rounded px-2  mt-2 items-center"
          onClick={handleAddCaption}
        >
          Add Caption
        </button>
      </div>
      <div className=" border boderblack h-500px w-700px ">
        {videoUrl && (
          <video
            ref={videoRef}
            controls
            onTimeUpdate={handleTimeUpdate}
            width="600"
            src={videoUrl}
          />
        )}
      </div>
      <div
        id="caption-display"
        className=" top-[10rem] items-center left-[15rem] bg-slate-300 px-2  w-[400px]  text-black  text-lg font-medium  rounded-md "
      ></div>
      <div className="mt-5 flex flex-col items-center bg-gray-700 text-gray-50 py-2 px-4 rounded-lg">
        <h2 className="text-lg font-medium">Captions</h2>
        <ul className="text-sm font-medium">
          {captions.map((cap, index) => (
            <li key={index}>
              {cap.time}s: {cap.text}
            </li>
          ))}
        </ul>
      </div>
      <p className="flex flex-col gap-y-2">
        Demo Video Links
        <span>
        https://archive.org/download/Sintel/sintel-2048-surround.mp4

        </span>
        <span>
          https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4
        </span>
      </p>
    </div>
  );
};

export default App;
