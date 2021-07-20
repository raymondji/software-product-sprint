async function saveComment(){
        const params = new URLSearchParams();
        params.append('topic', getTopic());
        params.append('name-input'   , document.getElementById('name-input').value);
        params.append('email-input'  , document.getElementById('email-input').value);
        params.append('message-input', document.getElementById('message-input').value);

        fetch('/new-comment', {
          method: 'POST',
          body: params
        }).then(response => response.text())
        .then((Message) => {
        });
}

function getTopic() {
    URL = window.location.href;
    const topic = URL.substring( URL.indexOf('=') + 1 );
    return topic;
}

async function loadTable() {
    const params = new URLSearchParams();
        params.append('topic',getTopic());
    const responseFromServer = await fetch('/load-comment', 
    {
        method: 'POST',
        body: params
    }
    );
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