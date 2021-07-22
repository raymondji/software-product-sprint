//functions to new-comment servlet
async function saveComment() {

    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const message = document.getElementById('message-input').value;

    const submitMessage = document.getElementById('submit-container');
    submitMessage.innerHTML = '';

    if (name != '' && email != '' && message != '') {
        const params = new URLSearchParams();
        params.append('topic', getTopic());
        params.append('name-input', name);
        params.append('email-input', email);
        params.append('message-input', message);

        fetch('/new-comment',
            {
                method: 'POST',
                body: params
            }
        );
        const text = "Message submitted. Reload the page to show all the comments and if you don't see your comment is because the system detected that is a unhappy message and cannot saved for behavioral reasons.";
        const style = "background-color:#ededed; text-align:center;";
        submitMessage.appendChild(
            createParagraph(text, style)
        );
        document.getElementById('name-input').value = ''
        document.getElementById('email-input').value = ''
        document.getElementById('message-input').value = ''
    }
    else {
        const text = "Please fill all the boxes";
        const style = "color: red; background-color:#ededed; text-align:center;";
        submitMessage.appendChild(
            createParagraph(text, style)
        );
    }

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

//functions to load-comment servlet

async function loadTable() {
    const params = new URLSearchParams();
    params.append('topic', getTopic());
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

    if (listComments.length == 0) {
        commentTable.appendChild(
            noComments()
        );
    }
    else {
        for (var i = 0; i < listComments.length; i++) {
            comment = listComments[i];
            commentTable.appendChild(
                createTrElement(comment)
            );
        }
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
function noComments() {
    const text = 'No comments on the topic: ' + getTopic();
    const style = 'color: white; font-size: 80px; text-align:center;'
    return createParagraph(text, style);
}

//functions useful and generally
function getTopic() {
    URL = window.location.href;
    const topic = URL.substring(URL.indexOf('=') + 1);
    return topic;
}
function createParagraph(text, style) {
    const p = document.createElement('p');
    p.innerText = text;
    p.setAttribute('style', style);
    return p;
}
