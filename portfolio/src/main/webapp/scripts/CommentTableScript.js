async function loadTable() {
    const responseFromServer = await fetch('/load-comment');
    const listComments = await responseFromServer.json();
    const commentTable = document.getElementById('comment-Table');
    var comment;
    commentTable.innerHTML='';
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
        createTagElement('td',comment.topic)
    );
    trElement.appendChild(
        createTagElement('td',comment.messageType)
    );
    trElement.appendChild(
        createTagElement('td',comment.name)
    );
    trElement.appendChild(
        createTagElement('td',comment.email)
    );
    trElement.appendChild(
        createTagElement('td',comment.message)
    );
    return trElement;
}
function createThElement() {
    const trElement = document.createElement('tr');
    trElement.innerHTML = '';
    trElement.appendChild(
        createTagElement('th','Topic')
    );
    trElement.appendChild(
        createTagElement('th','Message Type')
    );
    trElement.appendChild(
        createTagElement('th','Name')
    );
    trElement.appendChild(
        createTagElement('th','Email')
    );
    trElement.appendChild(
        createTagElement('th','Message')
    );
    return trElement;
}

function createTagElement(tag,text){
    const tagElement = document.createElement(tag);
    tagElement.innerText=text;
    return tagElement
}