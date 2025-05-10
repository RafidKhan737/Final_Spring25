let eraSelect, button;
let selectedEra = "";
let state = "idle";
let currentPeriod = "";
let glitchStartTime = 0;
let travelerX, travelerY;
let travelerVisible = false;
let smallChangeMade = false;
let staticAlpha = 0;

let imgPre19th, img19th, img20th, img21st, imgFuture;
let travelerImg, deloreanImg, butterflyImg, cavemanImg, trainImg, rocketImg, ufoImg, oldSelfImg;
let butterflyX = 200;
let butterflyY = 250;
let butterflyVisible = false;

function preload() {
  imgPre19th = loadImage('digital-art-style-illustration-river-nature_23-2151825752.jpg');
  img19th = loadImage('1000_F_1012606374_o90fPTKiSIWU4j2ygzT7wRSBHkSgyzZk.jpg');
  img20th = loadImage('03425v.jpg');
  img21st = loadImage('tripadvisortimessquare_taggeryanceyiv_5912.jpeg');
  imgFuture = loadImage('future.jpeg');

  travelerImg = loadImage('Time_Traveller-removebg-preview.png');
  deloreanImg = loadImage('delorean-time-machine-removebg-preview.png');
  butterflyImg = loadImage('Morpho_menelaus_huebneri_MHNT_Male_Dos-removebg-preview.png');
  cavemanImg = loadImage('neanderthal-man-holds-mobile-phone-illustration-format-eps-40322600-removebg-preview.png');
  trainImg = loadImage('Screenshot_2025-05-04_at_6.20.36_PM-removebg-preview.png');
  rocketImg = loadImage('h3_main_001-removebg-preview.png');
  ufoImg = loadImage('3d-render-ufo-spaceship-concept_138015-11-removebg-preview.png');
  oldSelfImg = loadImage('full-body-photo-aged-rich-man-happy-positive-smile-have-fun-dance-party-isolated-over-blue-color-background-full-body-photo-228982009-removebg-preview.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  eraSelect = createSelect();
  eraSelect.option('Select Time Period');
  eraSelect.option('Pre-19th Century');
  eraSelect.option('19th Century');
  eraSelect.option('20th Century');
  eraSelect.option('21st Century');
  eraSelect.option('Future');
  eraSelect.position(20, 20);

  button = createButton('Time Travel');
  button.position(eraSelect.x + eraSelect.width + 10, 20);
  button.mousePressed(startTimeTravel);

  textAlign(CENTER, CENTER);
  textSize(24);

  travelerX = width - 230;
  travelerY = height - 220;
}

function draw() {
  background(0);

  switch (state) {
    case "idle":
      drawIdleScene();
      break;
    case "glitch":
      drawGlitchSafe();
      if (millis() - glitchStartTime > 2000) {
        state = "arrival";
        travelerVisible = true;
        staticAlpha = 0;
        butterflyVisible = true;
      }
      break;
    case "arrival":
      drawArrivalScene();
      break;
    case "end":
      drawEndScene();
      break;
  }

  if (state === "arrival" && travelerVisible) {
    travelerX = constrain(travelerX, 0, width - 100);
  }
}

function drawIdleScene() {
  drawTextBox("Choose a time period and press Time Travel", width / 2, 100);
  drawTimeMachine();
  image(travelerImg, travelerX, travelerY, 100, 180);
}

function drawGlitchSafe() {
  background(0);
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let gray = random(100, 255);
    pixels[i] = gray;
    pixels[i + 1] = gray;
    pixels[i + 2] = gray;
    pixels[i + 3] = random(50, 180);
  }
  updatePixels();

  staticAlpha += 3;
  fill(255, staticAlpha);
  rect(0, 0, width, height);

  drawTextBox("Traveling through time...", width / 2, height / 2, 20);
}

function drawArrivalScene() {
  switch (currentPeriod) {
    case "Pre-19th Century":
      image(imgPre19th, 0, 0, width, height);
      break;
    case "19th Century":
      image(img19th, 0, 0, width, height);
      break;
    case "20th Century":
      image(img20th, 0, 0, width, height);
      break;
    case "21st Century":
      image(img21st, 0, 0, width, height);
      break;
    case "Future":
      image(imgFuture, 0, 0, width, height);
      break;
    default:
      background(20);
  }

  drawTextBox(`You've arrived in the ${currentPeriod}`, width / 2, 50);
  drawTimeMachine();

  if (travelerVisible) {
    image(travelerImg, travelerX, travelerY, 100, 180);
  }

  if (butterflyVisible) {
    image(butterflyImg, butterflyX, butterflyY, 60, 50);
  }

  if (smallChangeMade) {
    drawTextBox("🦋 The butterfly flapped its wings—timeline shifted!", width / 2, height - 100, 18);
    drawParadoxEffect();
  }
}

function drawParadoxEffect() {
  let msg = "";
  switch (currentPeriod) {
    case "Pre-19th Century":
      msg = "A caveman now carries a glowing device!";
      image(cavemanImg, width / 2 - 100, height / 2 + 60, 150, 180);
      break;
    case "19th Century":
      msg = "Steam trains are flying in the sky!";
      image(trainImg, width / 2 - 150, 100, 300, 200);
      break;
    case "20th Century":
      msg = "Orville Wright launches a rocket from the beach!";
      image(rocketImg, width / 2 - 60, 80, 120, 200);
      break;
    case "21st Century":
      msg = "A UFO hovers over Times Square!";
      image(ufoImg, width / 2 - 130, 60, 250, 120);
      break;
    case "Future":
      msg = "You meet your older self outside the house!";
      image(oldSelfImg, 100, height - 280, 100, 200);  // <-- Left side
      break;
  }

  drawTextBox(msg, width / 2, height / 2 + 40, 20, color(255, 100, 100));
}

function drawEndScene() {
  background(10);
  drawTextBox("You've returned to the present (2025). Session ended.", width / 2, height / 2);
}

function drawTimeMachine() {
  if (deloreanImg) {
    image(deloreanImg, width - 350, height - 190, 330, 150);
  }
}

function drawTextBox(msg, x, y, size = 24, txtColor = 255) {
  textSize(size);
  let padding = 10;
  let w = textWidth(msg) + padding * 2;
  let h = size + padding * 1.5;
  fill(0, 150);
  rect(x - w / 2, y - h / 2, w, h, 8);
  fill(txtColor);
  text(msg, x, y);
}

function startTimeTravel() {
  selectedEra = eraSelect.value();
  if (selectedEra === 'Select Time Period') return;
  currentPeriod = selectedEra;
  state = "glitch";
  glitchStartTime = millis();
  travelerVisible = false;
  travelerX = width - 230;
  staticAlpha = 0;
  smallChangeMade = false;
  butterflyVisible = false;
}

function mousePressed() {
  if (state === "arrival" && butterflyVisible) {
    let d = dist(mouseX, mouseY, butterflyX + 30, butterflyY + 25);
    if (d < 30) {
      smallChangeMade = true;
      butterflyVisible = false;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
