// Remove static board references and initialize sessionStorage
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    loadData();
});

let isSelected = null;

const createButton = document.getElementById("createBtn");
const popUpCardElement = document.querySelector(".popUpCard");
const selectBoardElement = document.getElementById("selectBoard");
const selectCardElement = document.getElementById("selectCard");
const createCardBoardButton = document.getElementById("createButton");
const updateModal = document.querySelector(".updateModal");

// Initialize sessionStorage with default boards if empty
function initializeData() {
    if (!sessionStorage.getItem('boards')) {
        const defaultBoards = [
            { id: 'todo', name: 'To Do' },
            { id: 'progress', name: 'In Progress' },
            { id: 'done', name: 'Done' }
        ];
        sessionStorage.setItem('boards', JSON.stringify(defaultBoards));
    }
    if (!sessionStorage.getItem('cards')) {
        sessionStorage.setItem('cards', JSON.stringify([]));
    }
}

// Load boards and cards from sessionStorage
function loadData() {
    const boards = JSON.parse(sessionStorage.getItem('boards'));
    const cards = JSON.parse(sessionStorage.getItem('cards'));

    // Render boards
    boards.forEach(board => createBoardElement(board, false));

    // Render cards
    cards.forEach(card => {
        const boardElement = document.querySelector(`[data-board-id="${card.boardId}"]`);
        if (boardElement) createCardElement(card, boardElement, false);
    });

    updateCount();
}

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


// Modified createBoard function to use sessionStorage
function createBoardElement(boardData, saveToStorage = true) {
    const board = document.createElement('div');
    board.className = 'board';
    board.dataset.boardId = boardData.id;

    const boardHeadingDiv = document.createElement('div');
    boardHeadingDiv.className = 'board-heading';

    const button = document.createElement('button');
    button.className = 'showColor';
    button.style.backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    const h3 = document.createElement('h3');
    h3.textContent = boardData.name;

    const p = document.createElement('p');
    p.className = 'card-count';

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<img class="taskEditDeleteImage" src="./delete-svgrepo-com (1).svg" />';
    deleteButton.style.cssText = 'background: transparent; border: none; cursor: pointer; align-self: center;';

    // Delete board event
    deleteButton.addEventListener('click', () => {
        const boards = JSON.parse(sessionStorage.getItem('boards'));
        const updatedBoards = boards.filter(b => b.id !== boardData.id);
        sessionStorage.setItem('boards', JSON.stringify(updatedBoards));

        const cards = JSON.parse(sessionStorage.getItem('cards'));
        const updatedCards = cards.filter(c => c.boardId !== boardData.id);
        sessionStorage.setItem('cards', JSON.stringify(updatedCards));

        board.remove();
        updateCount();
    });

    // Assemble board
    boardHeadingDiv.append(button, h3, p, deleteButton);
    board.appendChild(boardHeadingDiv);

    // Drag and drop
    board.addEventListener('dragover', e => {
        e.preventDefault();
        const flyingElement = document.querySelector('.flying');
        if (flyingElement) {
            const cardId = flyingElement.dataset.cardId;
            const cards = JSON.parse(sessionStorage.getItem('cards'));
            const card = cards.find(c => c.id === cardId);
            if (card) {
                card.boardId = boardData.id;
                sessionStorage.setItem('cards', JSON.stringify(cards));
            }
            board.appendChild(flyingElement);
            updateCount();
        }
    });

    document.querySelector('main').appendChild(board);
    if (saveToStorage) {
        const boards = JSON.parse(sessionStorage.getItem('boards'));
        boards.push(boardData);
        sessionStorage.setItem('boards', JSON.stringify(boards));
    }
}

const months = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"]

// Modified createCard function to use sessionStorage
function createCardElement(cardData, boardElement, saveToStorage = true) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'Task';
    taskDiv.draggable = true;
    taskDiv.dataset.cardId = cardData.id;
    taskDiv.style.cssText = `padding: 30px 10px; justify-content: space-between; border: 1.5px solid rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255});`;

    // Task content
    const taskContent = document.createElement('div');
    taskContent.style.cssText = 'display: flex; flex-direction: column; align-items: flex-start; gap: 10px;';

    const h4 = document.createElement('h4');
    h4.textContent = cardData.title;

    const p = document.createElement('p');
    p.textContent = cardData.description;

    // Task controls
    const controlsDiv = document.createElement('div');
    controlsDiv.style.cssText = 'display: flex; flex-direction: column; align-items: flex-end; gap: 5px;';

    const date = new Date(cardData.date);
    const datePara = document.createElement('small');
    datePara.textContent = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    const editButton = document.createElement('button');
    editButton.innerHTML = '<img class="taskEditDeleteImage" src="./edit-major-svgrepo-com.svg"  />';
    editButton.style.cssText = "background-color: transparent; border: transparent; cursor: pointer;"

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<img class="taskEditDeleteImage" src="./delete-svgrepo-com (1).svg" />';
    deleteButton.style.cssText = 'background: transparent; border: none; cursor: pointer;';

    // Delete card event
    deleteButton.addEventListener('click', () => {
        const cards = JSON.parse(sessionStorage.getItem('cards'));
        const updatedCards = cards.filter(c => c.id !== cardData.id);
        sessionStorage.setItem('cards', JSON.stringify(updatedCards));
        taskDiv.remove();
        updateCount();
    });

    // Edit card event
    editButton.addEventListener('click', () => {
        updateModal.classList.add("activeModal");
        document.getElementById("updatedTitle").value = cardData.title;
        document.getElementById("updatedDescription").value = cardData.description;

        document.getElementById("saveUpdateButton").onclick = () => {
            const newTitle = document.getElementById("updatedTitle").value.trim();
            const newDesc = document.getElementById("updatedDescription").value.trim();

            if (!newTitle) return alert("Title cannot be empty!");

            // Update DOM
            h4.textContent = newTitle;
            p.textContent = newDesc;

            // Update sessionStorage
            const cards = JSON.parse(sessionStorage.getItem('cards'));
            const cardIndex = cards.findIndex(c => c.id === cardData.id);
            if (cardIndex > -1) {
                cards[cardIndex].title = newTitle;
                cards[cardIndex].description = newDesc;
                cards[cardIndex].date = new Date().toISOString();
                sessionStorage.setItem('cards', JSON.stringify(cards));
            }

            // Update date
            const now = new Date();
            datePara.textContent = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
            updateModal.classList.remove("activeModal");
        };
    });

    // Drag events
    taskDiv.addEventListener('dragstart', () => taskDiv.classList.add('flying'));
    taskDiv.addEventListener('dragend', () => taskDiv.classList.remove('flying'));

    // Assemble elements
    taskContent.append(h4, p);
    controlsDiv.append(datePara, editButton, deleteButton);
    taskDiv.append(taskContent, controlsDiv);
    boardElement.appendChild(taskDiv);

    if (saveToStorage) {
        const cards = JSON.parse(sessionStorage.getItem('cards'));
        cards.push(cardData);
        sessionStorage.setItem('cards', JSON.stringify(cards));
    }
}

// Event Listeners for UI interactions remain mostly the same
createCardBoardButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById("inputCardBoard").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!isSelected) return alert("Please select Card or Board!");
    if (!title) return alert("Title cannot be empty!");
    if (isSelected === "card" && !description) return alert("Description cannot be empty!");

    if (isSelected === "card") {
        const cardData = {
            id: Date.now().toString(),
            boardId: 'todo', // Default to 'To Do' board
            title: title,
            description: description,
            date: new Date().toISOString()
        };
        const boardElement = document.querySelector('[data-board-id="todo"]');
        createCardElement(cardData, boardElement);
    } else {
        const boardData = {
            id: Date.now().toString(),
            name: title
        };
        createBoardElement(boardData);
    }

    document.getElementById("inputCardBoard").value = "";
    document.getElementById("description").value = "";
    popUpCardElement.classList.remove("active");
});

// update the count of the tasks
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

// switch theme - dark to light 
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

// close button to close the popUpCardElement
document.getElementById("closeButton").addEventListener('click', function() {
    popUpCardElement.classList.remove("active")
})

// close the update modal
document.getElementById("modalCloseButton").addEventListener('click', function() {
    updateModal.classList.remove("activeModal")
})

