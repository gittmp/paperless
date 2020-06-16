// Data objects

const LIMIT = 25

const sourceList = {
    'toggle0': "bbc.co.uk,",
    'toggle1': "sky.com,",
    'toggle2': "mirror.co.uk,",
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
    "Telegraph.co.uk": 'Right',
    "The Sun": 'Right',
    "The Daily Express": 'Right',
    "Express": 'Right',
    "Express.co.uk": 'Right',
    "Daily Mail": 'Far Right',
    "The Daily Mail": 'Far Right',
}

// Functions to retrieve top news headlines

async function getTopNews(size, sources){

    let country = 'gb';
    let url = '';

    if(sources.length > 0){
        url = 'https://newsapi.org/v2/everything?domains=' + sources + '&apiKey=cb527766d5474d5ebcccd51023d032bf&pagesize=' + String(size);
    } else {
        url = 'https://newsapi.org/v2/top-headlines?apiKey=cb527766d5474d5ebcccd51023d032bf&country=' + country + '&pagesize=' + String(size);
    }

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

async function getTopNews2(limit){ //website.domainName%3A.co.uk
    let sources = 'website.domainName%3A(%22theguardian.com%22%20OR%20%22bbc.co.uk%22%20OR%20%22mirror.co.uk%22%20OR%20%22huffingtonpost.co.uk%22)';
    let url = 'https://api.newsriver.io/v2/search?query=language%3Aen%20AND%20' + sources + '&sortBy=discoverDate&sortOrder=DESC&limit=' + String(limit);
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

// Function which restructures each news article's content

async function getPreview(obj, source){
    let news = {};

    if(source == 0){
        news['source'] = obj.source.name.replace(".com", "");
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

// Twitter functions

async function getTwitterTrends(){

    let placeID = 1; //Global WOEID

    let url = '/twitterTrends?placeID=' + placeID;
    
    let result = await fetch(url, {
        method: 'GET'
        })
        // .then(response => response.json())
        .catch((error) => {
            console.error('Error:', error);
            return error;
    });

    console.log(result);

    return result;
} 

// Youtube news functions

function loadGoogleClient() {
    gapi.auth2.getAuthInstance()
    gapi.client.setApiKey("AIzaSyDhxewl9PW-PHZuCnZ2udUFUTj1dAsyUE8");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}

function getYTNews() {
    return gapi.client.youtube.search.list({
    "part": [
        "snippet"
    ],
    "location": "21.5922529,-158.1147114",
    "locationRadius": "10mi",
    "maxResults": 10,
    "q": "news",
    "type": [
        "video"
    ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response.result);
            },
            function(err) { console.error("Execute error", err); });
}

// Loading webpage dynamically

async function loadPage(size, source, sources){

    gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: "1021095041577-pvdv7ippee3v4q33v2pt72lojd6dd3mf.apps.googleusercontent.com"});
    });

    let d = new Date();
    let time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    let date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

    let news = {
        'status': "error"
    }

    if(source == 0){
        news = await getTopNews(size, sources);
    } else if(source == 1){
        news = await getTopNews2(size, sources);
    }

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
                html += '<div class="desc">' + preview.desc;
                
                if(preview.time){
                    html += ' (' + preview.time + ')';
                }

                html += '</div> <div class="desc">Source: ' + preview.source + '<br>';

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
    document.getElementById("update-time").innerHTML = '<p style="font-size: smaller;">Updated:  ' + time + '  ' + date + '</p>';

    loadGoogleClient();
}

// Statically refreshes page

async function toggle(){

    let sources = '';

    for(let i = 0; i < 3; i++){
        let sourceID = 'toggle' + i;
        let sourcei = document.getElementById(sourceID);
        if(sourcei.checked){
            sources = sources.concat(sourceList[sourceID]);
        }
    }

    sources = sources.substring(0, sources.length -1);

    loadPage(LIMIT, 0, sources);
}