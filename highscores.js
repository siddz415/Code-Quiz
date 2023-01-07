var storage = JSON.parse(localStorage.getItem('quizHighscores'))
var highscoresContainer = document.querySelector('.highscores-container')

if (storage === null) {
    var h1 = document.createElement('h1')
    h1.textContent = 'No Highscores Yet'
    highscoresContainer.append(h1)
} else {
    highscoresContainer.textContent = ''

    for (var i = 0; i < storage.length; i++) {
        var p = document.createElement('p')
        p.textContent = storage[i].name + ': ' + storage[i].highscore
        highscoresContainer.append(p)
    }
}