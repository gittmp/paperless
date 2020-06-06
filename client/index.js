async function getTopNews(size, country){

    let url = 'https://newsapi.org/v2/top-headlines?apiKey=cb527766d5474d5ebcccd51023d032bf&country=' + country + '&pagesize=' + String(size);

    let result = await fetch(url, {
        method: 'GET'
        })
        .then(response => response.json())
        .catch((error) => {
            console.error('Error:', error);
            return error;
    });

    return result;
}

async function getTopNews2(limit, country){ //%20OR%20title%3AUK
    let url = 'https://api.newsriver.io/v2/search?query=language%3AEN%20AND%20(website.domainName%3Abbc.co.uk)&sortBy=discoverDate&sortOrder=DESC&limit=' + String(limit);
    const token = 'sBBqsGXiYgF0Db5OV5tAwypVCIPW_sVl7GCQx0RUezHZZuTSmzmITA0VmFNNAWN0n2pHZrSf1gT2PUujH1YaQA'
    
    let result = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': token,
        }})
        .then(response => response.json())
        .catch((error) => {
            console.error('Error:', error);
            let index = String(error).indexOf(":");
            return {
                'status': "error",
                'code': String(error).substring(0, index),
                'message': String(error).substring(index+2)
            };
    });

    return {
        'status': "ok",
        'articles': result
    }
}

async function getPreview(obj, source){
    let news = {};

    if(source == 0){

        news['source'] = obj.source.name;
        news['title'] = obj.title;
        news['desc'] = obj.description;
        news['url'] = obj.url;
        news['image'] = obj.urlToImage;
        // news['time'] = obj.

    } else if(source == 1){

        news['source'] = obj.website.name;
        news['title'] = obj.title;
        news['url'] = obj.url;
        news['time'] = obj.discoverDate;

        let elems = obj.elements;
        if(elems.length != 0){
            news['image'] = elems[0].url;
        } else {
            news['image'] = "";
        }

        let text = obj.text;
        let index = text.indexOf(".");
        if(index != -1){
            news['desc'] = text.substring(0, index);
        } else {
            news['desc'] = text;
        }
    }

    return news;
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
    "Sky.com": 'Center',
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
    "Daily Mail": 'Far Right',
    "The Daily Mail": 'Far Right',
}

async function loadPage(size, country, source){

    let d = new Date();
    let time = d.getHours() + '.' + d.getMinutes() + '.' + d.getSeconds();
    let date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

    let news = {
        'status': "error"
    }

    if(source == 0){
        news = await getTopNews(size, country);
    } else if(source == 1){
        news = await getTopNews2(size, country);
    }

    console.log(news);
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
                let preview = await getPreview(article, source);

                html += '<div class="articles">';
                html += '<a target="_blank" href="' + preview.url + '">';
                html += '<img src="' + preview.image + '" alt="article' + k + 'image" class="image" width="600" height="400">';
                html += '<div class="desc" style="font-weight: bold; font-size: 14px;">' + preview.title + '</div>';
                html += '<div class="desc">' + preview.desc + ' (' + preview.time + ')</div>';
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
    document.getElementById("head").innerHTML += '<p style="font-size: smaller;">Updated:  ' + time + '  ' + date + '</p>';

}