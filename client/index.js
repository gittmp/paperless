async function getTopNews(){
    let country = "uk";
    let maxx = "10";
    let url = 'https://gnews.io/api/v3/top-news?token=f8a1d2762bc45f61fb0c0901c8f0f932&country=' + country + '&max=' + maxx;

    let result = await fetch(url)
        .then(function (response) {
            return response.json();
        })

    return result
}

async function getPreview(url){
    var data = {key: '5016f752ac0a6dacd1bb14f10f190791', q: url}

    let preview = await fetch('https://api.linkpreview.net', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
    })
        .then(res => res.json())

    return preview;
}

async function getTopic(topic){
    let country = "uk";
    let maxx = "10";
    let url = 'https://gnews.io/api/v3/topics/' + topic + '?token=f8a1d2762bc45f61fb0c0901c8f0f932&country=' + country + '&max=' + maxx;

    let result = await fetch(url)
        .then(function (response) {
            return response.json();
        })

    return result
}

const topicList = [
    "World",
    "Nation",
    "Business",
    "Technology",
    "Entertainment",
    "Sports",
    "Science",
    "Health"
]

const biasChart = {
    "HuffPost": 'Far Left',
    "HuffPost UK": 'Far Left',
    "Huffington Post": 'Far Left',
    "CNN": 'Left',
    "The Guardian": 'Left',
    "The Mirror": 'Left',
    "The Star": 'Left',
    "The Independent": 'Left',
    "Wales Online": 'Left',
    "Sky News": 'Center',
    "The Financial Times": 'Center',
    "BBC News": 'Center',
    "The Times": 'Right',
    "The Telegraph": 'Right',
    "The Sun": 'Right',
    "The Daily Express": 'Right',
    "Daily Mail": 'Far Right'
}

async function loadPage(){

    let news = await getTopNews();
    let rowCount = Math.floor(news.articleCount/4);
    let remainder = news.articleCount % 4;
    let k = 0;

    let html = '<div class="row">';


    for(let i = 0; i < 4; i++){

        html += '<div class="column">';

        let lim = rowCount;
        if(remainder > 0){
            lim++;
            remainder--;
        }

        for(let j = 0; j < lim; j++){

            console.log(k, news.articles[k]);
            let article = news.articles[k];
            let preview = await getPreview(article.url);

            html += '<div class="articles">';
            html += '<a target="_blank" href="' + preview.url + '">';
            html += '<img src="' + preview.image + '" alt="article' + k + 'image" class="image" width="600" height="400">';
            html += '<div class="desc" style="font-weight: bold; font-size: 14px;">' + preview.title + '</div>';
            html += '<div class="desc">' + preview.description + '</div>';
            html += '</a> </div>';

            k++;
        }

        html += '</div>';
    }

    document.getElementById("content").innerHTML = html;

  }