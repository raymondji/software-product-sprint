document.getElementById('submitBtn').addEventListener("input", saveComment());

async function saveComment(){
        
        const nameValue    = document.getElementsByName('name-input').values;
        const emailValue   = document.getElementsByName('email-input').value;
        const messageType = document.getElementsByName('messageType').value;
        const messageValue = document.getElementsByName('message-input').value;
        console.log(nameValue);
        console.log(emailValue);
        console.log(messageType);
        console.log(messageValue);

        const params = new URLSearchParams();
        console.log(params);
        params.append('text', text);
        params.append('name-input',nameValue);
        params.append('email-input',emailValue);
        params.append('messageType',messageType);
        params.append('message-input',messageValue);

        fetch('/new-comment', {
          method: 'POST',
          body: params
        }).then(response => response.text())
        .then((Message) => {
        });
}

async function loadTable() {
    const responseFromServer = await fetch('/load-comment');
    const listComments = await responseFromServer.json();    
    const commentTable = document.getElementById('comment-Table');
    var comment;
    commentTable.innerHTML = '';
    commentTable.appendChild(
        createThElement()
    );
    for (var i = 0; i < listComments.length; i++) {
        comment = listComments[i];
        commentTable.appendChild(
            createTrElement(comment)
        );
    }
}

function createTrElement(comment) {
    const trElement = document.createElement('tr');
    trElement.innerHTML = '';
    trElement.appendChild(
        createTagElement('td', comment.topic)
    );
    trElement.appendChild(
        createTagElement('td', comment.messageType)
    );
    trElement.appendChild(
        createTagElement('td', comment.name)
    );
    trElement.appendChild(
        createTagElement('td', comment.email)
    );
    trElement.appendChild(
        createTagElement('td', comment.message)
    );
    return trElement;
}
function createThElement() {
    const trElement = document.createElement('tr');
    trElement.innerHTML = '';
    trElement.appendChild(
        createTagElement('th', 'Topic')
    );
    trElement.appendChild(
        createTagElement('th', 'Message Type')
    );
    trElement.appendChild(
        createTagElement('th', 'Name')
    );
    trElement.appendChild(
        createTagElement('th', 'Email')
    );
    trElement.appendChild(
        createTagElement('th', 'Message')
    );
    return trElement;
}

function createTagElement(tag, text) {
    const tagElement = document.createElement(tag);
    tagElement.innerText = text;
    return tagElement

}
function checkNotEmpty(form) {
    var input = form.value;
    const warning = document.getElementById('warning');
    if (input == null || input == '')
        warning.innerText = '*Don\'t forget fill me';
    else
        warning.innerText = '';
} function checkNotEmpty1(form) {
    var input = form.value;
    const warning = document.getElementById('warning-1');
    if (input == null || input == '')
        warning.innerText = '*Don\'t forget fill me';
    else
        warning.innerText = '';
}
function checkNotEmpty2(form) {
    var input = form.value;
    const warning = document.getElementById('warning-2');
    if (input == null || input == '')
        warning.innerText = '*Don\'t forget fill me';
    else
        warning.innerText = '';
}