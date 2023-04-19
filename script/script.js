const header = document.querySelector('header');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const playButton = document.getElementById('playButton');
const board = document.getElementById('board')
const allOptions = document.querySelectorAll('.options');
let turn = 'turnX'
let ifDraw = 0
let victory1 = 0
let victory2 = 0

allOptions.forEach(function (opt) {
  opt.addEventListener('click', function() {
    let viewer = document.getElementById('viewer')
    if (opt.classList.contains('turnX') == false && opt.classList.contains('turnO') == false && opt.classList.contains('verify') == false) {
      switch (turn) {
        case 'turnX':
          opt.classList.add('turnX')
          opt.innerHTML = 'X'
          turn = 'turnO'
          player2.value == '' ? player2.value = 'Player 2' : player2.value = player2.value
          viewer.innerText = 'Vez de ' + player2.value
          viewer.style.color = 'var(--lightRed)'
          opt.style.cursor = 'default'
          ifDraw++
        break
        case 'turnO':
          opt.classList.add('turnO')
          opt.innerHTML = 'O'
          turn = 'turnX'
          viewer.innerText = 'Vez de ' + player1.value
          viewer.style.color = 'var(--lightBlue)'
          opt.style.cursor = 'default'
          ifDraw++
        break
      }
    }

  //VERIFICAÇÃO DO GANHADOR
    if (allOptions[0].classList.contains(allOptions[1].classList[2]) && allOptions[0].classList.contains(allOptions[2].classList[2])) {
      winner([0,1,2])
    }
    else if (allOptions[3].classList.contains(allOptions[4].classList[2]) && allOptions[3].classList.contains(allOptions[5].classList[2])) {
      winner([3,4,5])
    }
    else if (allOptions[6].classList.contains(allOptions[7].classList[2]) && allOptions[6].classList.contains(allOptions[8].classList[2])) {
      winner([6,7,8])
    }
    else if (allOptions[0].classList.contains(allOptions[3].classList[2]) && allOptions[0].classList.contains(allOptions[6].classList[2])) {
      winner([0,3,6])
    }
    else if (allOptions[1].classList.contains(allOptions[4].classList[2]) && allOptions[1].classList.contains(allOptions[7].classList[2])) {
      winner([1,4,7])
    }
    else if (allOptions[2].classList.contains(allOptions[5].classList[2]) && allOptions[2].classList.contains(allOptions[8].classList[2])) {
      winner([2,5,8])
    }
    else if (allOptions[0].classList.contains(allOptions[4].classList[2]) && allOptions[0].classList.contains(allOptions[8].classList[2])) {
      winner([0,4,8])
    }
    else if (allOptions[2].classList.contains(allOptions[4].classList[2]) && allOptions[2].classList.contains(allOptions[6].classList[2])) {
      winner([2,4,6])
    }
    else if (ifDraw >= 9) {
      draw()
    }
  })
})

playButton.addEventListener('click', function() {//PLAY
  header.style.display = 'none';
  board.style.visibility = 'visible';
  player1.value == '' ? player1.value = 'Player 1' : player1.value = player1.value
  viewer.innerText = 'Vez de ' + player1.value;
  viewer.style.color = 'var(--lightBlue)';
})

function winner(option) {//WINNER
  document.getElementById('viewer').remove()
  allOptions[option[0]].style.color = '#00ff80'
  allOptions[option[1]].style.color = '#00ff80'
  allOptions[option[2]].style.color = '#00ff80'
  allOptions.forEach(function (opt) {
    if (opt !== allOptions[option[0]] && opt !== allOptions[option[1]] && opt !== allOptions[option[2]]) {
      opt.innerHTML = ''
      opt.style.cursor = 'default'
      opt.classList.add('verify')
    }
  })

  const winner = document.createElement('p')
  const restartButton = document.createElement('button')
  restartButton.id = 'restartButton'
  restartButton.innerText = 'JOGAR NOVAMENTE'
  let points = document.createElement('p')
  points.id = 'points' 
  allOptions[option[0]].classList[2] == 'turnX' ? victory1++ : victory2++
  points.innerText = victory1 + ' X ' + victory2

  const aside = document.querySelector('aside')
  aside.innerHTML = ''
  allOptions[option[0]].classList[2] == 'turnX' ? winner.innerText = player1.value + ' VENCEU!' : winner.innerText = player2.value + ' VENCEU!'
  winner.style.color = '#00ff80'
  aside.appendChild(winner)
  aside.appendChild(restartButton)
  aside.appendChild(points)

  restartButton.addEventListener('click', function() {//RESTART
    allOptions[option[0]].style.color = ''
    allOptions[option[1]].style.color = ''
    allOptions[option[2]].style.color = ''
    clearForRestart()
  })
}

function draw() {//DRAW
  document.getElementById('viewer').remove()
  const draw = document.createElement('p')
  const restartButton = document.createElement('button')
  restartButton.id = 'restartButton'
  restartButton.innerText = 'JOGAR NOVAMENTE'
  let points = document.createElement('p')
  points.id = 'points'
  points.innerText = victory1 + ' X ' + victory2

  const aside = document.querySelector('aside')
  aside.innerHTML = ''
  draw.innerText = 'EMPATE!'
  aside.appendChild(draw)
  aside.appendChild(restartButton)
  aside.appendChild(points)

  restartButton.addEventListener('click', function() {//RESTART
    clearForRestart()
  })
}

function clearForRestart() {
  ifDraw = 0

  allOptions.forEach(function (opt) {
    const aside = document.querySelector('aside')
    opt.innerHTML = ''
    opt.style.cursor = 'pointer'
    opt.classList.remove('turnX')
    opt.classList.remove('turnO')
    opt.classList.remove('verify')
    aside.innerHTML = ''
    const newViewer = document.createElement('p')
    newViewer.id = 'viewer'
    turn == 'turnX' ? newViewer.innerText = 'Vez de ' + player1.value : newViewer.innerText = 'Vez de ' + player2.value
    turn == 'turnX' ? newViewer.style.color = 'var(--lightBlue)' : newViewer.style.color = 'var(--lightRed)'
    aside.appendChild(newViewer)
  })
}