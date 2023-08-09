

// const canvas = new fabric.Canvas("canvas", {
//   width: 500,
//   height: 500,
// });
// canvas.requestRenderAll();
// fabric.Image.fromURL(
//   "https://c1.wallpaperflare.com/preview/804/778/325/sky-background-nature-blue.jpg",
//   (img) => {
//     canvas.backgroundImage = img;
//     canvas.requestRenderAll();
//   }
// );

const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 500,
    height: 500,
    selection: false,
  });
};

const setBackground = (url, canvas) => {
  fabric.Image.fromURL(url, (img) => {
    canvas.backgroundImage = img;
    canvas.requestRenderAll();
  });
};

const toggleMode = (mode) => {
  if (mode === modes.pan) {
    if (currentMode === modes.pan) {
      currentMode = "";
    } else {
      currentMode = modes.pan;
      canvas.isDrawingMode = false;
      canvas.requestRenderAll();
    }
  } else if (mode === modes.drawing) {
    if (currentMode === modes.drawing) {
      currentMode = "";
      canvas.isDrawingMode = false;
      canvas.requestRenderAll();
    } else {
      //Brush for the drawing mode
      //   canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
      //   canvas.freeDrawingBrush.color = "red";
      //   canvas.freeDrawingBrush.width = 15;

      currentMode = modes.drawing;
      canvas.freeDrawingBrush.color = color;
      canvas.isDrawingMode = true;
      canvas.requestRenderAll();
    }
  } else if (mode === modes.eraser) {
    currentMode = modes.eraser;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = "white"; // Use white color for erasing
    canvas.freeDrawingBrush.width = 10; // Set desired eraser width
    canvas.freeDrawingCursor =
      'url("https://www.cursor.cc/cursor3d/49492.png") 0 10, auto';
    canvas.requestRenderAll();
  }
};

const setPanEvents = (canvas) => {
  //mouse:over
  canvas.on("mouse:move", (event) => {
    //   console.log(e);
    if (mousePressed && currentMode === modes.pan) {
      canvas.setCursor("grab");
      canvas.requestRenderAll();
      const mEvent = event.e;
      const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
      canvas.relativePan(delta);
    }
  });

  //keep track of mouse down/up
  canvas.on("mouse:down", (event) => {
    mousePressed = true;
    if (currentMode === modes.pan) {
      canvas.setCursor("grab");
      canvas.requestRenderAll();
    }
  });

  canvas.on("mouse:up", (event) => {
    mousePressed = false;
    canvas.setCursor("default");
    canvas.requestRenderAll();
  });
};

const setColorListener = () => {
  const picker = document.getElementById("colorPicker");
  picker.addEventListener("change", (event) => {
    color = "#" + event.target.value;
    canvas.freeDrawingBrush.color = color;
    canvas.requestRenderAll();
  });
};

const canvas = initCanvas("canvas");
let mousePressed = false;
let color = "#000000";

let currentMode;
const modes = {
  pan: "pan",
  drawing: "drawing",
};

// setBackground(
//   "https://shamrocklabels.com/wp-content/uploads/2017/09/SBLP-11.png",
//   canvas
// );

setPanEvents(canvas);
setColorListener();
