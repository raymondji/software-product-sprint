async function loadTopics(){
    const responseFromServer = await fetch('/get-topics');
    const topicData = await responseFromServer.json();

    //maybe have this randomly select from the set without replacement?
    const recommendedTopics = [0, 1, 2]
    setTopicData(recommendedTopics, 1, topicData);
    setTopicData(recommendedTopics, 2, topicData);
    setTopicData(recommendedTopics, 3, topicData);
    return topicData
}

function setTopicData(recommendedTopics, topicNum, topicData){
    var topicTitle = document.getElementById('topic-'+topicNum+'-title');
    var topicImg = document.getElementById('topic-'+topicNum+'-img');
    var topicDesc = document.getElementById('topic-'+topicNum+'-desc');

    topicTitle.innerHTML=topicData.topics[recommendedTopics[topicNum-1]].title
    topicDesc.innerHTML=topicData.topics[recommendedTopics[topicNum-1]].desc
    topicImg.src= 'images/'+topicData.topics[recommendedTopics[topicNum-1]].id+'.png'
}

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


async function main(){
    const topicData = await loadTopics();
    createSearchItem(0, topicData)
}


main()






