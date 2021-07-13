

async function loadTopics(){
    const responseFromServer = await fetch('/get-topics');
    const topicData = await responseFromServer.json();

    // const recommendedTopics = [0, 1, 2]
    // setTopicData(recommendedTopics, 1, topicData);
    // setTopicData(recommendedTopics, 2, topicData);
    // setTopicData(recommendedTopics, 3, topicData);
    const event_handler = (argument) =>searchHandler(argument)
    document.getElementById("search-bar").addEventListener("input", (event) => event_handler(topicData))
    return topicData
}

// function setTopicData(recommendedTopics, topicNum, topicData){
//     var topicTitle = document.getElementById('topic-'+topicNum+'-title');
//     var topicImg = document.getElementById('topic-'+topicNum+'-img');
//     var topicDesc = document.getElementById('topic-'+topicNum+'-desc');

//     topicTitle.innerHTML=topicData.topics[recommendedTopics[topicNum-1]].title
//     topicDesc.innerHTML=topicData.topics[recommendedTopics[topicNum-1]].desc
//     topicImg.src= 'images/'+topicData.topics[recommendedTopics[topicNum-1]].id+'.png'
// }

function createSearchItem(topicIndex, topicData){
    let link = document.createElement("a");
    let topicTitle = topicData.topics[topicIndex].title;
    let topicId = topicData.topics[topicIndex].id;
    link.href = "/topics/"+topicId+".html"

    let element = document.createElement("div");
    element.className = "filter-element"
    element.innerHTML = topicTitle

    link.appendChild(element)
    document.getElementById("search-container").appendChild(link)
}

function createTopicCard(topicNum, topicData){
    console.log(topicNum)
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
    searchResults.forEach(index => createTopicCard(index, topicData))

    //console.log(searchResults)
}

function getMatchingCardIndexes(topicData, searchStr){
    let titles = []
    let titleLen = topicData.topics.length;
    let titleIndex = 0;
    
    while(titleIndex < titleLen){
        // console.log(titleIndex)
        // console.log(topicData.topics[titleIndex])
        if(topicData.topics[titleIndex].title.indexOf(searchStr) != -1 || searchStr === ""){
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


const topicData = loadTopics();
//console.log(topicData)
