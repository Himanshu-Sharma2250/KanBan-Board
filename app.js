const createButton = document.getElementById("createBtn")
const popUpCardElement = document.querySelector(".popUpCard")
const selectBoardElement = document.getElementById("selectBoard")
const selectCardElement = document.getElementById("selectCard")
const createCardBoardButton = document.getElementById("createButton")
const boardDiv = document.querySelectorAll(".board")
const todoBoard = document.getElementById("todoBoard")
const noOfCardsInTodo = document.getElementById("totalCardsInTodo")
const noOfCardsInProgress = document.getElementById("totalCardsInProgress")
const noOfCardsInDone = document.getElementById("totalCardsInDone")

selectBoardElement.addEventListener('click', () => {
    selectBoardElement.style.backgroundColor = "crimson"
    selectCardElement.style.backgroundColor = "transparent"
    isSelected = "board"
})

selectCardElement.addEventListener('click', () => {
    selectCardElement.style.backgroundColor = "crimson"
    selectBoardElement.style.backgroundColor = "transparent"
    isSelected = "card"
})

createButton.addEventListener('click', () => {
    popUpCardElement.classList.add("active")

})

createCardBoardButton.addEventListener('click', (event) => {
    const title = document.getElementById("inputCardBoard").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!isSelected) {
        alert("Please select Card or Board!");
        return;
    }

    if (!title) {
        alert("Title cannot be empty")
        return 
    }

    if (isSelected == "card" && !description) {
        alert("Description cannot be empty for cards")
        return 
    }

    if (isSelected == "card") {
        createCard(document.getElementById("inputCardBoard").value, 
        document.getElementById("description").value)
        updateCount()
    }
    else if (isSelected == "board") {
        createBoard(document.getElementById("inputCardBoard").value)
    }

    document.getElementById("inputCardBoard").value = ""
    document.getElementById("description").value = ""

    popUpCardElement.classList.remove("active")
})

function createCard(value, description) {
    const taskDiv = document.createElement('div')
    taskDiv.className = "Task"
    taskDiv.setAttribute("draggable", true)
    taskDiv.style.padding = "30px 10px"
    taskDiv.style.justifyContent = "space-between"

    const taskContent = document.createElement('div')
    taskContent.style.display = "flex"
    taskContent.style.flexDirection = "column"
    taskContent.style.alignItems = "flex-start"

    const deleteDiv = document.createElement('div')
    const deleteButton = document.createElement('button')
    deleteButton.style.backgroundColor = "transparent"
    deleteButton.style.border = "transparent"
    deleteButton.className = "deleteBtn"
    const img = document.createElement('img')
    img.className = "deleteImg"
    img.setAttribute("src", "./delete-svgrepo-com (1).svg")
    img.style.filter = "contrast(0)"
    img.style.height = "15px"
    img.style.width = "15px"
    img.style.background = "transparent"
    img.style.border = "transparent"
    deleteButton.style.cursor = "pointer"
    deleteButton.appendChild(img)
    deleteDiv.appendChild(deleteButton)

    const h4 = document.createElement('h4')
    h4.innerText = value

    const p = document.createElement('p')
    p.innerText = description

    taskContent.appendChild(h4)
    taskContent.appendChild(p)

    taskDiv.appendChild(taskContent)
    taskDiv.appendChild(deleteDiv)

    todoBoard.appendChild(taskDiv)
    updateCount()

    deleteButton.addEventListener('click', () => {
        taskDiv.remove()
        updateCount()
    })

    taskDiv.addEventListener('dragstart', function() {
        taskDiv.classList.add("flying")
        // taskDiv.style.cursor = "grabbing"
    })

    taskDiv.addEventListener('dragend', function() {
        taskDiv.classList.remove("flying")
    })
}

function createBoard(value) {
    const board = document.createElement('div')
    board.className = "board"

    const boardHeadingDiv = document.createElement('div')
    boardHeadingDiv.className = "board-heading"

    const button = document.createElement('button')
    button.className = "showColor"
    button.style.backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    
    const h3 = document.createElement('h3')
    h3.innerText = value

    const p = document.createElement('p')
    p.className = "card-count"

    const deleteButton = document.createElement('button')
    deleteButton.style.backgroundColor = "transparent"
    deleteButton.style.border = "transparent"
    const img = document.createElement('img')
    img.setAttribute("src", "./delete-svgrepo-com (1).svg")
    img.style.filter = "contrast(0)"
    img.style.height = "15px"
    img.style.width = "15px"
    img.style.background = "transparent"
    img.style.border = "transparent"
    deleteButton.appendChild(img)
    deleteButton.style.cursor = "pointer"
    deleteButton.style.alignSelf = "center"
    deleteButton.style.display = "flex"
    deleteButton.style.alignItems = "flex-end"

    boardHeadingDiv.appendChild(button)
    boardHeadingDiv.appendChild(h3)
    boardHeadingDiv.appendChild(p)
    boardHeadingDiv.appendChild(deleteButton)
    
    board.appendChild(boardHeadingDiv)

    deleteButton.addEventListener('click', () => {
        board.remove()
    })

    document.querySelector("main").appendChild(board)
    updateCount()

    board.addEventListener('dragover', () => {
        const flyingElement = document.querySelector(".flying")

        board.appendChild(flyingElement)
        updateCount()
    })
}

boardDiv.forEach((board) => {
    board.addEventListener('dragover', () => {
        const flyingElement = document.querySelector(".flying")

        board.appendChild(flyingElement)
        updateCount()
    })
})

function updateCount() {
    const allBoards = document.querySelectorAll(".board")
    allBoards.forEach((board) => {
        const TotalCards = board.querySelectorAll(".Task").length
        const cardCount = board.querySelector(".card-count")
        // console.log(cardCount)
        // console.log(TotalCards)
        if (cardCount) {
            cardCount.innerText = TotalCards
        }
    })
}

const toggleButton = document.getElementById("toggleButton")
toggleButton.addEventListener('click', function() {
    if (toggleButton.innerText == "Dark Mode") {
        document.querySelector("body").style.backgroundColor = "black"
        document.querySelector("body").style.color = "ghostwhite"

        toggleButton.innerText = 'Light Mode'
        toggleButton.style.border = "1px solid ghostwhite"
        toggleButton.style.backgroundColor = "ghostwhite"
        toggleButton.style.color = "black"

        
    }
    else {
        document.querySelector("body").style.backgroundColor = "white"
        document.querySelector("body").style.color = "black"
        
        toggleButton.innerText = 'Dark Mode'
        toggleButton.style.backgroundColor = "rgb(0, 0, 31)"
        toggleButton.style.color = "ghostwhite"
    }
})

document.getElementById("closeButton").addEventListener('click', function() {
    popUpCardElement.classList.remove("active")
})

window.addEventListener('beforeunload', function(event) {
    event.preventDefault()

    // event.returnValue = true
})