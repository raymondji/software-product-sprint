

async function loadTopics(){
    var url = 'https://storage.googleapis.com/jmorrison-sps-summer21.appspot.com/topic-list.json';
    
    //slip around CORS
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send();

    //Actually get the JSON
    const getJSON = async () => {
        const response = await fetch(url);  
        return await response.json();
    }

    //set up the event handler with input
    const topicData =  await getJSON()
    const event_handler = (argument) =>searchHandler(argument)
    document.getElementById("search-bar").addEventListener("input", (event) => event_handler(topicData))
    
    //do the initial loading
    searchHandler(topicData)
    return topicData
}


function showNoResultsMessage(searchStr){
    let message = document.createElement("h1");
    message.innerHTML = "No results found for '"+searchStr+"'";
    message.classList.add("no-topics-text");
    document.getElementById("topic-container").appendChild(message);
}

function createTopicCard(topicNum, topicData){
    let card = document.createElement("div");
    var title = document.createElement("h2");
    var img = document.createElement("img");
    var desc = document.createElement("p");
    var button = document.createElement("a");
    var imgContainer = document.createElement("div");

    imgContainer.classList.add("topic-img-container")
    button.classList.add("topic-btn")
    card.classList.add("topic-card")

    title.innerHTML=topicData.topics[topicNum].title
    desc.innerHTML=topicData.topics[topicNum].desc
    img.src= 'images/'+topicData.topics[topicNum].id+'.png'
    img.alt = "topic "+topicNum+" image"
    button.innerHTML = "LEARN MORE"
    button.href = "/topics/"+topicData.topics[topicNum].id+".html"

    imgContainer.appendChild(img);
    card.appendChild(title);
    card.appendChild(imgContainer);
    card.appendChild(desc);
    card.appendChild(button);

    document.getElementById("topic-container").appendChild(card)
}

function searchHandler(topicData){
    clearCards()

    const searchStr = document.getElementById("search-bar").value

    var searchResults = getMatchingCardIndexes(topicData, searchStr)
    console.log(searchResults)
    if(searchResults.length == 0) showNoResultsMessage(searchStr)
    else searchResults.forEach(index => createTopicCard(index, topicData))
}

function getMatchingCardIndexes(topicData, searchStr){
    let titles = []
    let titleLen = topicData.topics.length;
    let titleIndex = 0;
    
    while(titleIndex < titleLen){
        if(topicData.topics[titleIndex].title.toUpperCase().indexOf(searchStr.toUpperCase()) != -1 || searchStr === ""){
            titles.push(titleIndex);
        }
        titleIndex++;
    }
    return titles;
}

function clearCards() {
    const parent = document.getElementById("topic-container")
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


loadTopics();


