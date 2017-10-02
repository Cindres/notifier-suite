const JVSDisplayOTron = require('jvsdisplayotron');

const dotHAT = new JVSDisplayOTron.DOTHAT();
const lcd = dotHAT.lcd;
const backlight = dotHAT.backlight;

const clearString = '                                              ';

const clear = () => {
  lcd.setCursorPosition(0,0);
  lcd.write(clearString);
};

const lightsOff = () => {
  backlight.turnOff();
  lcd.setContrast(45);
};

const lightsOn = () => {
  backlight.setToRGB(200, 200, 200);
};

const write = (msg) => {
  clear();
  lcd.setCursorPosition(0, 0);
  lcd.write(msg);
};

const writeLines = (msgs) => {
  clear();
  for (let i = 0; i < 3; i++) {
    const msg = msgs[i];
    if (msg.length > 16) {
      console.log('Message greater than 16 characters');
      return;
    }
    lcd.setCursorPosition(0, i);
    lcd.write(msg);
  }
};

module.exports = {
  clear,
  lightsOff,
  lightsOn,
  write,
  writeLines
};
