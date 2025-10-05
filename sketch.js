// Dimensioni canvas
let xMax = 500;
let yMax = 800;

// Variabili per animazione
let pencilX = 50;
let pencilY = 400;
let linePoints = []; // memorizza i punti disegnati

function setup() {
  createCanvas(xMax, yMax);
  frameRate(60);
}

function draw() {
  background("#f0f0f0");

  // Mostra coordinate mouse
  fill(0);
  textSize(14);
  text("mouseX: " + mouseX + ", mouseY: " + mouseY, 20, 20);

  // --- Disegna la linea già tracciata ---
  stroke(0);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let p of linePoints) {
    vertex(p.x, p.y);
  }
  endShape();

  // --- Aggiorna posizione della matita ---
  pencilX += 2; // velocità orizzontale
  if (pencilX > width - 50) {
    pencilX = 50; // reset posizione
    linePoints = []; // cancella linea
  }

  // Salva il punto della mina per disegnare la linea
  let tipX = pencilX;
  let tipY = pencilY - 80;
  linePoints.push({ x: tipX, y: tipY });

  // --- Disegna la matita ---
  drawPencil(pencilX, pencilY);
}

function drawPencil(x, yBase) {
  let bodyWidth = 50;
  let bodyHeight = 400;

  // Corpo
  fill("#fcbf49");
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER);
  rect(x, yBase + bodyHeight / 2 - 80, bodyWidth, bodyHeight);

  // Punta (legno)
  noStroke();
  fill("#d4a373");
  triangle(
    x - bodyWidth / 2, yBase,
    x + bodyWidth / 2, yBase,
    x, yBase - 80
  );

  // Mina (nera)
  fill(0);
  triangle(
    x - 8, yBase - 60,
    x + 8, yBase - 60,
    x, yBase - 80
  );

  // Bordino metallico
  fill(180);
  stroke(0);
  rect(x, yBase + bodyHeight - 80 + 15, bodyWidth, 20);

  // Gomma rosa
  noStroke();
  fill("#e07a5f");
  rect(x, yBase + bodyHeight - 80 + 35, bodyWidth, 30, 5);
}