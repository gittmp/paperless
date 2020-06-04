async function getTopNews(size, country){

    let url = 'https://newsapi.org/v2/top-headlines?apiKey=cb527766d5474d5ebcccd51023d032bf&country=' + country + '&pagesize=' + String(size);

    let result = await fetch(url)
        .then(function (response) {
            return response.json();
        })

    return result
}

async function getPreview(obj){
    return {
        'source': obj.source.name,
        'author': obj.author,
        'title': obj.title,
        'desc': obj.description,
        'url': obj.url,
        'image': obj.urlToImage,
    }
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
    "Morning Star": 'Far Left',
    "CNN": 'Left',
    "The Guardian": 'Left',
    "The Mirror": 'Left',
    "Daily Mirror": 'Left',
    "Mirror Online": 'Left',
    "The Star": 'Left',
    "Metro.co.uk": 'Left',
    "Metro": 'Left',
    "The Independent": 'Left',
    "Wales Online": 'Left',
    "The Observer": 'Slight Left',
    "Sky News": 'Center',
    "The Financial Times": 'Center',
    "Financial Times": 'Center',
    "BBC News": 'Center',
    "The Times": 'Slight Right',
    "The Sunday Times": 'Slight Right',
    "The Telegraph": 'Right',
    "The Sun": 'Right',
    "The Daily Express": 'Right',
    "Express": 'Right',
    "Express.co.uk": 'Right',
    "Daily Mail": 'Far Right'
}

async function loadPage(size, country){

    let news = await getTopNews(size, country);
    let html = '';

    if(news.status == "ok"){
        let rowCount = Math.floor(size/4);
        let remainder = size % 4;
        let k = 0;

        html = '<div class="row">';

        for(let i = 0; i < 4; i++){

            html += '<div class="column">';

            let lim = rowCount;
            if(remainder > 0){
                lim++;
                remainder--;
            }

            for(let j = 0; j < lim; j++){

                let article = news.articles[k];
                let preview = await getPreview(article);

                html += '<div class="articles">';
                html += '<a target="_blank" href="' + preview.url + '">';
                html += '<img src="' + preview.image + '" alt="article' + k + 'image" class="image" width="600" height="400">';
                html += '<div class="desc" style="font-weight: bold; font-size: 14px;">' + preview.title + '</div>';
                html += '<div class="desc">' + preview.desc + '</div>';
                html += '<div class="desc">Source: ' + preview.source + '<br>';

                if(preview.source in biasChart){
                    html += '(Known bias: ' + biasChart[preview.source] + ')</div>';
                } else {
                    html += '(Bias unknown)</div>';
                }

                html += '</a> </div>';

                k++;
            }
            html += '</div>';
        }
    } else {
        html += '<strong>Error!</strong><br><strong>Code:</strong> ' + news.code + '<br><strong>Message:</strong> ' + news.message;
    }

    document.getElementById("content").innerHTML = html;

}