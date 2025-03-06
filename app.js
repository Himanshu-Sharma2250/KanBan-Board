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
const updateModal = document.querySelector(".updateModal")

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
const months = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"]

function createCard(value, description) {
    // task container stores two more container
    const taskDiv = document.createElement('div')
    taskDiv.className = "Task"
    taskDiv.setAttribute("draggable", true)
    taskDiv.style.padding = "30px 10px"
    taskDiv.style.justifyContent = "space-between"
    taskDiv.style.border = `1.5px solid rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`

    // first inner task container store head and para
    const taskContent = document.createElement('div')
    taskContent.style.display = "flex"
    taskContent.style.flexDirection = "column"
    taskContent.style.alignItems = "flex-start"
    taskContent.style.justifyContent = "space-around"

    const h4 = document.createElement('h4')
    h4.innerText = value

    const p = document.createElement('p')
    p.innerText = description

    taskContent.appendChild(h4)
    taskContent.appendChild(p)

    // second inner task container stores date, edit and delete data
    const deleteDiv = document.createElement('div')
    deleteDiv.style.display = "flex"
    deleteDiv.style.flexDirection = "column"
    deleteDiv.style.gap = "5px"
    deleteDiv.style.alignItems = "flex-end"

    // display date
    const now = new Date()
    const nowHour = now.getHours()
    const nowMinute = now.getMinutes()
    const minutes = nowMinute < 10 ? `0${nowMinute}` : nowMinute
    const nowDate = now.getDate()
    const nowMonth = months[now.getMonth()]
    const nowYear = now.getFullYear()
    const datePara = document.createElement('small')
    datePara.textContent = `${nowHour}:${minutes}, ${nowDate} ${nowMonth} ${nowYear}`

    // edit button with image
    const editButton = document.createElement('button')
    editButton.className = "editButton"
    const editImage = document.createElement('img')
    editImage.className = "taskEditDeleteImage"
    editImage.setAttribute("src", "./edit-major-svgrepo-com.svg")
    
    editButton.appendChild(editImage)

    // delete button with image
    const deleteButton = document.createElement('button')
    deleteButton.style.backgroundColor = "transparent"
    deleteButton.style.border = "transparent"
    // deleteButton.className = "deleteBtn"
    const img = document.createElement('img')
    img.className = "taskEditDeleteImage"
    img.setAttribute("src", "./delete-svgrepo-com (1).svg")
    deleteButton.style.cursor = "pointer"

    deleteButton.appendChild(img)

    // append childs of deleteDiv
    deleteDiv.appendChild(datePara)
    deleteDiv.appendChild(editButton)
    deleteDiv.appendChild(deleteButton)

    taskDiv.appendChild(taskContent)
    taskDiv.appendChild(deleteDiv)

    todoBoard.appendChild(taskDiv)
    updateCount()

    deleteButton.addEventListener('click', () => {
        taskDiv.remove()
        updateCount()
    })

    editButton.addEventListener('click', function() {
        updateModal.classList.add("activeModal")

        document.getElementById("updatedTitle").value = value
        document.getElementById("updatedDescription").textContent = description

        
        document.getElementById("saveUpdateButton").addEventListener('click', function() {
            const updatedTitle = document.getElementById("updatedTitle").value
            const updateDescription = document.getElementById("updatedDescription").value

            h4.innerText = updatedTitle
            p.innerText = updateDescription

            const now = new Date()
            const nowHour = now.getHours()
            const nowMinute = now.getMinutes()
            const minutes = nowMinute < 10 ? `0${nowMinute}` : nowMinute
            const nowDate = now.getDate()
            const nowMonth = months[now.getMonth()]
            const nowYear = now.getFullYear()
            // const datePara = document.createElement('small')
            datePara.textContent = `${nowHour}:${minutes}, ${nowDate} ${nowMonth} ${nowYear}`

            updateModal.classList.remove("activeModal")
        })
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
    img.className = "taskEditDeleteImage"
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

document.getElementById("modalCloseButton").addEventListener('click', function() {
    updateModal.classList.remove("activeModal")
})

