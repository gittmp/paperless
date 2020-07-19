// Data objects
const LIMIT = 25;
const SOURCE = 0;

const sourceList = {
    'toggle0': "bbc.co.uk,",
    'toggle1': "sky.com,",
    'toggle2': "mirror.co.uk,",
    'toggle3': "vox.com,",
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
    "HuffPost": 'Strong Left',
    "HuffPost UK": 'Strong Left',
    "Huffington Post": 'Strong Left',
    "Morning Star": 'Strong Left',
    "CNN": 'Left',
    "The Guardian": 'Left',
    "Guardian News": 'Left',
    "The Mirror": 'Left',
    "Daily Mirror": 'Left',
    "Mirror Online": 'Left',
    "The Star": 'Left',
    "Metro.co.uk": 'Left',
    "Metro": 'Left',
    "The Independent": 'Left',
    "Vox": 'Left',
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
    "Daily Mail": 'Strong Right',
    "The Daily Mail": 'Strong Right',
}

// Functions to retrieve top news headlines

async function getTopNews(size, sources, sort){

    let country = 'gb';
    let url = '';

    if(sort == 'date'){
        sort = 'publishedAt';
    } else if(sort == 'relevance'){
        sort = 'relevancy';
    }

    if(sources.length > 0){
        url = 'https://newsapi.org/v2/everything?domains=' + sources + '&apiKey=cb527766d5474d5ebcccd51023d032bf&pagesize=' + String(size) + '&sortBy=' + sort;
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

async function getTopNews2(limit, sources, sort){ //website.domainName%3A.co.uk

    if(sort == 'date'){
        sort = 'discoverDate';
    } else if(sort == 'relevance'){
        sort = '_score';
    }

    // sources = 'website.domainName%3A(%22theguardian.com%22%20OR%20%22bbc.co.uk%22%20OR%20%22mirror.co.uk%22%20OR%20%22huffingtonpost.co.uk%22)';
    sources = '.co.uk';

    let url = 'https://api.newsriver.io/v2/search?query=language%3Aen%20AND%20website.domainName%3A' + sources + '&sortBy=' + sort + '&sortOrder=DESC&limit=' + String(limit);
    const token = 'sBBqsGXiYgF0Db5OV5tAwypVCIPW_sVl7GCQx0RUezHZZuTSmzmITA0VmFNNAWN0n2pHZrSf1gT2PUujH1YaQA';
    
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

        if(!news.image){
            news.image = "newspaper.png";
        }

        news['time'] = obj.publishedAt;

    } else if(source == 1){

        if(obj.website){
            news['source'] = obj.website.name;
        } else {
            let startIndex = obj.url.indexOf("://") + 3;
            let endIndex = obj.url.indexOf("/", startIndex);
            news['source'] = obj.url.substring(startIndex, endIndex);
        }
        news['title'] = obj.title;
        news['url'] = obj.url;
        news['time'] = obj.discoverDate;

        let elems = obj.elements;
        if(elems.length != 0 && elems[0].url){
            news['image'] = elems[0].url;
        } else {
            news['image'] = "newspaper.png";
        }

        let text = obj.text;
        let index = text.indexOf(".");
        if(index != -1){
            news['desc'] = text.substring(0, index);
        } else {
            news['desc'] = text;
        }
    } else if(source == 2){
        news['source'] = obj.snippet.channelTitle;
        news['title'] = obj.snippet.title;
        news['image'] = obj.snippet.thumbnails.medium.url;

        if(!news.image){
            news.image = "newspaper.png";
        }

        news['url'] = "https://www.youtube.com/watch?v=" + obj.id.videoId;
        news['time'] = obj.snippet.publishedAt;
        news['desc'] = "";
    }

    return news;
}

// Twitter functions
/* 
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
 */
// Youtube news functions

async function loadGoogleClient() {
    gapi.auth2.getAuthInstance()
    gapi.client.setApiKey("AIzaSyA8b3eNz5q91T9BLQIM-7tZjzmLvJbiapU");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function(){ console.log("GAPI client loaded"); }, function(err) { console.error("Error loading GAPI client for API", err); });
}

async function getYTNews(size, sort) {
    let resp = await gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "maxResults": size,
      "order": sort,
      "q": "uk news",
      "regionCode": "GB",
      "type": [
        "video"
      ]
    });

    if(resp.status == 200){
        return {
            'status': "ok",
            'articles': resp.result.items
        }
    } else {
        return {
            'status': "error",
            'code': resp.status,
            'message': resp.statusText
        }
    }
}

// Loading webpage dynamically

async function loadPage(size, source, sources, sort, youtube){

    gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: "570678239195-v0i6t4s4l0epv7spugeae4eudgdfjo60.apps.googleusercontent.com"});
    });

    let d = new Date();
    let time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    let date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    let html = '';
    let news = {
        'status': "error"
    }
    let ytNews = {
        'status': "error"
    }

    if(sources.length == 0 && youtube){
        news = await getYTNews(size, sort);
        source = 2
    } else {
        if(source == 0){
            news = await getTopNews(size, sources, sort);
        } else if(source == 1){
            news = await getTopNews2(size, sources, sort);
        }

        if(youtube){
            ytNews = await getYTNews(Math.floor(size/4) + 3, sort);
        }
    }

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

                let article = {};
                let preview = {};
                let ytOverlay = false;

                if(source != 2 && k > 3*rowCount && youtube){
                    article = ytNews.articles[k - 3*rowCount];
                    preview = await getPreview(article, 2);
                    ytOverlay = true;
                } else {
                    article = news.articles[k];
                    preview = await getPreview(article, source);
                }

                html += '<div class="articles">';
                html += '<a target="_blank" href="' + preview.url + '">';

                if(ytOverlay || source == 2){
                    html += '<img src="ytlogo.png" style="background: url(' + preview.image + ') center center white; background-size: cover;" alt="article' + k + 'image" class="image" width="600" height="400" border="0"/>'
                } else {
                    html += '<img src="' + preview.image + '" alt="article' + k + 'image" class="image" width="600" height="400">';
                }

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

    await loadGoogleClient();
}

// Statically refreshes page

async function toggle(){

    let sources = '';
    let sortOrder = 'relevance';
    let ytBool = false;

    for(let i = 0; i < 4; i++){
        let sourceID = 'toggle' + i;
        let sourcei = document.getElementById(sourceID);
        if(sourcei.checked){
            sources = sources.concat(sourceList[sourceID]);
        }
    }

    sources = sources.substring(0, sources.length -1);

    if(document.getElementById("sort-toggle").checked){
        document.getElementById("sort-setting").style.color = "#2196F3";
        document.getElementById("sort-setting").innerHTML = "Sort: Relevance"

    } else {
        document.getElementById("sort-setting").style.color = "#ccc";
        document.getElementById("sort-setting").innerHTML = "Sort: Date"
        sortOrder = 'date';
    }

    if(document.getElementById("toggleYT").checked){
        ytBool = true;
    }

    loadPage(LIMIT, SOURCE, sources, sortOrder, ytBool);
}