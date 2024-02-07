document.getElementsByTagName("body")[0].innerHTML += "<style>@import url('https://fonts.cdnfonts.com/css/cascadia-code');.window.maximized {width: 100%;height: 100%;border-radius: 0;}.window {width: 400px;font-family: 'Cascadia Code', sans-serif;height: 300px;background-color: #333;border: 1px solid #222;border-radius: 5px;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);overflow: hidden;}.title-bar {background-color: #222;border-bottom: 1px solid #111;padding: 5px;cursor: move;display: flex;align-items: center;}.traffic-lights {display: flex;right: 0px;position: fixed;}.traffic-light {width: 12px;height: 12px;border-radius: 50%;margin-right: 5px;cursor: pointer;}.traffic-light.close {background-color: #ff5f56;}.traffic-light.minimize {background-color: #ffbd2e;}.traffic-light.maximize {background-color: #27c93f;}.title {color: #fff;margin-left: 10px;}.content {padding: 10px;color: #fff;height: calc(100% - 30px);overflow: auto;}.hide {display: none;}</style>";
  let isDragging = false;
  let initialX;
  let initialY;
  let windowElement;

  // Function to close window
  function closeWindow(id) {
    windowElement = document.getElementById(id);
    windowElement.style.display = 'none';
  }

  // Function to minimize window
  function minimizeWindow(id) {
    windowElement = document.getElementById(id);
    windowElement.style.display = 'none'; // Replace with minimize logic
  }

  // Function to maximize window
  function maximizeWindow(id) {
    windowElement = document.getElementById(id);
    windowElement.classList.toggle('maximized');
  }

  function handleMouseDown(event) {
    isDragging = true;
    initialX = event.clientX;
    initialY = event.clientY;
    windowElement = event.target.closest('.window');
  }

  function handleMouseMove(event) {
    if (isDragging) {
      const deltaX = event.clientX - initialX;
      const deltaY = event.clientY - initialY;
      const newLeft = parseInt(window.getComputedStyle(windowElement).left) + deltaX;
      const newTop = parseInt(window.getComputedStyle(windowElement).top) + deltaY;
      windowElement.style.left = newLeft + 'px';
      windowElement.style.top = newTop + 'px';
      initialX = event.clientX;
      initialY = event.clientY;
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  // Event listeners for window movement
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  
  function CreateWindow(title, minimizeBool, maximizeBool, sizeX, sizeY) {
  	const windowId = 'window_' + Math.random().toString(36).substr(2, 9); // Generate a random string
    const canvasId = 'window_' + windowId + '_canvas_' + Math.random().toString(36).substr(2, 9);
    var maxstat = "";
    var minstat = "";
    var sizexa = sizeX;
    var sizeya = sizeY;
    if (!minimizeBool) {
        minstat = "hide";
    }
    if (!maximizeBool) {
        maxstat = "hide";
    }
    if (sizeX == "0") {
        sizexa = "400";
    }
    if (sizeY == "0") {
        sizeya = "300";
    }
    var tex = "<div class=\"window\" style=\"width: " + sizexa + "px;height: " + sizeya + "px;\" id=\"" + windowId + "\"><div class=\"title-bar\" id=\"title-bar\"><div class=\"traffic-lights\"><div class=\"traffic-light maximize " + maxstat + "\" onclick=\"maximizeWindow('" + windowId + "')\"></div><div class=\"traffic-light minimize " + minstat + "\" onclick=\"minimizeWindow('" + windowId + "')\"></div><div class=\"traffic-light close\" onclick=\"closeWindow('" + windowId + "')\"></div></div><div class=\"title\">" + title + "</div></div><div class=\"content\" id=\"" + canvasId + "\"></div></div>";
    document.getElementsByTagName("body")[0].innerHTML += tex;
    return document.getElementById(canvasId);
  }
function executeCode() {
    const input = document.getElementById('input').value;
    const output = document.getElementById('output');
    try {
      const result = eval(input);
      output.textContent = result;
    } catch (error) {
      output.textContent = error;
    }
  }
var s = CreateWindow("MyWind", true, true, 0, 0);
s.innerHTML = "<input style=\"background-color:#222;border:none;color:white\" type=\"text\" id=\"input\"><button onclick=\"executeCode()\" style=\"background-color:#222;border:none;color:white\">Execute</button><br><pre id=\"output\"></pre>"
