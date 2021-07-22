async function saveCommentUser() {
    const name = document.getElementById('name-input').value;
    const helpful = document.getElementById('helpful-input').value;

    const submitMessage = document.getElementById('submit-container');
    submitMessage.innerHTML = '';

    if (name != '' || helpful != '') {
        const params = new URLSearchParams();
        params.append('name-input', name);
        params.append('helpful-input', helpful);

        fetch('/feedBack-page', {method: 'POST', body: params});

        const text = "Message submitted. Reload the page to show all the comments and if you don't see your comment is because the system detected that is a unhappy message and cannot saved for behavioral reasons.";
        const style = "background-color:#ededed; text-align:center;";
        submitMessage.appendChild(createParagraph(text, style));
        document.getElementById('name-input').value = ''
        document.getElementById('helpful-input').value = ''
    } else {
        const text = "Please fill all the boxes";
        const style = "color: red; background-color:#ededed; text-align:center";
        submitMessage.appendChild(createParagraph(text, style));
    }
}

async function showFeedTable() {
    const params = new URLSearchParams();
    const responseFromServer = await fetch('/comment-user', {method: 'POST', body: params});
    const commentUser = await responseFromServer.json();
    const userTable = document.getElementById('feedback-Table');
    var comment;
    userTable.innerHTML = '';

    if (commentUser.length == 0) {
        userTable.appendChild(noComments());
    } else {
        for (var i=0;i<commentUser.length;++i) {
            comment = commentUser[i];
            userTable.appendChild(createTrElement(comment));
        }
    }
}

function noComments() {
    const text = 'No comments on the feedback: ';
    const style = 'color: white; font-size: 80px; text-align:center;'
    return createParagraph(text, style);
}

function createTrElement(comment) {
    const trElement = document.createElement('tr');
    trElement.innerHTML = '';
    trElement.appendChild(
        createTagElement('td', comment.name));
    trElement.appendChild(
        createTagElement('td', comment.helpful));
    return trElement;
}

function createTagElement(tag, text) {
    const tagElement = document.createElement(tag);
    tagElement.innerText = text;
    return tagElement
}

function createParagraph(text, style) {
    const p = document.createElement('p');
    p.innerText = text;
    p.setAttribute('style', style);
    return p;
}