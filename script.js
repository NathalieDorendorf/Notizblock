let titles = [];
let notes = [];
let titlesTrash = [];
let notesTrash = [];
load();
loadTrash();


function render() {
    let content = document.getElementById('content');
    content.innerHTML = ``;    

    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const note = notes[i];
        
        content.innerHTML += `
            <div class="card">
                <b>Titel: </b><span id="headline ${i}"> ${title} </span>
                <b>Notiz: </b><span id="text ${i}"> ${note} </span>
                <div class="img-note">
                    <img class="img-icon" src="./img/pen.png" onclick="changeNote(${i})">
                    <img class="img-icon" src="./img/trash.png" onclick="moveToTrash(${i})">
                </div>
            </div>
        `;
    }

    showForm();
}


function renderTrash() {    
    let contentTrash = document.getElementById('content');
    contentTrash.innerHTML = ``;

    for (let i = 0; i < titlesTrash.length; i++) {
        const titleTrash = titlesTrash[i];
        const noteTrash = notesTrash [i];

        content.innerHTML += `
            <div class="card">
                <b>Titel: </b><span> ${titleTrash} </span>
                <b>Notiz: </b><span> ${noteTrash} </span>
                <div class="img-note">
                    <img class="img-icon" src="./img/restore.png" onclick="restoreNote(${i})">
                    <img class="img-icon" src="./img/trash.png" onclick="deleteNote(${i})">
                </div>
            </div>
        `;  
    }
}


function addNote() {
    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;
    document.getElementById('title').value = ``;
    document.getElementById('note').value = ``;

    if (title <= 1) {
        return;
    } if (note <= 1) {
        return;
    } else {
        titles.push(title);
        notes.push(note);
    }
    
    save();
    render();
}


function changeNote(i) {
    let editTitle = `in Bearbeitung`;
    let editNote = `in Bearbeitung`;
    
    titles[i] = editTitle;
    notes[i] = editNote;
    
    save();
    render();
}


function moveToTrash(i) {
    titlesTrash.push(titles[i]);
    notesTrash.push(notes[i]);
    
    titles.splice(i, 1);
    notes.splice(i, 1);

    save();
    saveTrash();
    renderTrash();
    render();
}


function openTrash() {
    hideForm();
    loadTrash();
    renderTrash();
}


function restoreNote(i) {
    titles.push(titlesTrash[i]);
    notes.push(notesTrash[i]);

    titlesTrash.splice(i, 1);
    notesTrash.splice(i, 1);

    saveTrash();
    save();
    renderTrash();
}


function deleteNote(i) {
    titlesTrash.splice(i, 1);
    notesTrash.splice(i, 1);
    
    saveTrash();
    renderTrash();
}


function save() {
    let titlesAsText = JSON.stringify(titles);
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('titles', titlesAsText);
    localStorage.setItem('notes', notesAsText);
}


function load() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);    
    }
}


function saveTrash() {
    let titlesTrashAsText = JSON.stringify(titlesTrash);
    let notesTrashAsText = JSON.stringify(notesTrash);
    localStorage.setItem('titlesTrash', titlesTrashAsText);
    localStorage.setItem('notesTrash', notesTrashAsText);
}


function loadTrash() {
    let titlesTrashAsText = localStorage.getItem('titlesTrash');
    let notesTrashAsText = localStorage.getItem('notesTrash');
    if (titlesTrashAsText && notesTrashAsText) {
        titlesTrash = JSON.parse(titlesTrashAsText);
        notesTrash = JSON.parse(notesTrashAsText);    
    }
}


function showMenu() {
    document.getElementById('b-menu').classList.add('showOverlayMenu');
}


function closeMenu() {
    document.getElementById('b-menu').classList.remove('showOverlayMenu');
}


function hideForm() {
    document.getElementById('form').classList.add('hide');
}


function showForm() {
    document.getElementById('form').classList.remove('hide');
}