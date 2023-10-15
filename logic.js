document.addEventListener("DOMContentLoaded", ()=> {
  
    //class grid in our html code would be a const named grid
    const grid = document.querySelector('.grid')
    
    //create divs inside div with the class = "grid"
    //for loop to create all 200 divs
    for (let i = 0; i < 200; i++) {
        const div = document.createElement('div');
        grid.appendChild(div);
    }
    for (let i = 0; i < 10; i++) {
        const div = document.createElement('div');
        div.classList.add('occupied'); // Add the 'occupied' class to the div
        grid.appendChild(div);
    }
    
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const StartButton = document.querySelector('#start-button')
    const ScoreDisplay = document.querySelector('#score')
    const width = 10
    let timerId

    console.log(squares)
     //The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const TheTetrominoes = [lTetromino,zTetromino,tTetromino,iTetromino]

  let startingPosition = 4
  let startingRotation = 0

  let random = Math.floor(Math.random()*TheTetrominoes.length)
  let current = TheTetrominoes[random][startingRotation]

  function draw() {
    current.forEach(item => {
        squares[startingPosition + item].classList.add('tetromino')
    })
  }

  function undraw() {
    current.forEach(item => {
        squares[startingPosition + item].classList.remove('tetromino')
    })
  }

//move down interval
//time = setInterval(moveDown,1000)

//make input to the document
document.addEventListener("keydown", control)

//inputs
function control(e) {
  if (e.keyCode === 37) 
  {
    moveLeft()
  }
  else if (e.keyCode === 38)
  {
    rotate()
  }
  else if (e.keyCode === 39)
  {
    moveRight()
  }
  else if (e.keyCode === 40)
  {
    moveDown()
  }
}



function moveDown(){
    undraw()
    startingPosition += width
    draw()
    freeze()
}

//freeze the tetromino
function freeze() {
    if(current.some(item => squares[startingPosition + item + width].classList.contains('occupied')))
    {
        current.forEach(item => squares[startingPosition + item].classList.add('occupied'))
       
        random = Math.floor(Math.random()*TheTetrominoes.length)
        current = TheTetrominoes[random][startingRotation]
        startingPosition = 4
        draw()
    }

}


//move left
function moveLeft() {
  undraw()
  const isAtLeftEdge = current.some(item => (startingPosition + item)% width === 0 )
  
  if(!isAtLeftEdge) startingPosition -= 1

  if(current.some(item => squares[startingPosition + item].classList.contains('occupied'))){
    startingPosition +=1
  }

  draw()
}

function moveRight(){
  undraw()
  const isAtRightEdge = current.some(item => (startingPosition + item)% width === width - 1)
  if(!isAtRightEdge) startingPosition += 1

  if(current.some(item => squares[startingPosition + item].classList.contains('occupied'))){
    startingPosition -=1
}
  draw()
}

//rotate
function rotate(){
  undraw()
  startingRotation++
  if(startingRotation === 4){
    startingRotation = 0 
  }
  current = TheTetrominoes[random][startingRotation]
  draw()

}

StartButton.addEventListener('click',()=>{
if (timerId)
{
clearInterval(timerId)
timerId = null
}
else
{
draw()
timerId = setInterval(moveDown, 1000)
}

})




});