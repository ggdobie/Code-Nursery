let silcrow = document.querySelector('.silcrow')

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}

function randomRoundNumber(min, max) {
  return Math.round(randomNumber(min, max))
}

function checkFont() {
    return window.getComputedStyle(silcrow, null).getPropertyValue('font-family');
}

let interval = null

const startInterval = function () {
  interval = setInterval(() => {
    
    const silcrowFont = checkFont()
    const fontToVerify = '\"' + 'Anybody Variable' + '\"'
    
    if (silcrowFont == fontToVerify) {
      silcrow.style.setProperty('--weight', randomRoundNumber(100, 900))
      silcrow.style.setProperty('--width', randomRoundNumber(60, 150))
    }
    
  }, 1000)
}

startInterval()