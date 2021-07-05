async function getTopics(){const responseFromServer = await fetch('/get-topics');
const topicData = await responseFromServer.json();
console.log(topicData)
}


getTopics()
