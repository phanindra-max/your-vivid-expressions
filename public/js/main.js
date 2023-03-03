const video = document.getElementById("video");

Promise.all([
  // faceapi.nets.tinyFaceDetector.loadFromUri("./cammodels"),
  faceapi.loadTinyFaceDetectorModel('../cammodels'),
  // faceapi.nets.faceRecognitionNet.loadFromUri("./cammodels"),
  faceapi.loadFaceRecognitionModel('../cammodels'),
  // faceapi.nets.faceExpressionNet.loadFromUri("./cammodels")
  faceapi.loadFaceExpressionModel('../cammodels')
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => (video.srcObject = stream),
    err => console.error(err)
  );
}

video.addEventListener("playing", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.querySelector(".video_box").append(canvas);

  const displaySize = { width: 640, height: 480 };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);}, 100);
});
