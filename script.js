
 const width = 28
 const grid = document.querySelector('.grid')
 const scoreDisplay = document.getElementById('score')

let squares =[]

let score = 0

//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty
 const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
 ]

 // create board 

 function createBoard() {
     for( let i = 0; i < layout.length; i++){
            const square = document.createElement('div')
            grid.appendChild(square)
             squares.push(square)
            if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if(layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } 
        else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        } else if (layout[i] === 4) {
            squares[i].classList.add('empty')
        } 
     }
 }

createBoard()

let pacManCurrentIndex = 490

squares[pacManCurrentIndex].classList.add('pacman')

function control(e){
 squares[pacManCurrentIndex].classList.remove('pacman')
    switch(e.keyCode){
        case 40:
        //'pressed down'
        
        if (
            !moveContainsGhostLair(pacManCurrentIndex + width)
            // !squares[pacManCurrentIndex + width].classList.contains('ghost-lair')
            &&
            !moveContainsWalls(pacManCurrentIndex + width)
            // !squares[pacManCurrentIndex + width].classList.contains('wall')
            &&
            pacManCurrentIndex + width < width * width) {
            
                pacManCurrentIndex += width
        }
        break
        case 38: 
        //'pressed up'
        if (
            !moveContainsGhostLair(pacManCurrentIndex - width)
            // !squares[pacManCurrentIndex - width].classList.contains('ghost-lair')
            &&
            !moveContainsWalls(pacManCurrentIndex - width)
            // !squares[pacManCurrentIndex - width].classList.contains('wall')
            &&
            pacManCurrentIndex - width >= 0) {
            
                pacManCurrentIndex -= width
        }
        break
        case 37:
        //'pressed left'
        if (
            !moveContainsGhostLair(pacManCurrentIndex - 1)
            // !squares[pacManCurrentIndex - 1].classList.contains('ghost-lair')
            &&
            !moveContainsWalls(pacManCurrentIndex - 1)
            // !squares[pacManCurrentIndex - 1].classList.contains('wall')
            &&
            pacManCurrentIndex % width !== 0) {
            
                pacManCurrentIndex -= 1
                if(pacManCurrentIndex === 364) {
                    pacManCurrentIndex = 391
                }
                
        }
        break
        case 39:
        //'pressed right'
        if (
            !moveContainsGhostLair(pacManCurrentIndex + 1)
            // !squares[pacManCurrentIndex + 1].classList.contains('ghost-lair')
            &&
            !moveContainsWalls(pacManCurrentIndex + 1)
            // !squares[pacManCurrentIndex +1].classList.contains('wall')
            &&
            pacManCurrentIndex % width < width -1) {
            
                pacManCurrentIndex +=1
                if(pacManCurrentIndex === 391) {
                    pacManCurrentIndex = 364
                }
        }
        break
    }
    squares[pacManCurrentIndex].classList.add('pacman')
pacDotEaten()
powerPelletEaten()
checkIfgameOver()
checkForWin()
   
}

document.addEventListener('keyup', control)

function pacDotEaten() {
    if(squares[pacManCurrentIndex].classList.contains('pac-dot')) {
        
        squares[pacManCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score
    }
}

class Ghost {
    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

function powerPelletEaten() {
    if(squares[pacManCurrentIndex].classList.contains('power-pellet')){
        squares[pacManCurrentIndex].classList.remove('power-pellet')
    score += 10
    ghosts.forEach((ghost)=> {
        ghost.isScared = true
    })
    setTimeout(unScareGhosts, 10000)
    } 
}

function unScareGhosts() {
    ghosts.forEach((ghost)=> {
        ghost.isScared = false
    })
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]


ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

ghosts.forEach(ghost => { 
      moveGhost(ghost)
    })

function moveGhost(ghost) {
    console.log('moved ghost')
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random()* directions.length)]
    console.log(direction)

    ghost.timerId = setInterval(function(){
        if(!squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')){
                squares[ghost.currentIndex].classList.remove(ghost.className)
                squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
                ghost.currentIndex += direction
                squares[ghost.currentIndex].classList.add(ghost.className)
                squares[ghost.currentIndex].classList.add('ghost')
        } else {
            direction = directions[Math.floor(Math.random() * directions.length)]
    }

    if(ghost.isScared){
        squares[ghost.currentIndex].classList.add('scared-ghost')
    }

    if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score +=100  
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }

    }, ghost.speed)

    
} 



function checkIfgameOver(){
    if(squares[pacManCurrentIndex].classList.contains('ghost')
    && !squares[pacManCurrentIndex].classList.contains('scared-ghost')
    ){
        stopGame()
        scoreDisplay.innerHTML = 'You LOSE!'

    }

}

function checkForWin(){
    if(score === 274 || score > 274){
       stopGame()
        scoreDisplay.innerHTML = 'You have WON!'
    }
}

function stopGame(){
 ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
}

function moveContainsGhostLair(indexToCheck){
    return squares[indexToCheck].classList.contains('ghost-lair')
}

function moveContainsWalls(indexToCheck){
    return squares[indexToCheck].classList.contains('wall')
}