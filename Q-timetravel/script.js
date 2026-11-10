// Год, на который возвращается ползунок
const START_YEAR = 1650;

// На сколько лет можно ошибиться, чтобы ответ засчитался
const TOLERANCE = 10;

const slider = document.getElementById("year-slider");
const yearText = document.getElementById("year-value");

let number = 0;     // номер текущего события
let viewer = null;  // панорама


// Кнопка «Начать»
function start() {
  number = 0;
  showEvent();
}


// Кнопка «Следующее событие»
function next() {
  number = number + 1;
  showEvent();
}


// Показываем событие
function showEvent() {
  // Если события закончились — экран завершения
  if (number >= EVENTS.length) {
    document.getElementById("game-screen").hidden = true;
    document.getElementById("finish-screen").hidden = false;
    return;
  }

  document.getElementById("start-screen").hidden = true;
  document.getElementById("finish-screen").hidden = true;
  document.getElementById("game-screen").hidden = false;
  closeInfo();

  // Ползунок в начальное положение
  slider.value = START_YEAR;
  yearText.textContent = START_YEAR;

  // Загружаем 360°-панораму
  if (viewer != null) {
    viewer.destroy();
  }
  viewer = pannellum.viewer("panorama", {
    type: "equirectangular",
    panorama: EVENTS[number].panorama,
    autoLoad: true,
    showControls: false
  });
}


// Ползунок: показываем выбранный год
function showYear() {
  yearText.textContent = slider.value;
}


// Кнопка «Проверить»
function check() {
  const event = EVENTS[number];
  const answer = Number(slider.value);
  const difference = Math.abs(answer - event.year);

  let html = "";

  // Результат
  if (difference <= TOLERANCE) {
    html += "<p>Правильно!</p>";
  } else {
    html += "<p>Неправильно. Разница в годах: " + difference + "</p>";
  }
  html += "<p>Ваш ответ: " + answer + ". Правильный год: " + event.year + "</p>";

  // Название и описание
  html += "<h2>" + event.title + "</h2>";
  html += "<p>" + event.description + "</p>";

  // Референсы
  html += "<h3>Референсы</h3>";
  html += "<p>" + event.references + "</p>";

  document.getElementById("info").innerHTML = html;
  document.getElementById("year-bar").hidden = true;
  document.getElementById("info-panel").hidden = false;
}


// Кнопка «×»
function closeInfo() {
  document.getElementById("info-panel").hidden = true;
  document.getElementById("year-bar").hidden = false;
}
