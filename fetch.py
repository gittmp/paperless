import json
import requests
import urllib
import urllib.request
import urllib.error
import datetime
import time


def getTopNews():
    country = "uk"
    maxx = "10"
    url = 'https://gnews.io/api/v3/top-news?token=f8a1d2762bc45f61fb0c0901c8f0f932&country=' + country + '&max=' + maxx

    try:
        req = urllib.request.urlopen(url)
        resp = req.read().decode('utf-8')
        result = [True, json.loads(resp)]

    except (urllib.error.HTTPError, urllib.error.URLError):
        result = [False, "Error: cannot get top news"]

    return result


def getPreview(url):

    link = 'https://api.linkpreview.net?key=5016f752ac0a6dacd1bb14f10f190791&q=' + url
    response = requests.request("POST", link)

    return response.text


def getTopic(topic):
    country = "uk"
    maxx = "10"
    url = 'https://gnews.io/api/v3/topics/' + topic + '?token=f8a1d2762bc45f61fb0c0901c8f0f932&country=' + country + '&max=' + maxx

    try:
        req = urllib.request.urlopen(url)
        resp = req.read().decode('utf-8')
        result = [True, json.loads(resp)]

    except (urllib.error.HTTPError, urllib.error.URLError):
        result = [False, "Error: cannot get top news"]

    return result


topicList = [
    "World",
    "Nation",
    "Business",
    "Technology",
    "Entertainment",
    "Sports",
    "Science",
    "Health"
]


biasChart = {
    "HuffPost": 'FL',
    "HuffPost UK": 'FL',
    "Huffington Post": 'FL',
    "CNN": 'L',
    "The Guardian": 'L',
    "The Mirror": 'L',
    "The Star": 'L',
    "The Independent": 'L',
    "Wales Online": 'L',
    "Sky News": 'C',
    "The Financial Times": 'C',
    "BBC News": 'C',
    "The Times": 'R',
    "The Telegraph": 'R',
    "The Sun": 'R',
    "The Daily Express": 'R',
    "Daily Mail": 'FR'
}


# top_news = getTopNews("uk")
top_news = [True, {"timestamp": 1591186999, "articleCount": 10, "articles": [
    {'title': "PMQs: Labour leader Starmer's political distancing", 'description': '', 'url': 'https://news.google.com/__i/rss/rd/articles/CBMiL2h0dHBzOi8vd3d3LmJiYy5jby51ay9uZXdzL3VrLXBvbGl0aWNzLTUyOTAzMTE20gEzaHR0cHM6Ly93d3cuYmJjLmNvLnVrL25ld3MvYW1wL3VrLXBvbGl0aWNzLTUyOTAzMTE2?oc=5', 'image': None, 'publishedAt': '2020-06-03 10:43:46 UTC', 'source': {'name': 'BBC News', 'url': 'https://www.bbc.co.uk'}},
    {'title': "George Floyd death: UK police 'horrified' by homicide and violence in US", 'description': '', 'url': 'https://news.google.com/__i/rss/rd/articles/CBMiaWh0dHBzOi8vbmV3cy5za3kuY29tL3N0b3J5L2dlb3JnZS1mbG95ZC1kZWF0aC11ay1wb2xpY2UtaG9ycmlmaWVkLWJ5LWhvbWljaWRlLWFuZC12aW9sZW5jZS1pbi11cy0xMTk5OTY4OdIBbWh0dHBzOi8vbmV3cy5za3kuY29tL3N0b3J5L2FtcC9nZW9yZ2UtZmxveWQtZGVhdGgtdWstcG9saWNlLWhvcnJpZmllZC1ieS1ob21pY2lkZS1hbmQtdmlvbGVuY2UtaW4tdXMtMTE5OTk2ODk?oc=5', 'image': None, 'publishedAt': '2020-06-03 11:12:54 UTC', 'source': {'name': 'Sky News', 'url': 'https://news.sky.com'}},
    {'title': 'Lockdown rules: what is allowed in England, Scotland, Wales and Northern Ireland', 'description': '', 'url': 'https://news.google.com/__i/rss/rd/articles/CBMihwFodHRwczovL3d3dy50aGVndWFyZGlhbi5jb20vd29ybGQvMjAyMC9qdW4vMDMvY29yb25hdmlydXMtbG9ja2Rvd24tcnVsZXMtd2hhdC1pcy1hbGxvd2VkLWluLWVuZ2xhbmQtc2NvdGxhbmQtd2FsZXMtYW5kLW5vcnRoZXJuLWlyZWxhbmTSAYcBaHR0cHM6Ly9hbXAudGhlZ3VhcmRpYW4uY29tL3dvcmxkLzIwMjAvanVuLzAzL2Nvcm9uYXZpcnVzLWxvY2tkb3duLXJ1bGVzLXdoYXQtaXMtYWxsb3dlZC1pbi1lbmdsYW5kLXNjb3RsYW5kLXdhbGVzLWFuZC1ub3J0aGVybi1pcmVsYW5k?oc=5', 'image': None, 'publishedAt': '2020-06-03 12:00:40 UTC', 'source': {'name': 'The Guardian', 'url': 'https://www.theguardian.com'}},
    {'title': 'George Floyd protests LIVE: Curfews ignored across US as London Black Lives Matter demonstration to take', 'description': '', 'url': 'https://news.google.com/__i/rss/rd/articles/CBMiTWh0dHBzOi8vd3d3LnRoZXN1bi5jby51ay9uZXdzLzExNzYyNDI4L2dlb3JnZS1mbG95ZC1wcm90ZXN0cy1kZWF0aC1saXZlLW5ld3Mv0gFRaHR0cHM6Ly93d3cudGhlc3VuLmNvLnVrL25ld3MvMTE3NjI0MjgvZ2VvcmdlLWZsb3lkLXByb3Rlc3RzLWRlYXRoLWxpdmUtbmV3cy9hbXAv?oc=5', 'image': None, 'publishedAt': '2020-06-03 12:15:45 UTC', 'source': {'name': 'The Sun', 'url': 'https://www.thesun.co.uk'}},
    {'title': 'Hong Kong: Three million people could come to live in the UK if China imposes new law', 'description': '', 'url': 'https://news.google.com/__i/rss/rd/articles/CBMieGh0dHBzOi8vbmV3cy5za3kuY29tL3N0b3J5L2hvbmcta29uZy10aHJlZS1taWxsaW9uLXBlb3BsZS1jb3VsZC1jb21lLXRvLWxpdmUtaW4tdGhlLXVrLWlmLWNoaW5hLWltcG9zZXMtbmV3LWxhdy0xMTk5OTUyNdIBfGh0dHBzOi8vbmV3cy5za3kuY29tL3N0b3J5L2FtcC9ob25nLWtvbmctdGhyZWUtbWlsbGlvbi1wZW9wbGUtY291bGQtY29tZS10by1saXZlLWluLXRoZS11ay1pZi1jaGluYS1pbXBvc2VzLW5ldy1sYXctMTE5OTk1MjU?oc=5', 'image': None, 'publishedAt': '2020-06-03 04:05:27 UTC', 'source': {'name': 'Sky News', 'url': 'https://news.sky.com'}},
    {'title': 'Full details of when and how schools will reopen in Wales announced by Education Minister Kirsty Williams', 'description': '', 'url': 'https://news.google.com/__i/rss/rd/articles/CBMiUmh0dHBzOi8vd3d3LndhbGVzb25saW5lLmNvLnVrL25ld3MvZWR1Y2F0aW9uL3NjaG9vbHMtd2FsZXMtcmVvcGVuLWp1bmUtMjktMTgzNTM5MDXSAVZodHRwczovL3d3dy53YWxlc29ubGluZS5jby51ay9uZXdzL2VkdWNhdGlvbi9zY2hvb2xzLXdhbGVzLXJlb3Blbi1qdW5lLTI5LTE4MzUzOTA1LmFtcA?oc=5', 'image': None, 'publishedAt': '2020-06-03 11:52:48 UTC', 'source': {'name': 'Wales Online', 'url': 'https://www.walesonline.co.uk'}},
    {'title': 'Priti Patel defends 14-day coronavirus quarantine on UK arrivals', 'description': '', 'url': 'https://news.google.com/__i/rss/rd/articles/CBMic2h0dHBzOi8vd3d3LmRhaWx5bWFpbC5jby51ay9uZXdzL2FydGljbGUtODM4MzMzMy9Qcml0aS1QYXRlbC1kZWZlbmRzLTE0LWRheS1jb3JvbmF2aXJ1cy1xdWFyYW50aW5lLVVLLWFycml2YWxzLmh0bWzSAXdodHRwczovL3d3dy5kYWlseW1haWwuY28udWsvbmV3cy9hcnRpY2xlLTgzODMzMzMvYW1wL1ByaXRpLVBhdGVsLWRlZmVuZHMtMTQtZGF5LWNvcm9uYXZpcnVzLXF1YXJhbnRpbmUtVUstYXJyaXZhbHMuaHRtbA?oc=5', 'image': None, 'publishedAt': '2020-06-03 11:59:25 UTC', 'source': {'name': 'Daily Mail', 'url': 'https://www.dailymail.co.uk'}},
    {'title': 'Coronavirus Q&A: Will I be able to go on holiday this summer and which countries can I visit?', 'description': '', 'url': 'https://news.google.com/__i/rss/rd/articles/CBMia2h0dHBzOi8vd3d3LnRlbGVncmFwaC5jby51ay9uZXdzLzIwMjAvMDYvMDMvY29yb25hdmlydXMtcWEtd2lsbC1hYmxlLWdvLWhvbGlkYXktc3VtbWVyLWNvdW50cmllcy1jYW4tdmlzaXQv0gFvaHR0cHM6Ly93d3cudGVsZWdyYXBoLmNvLnVrL25ld3MvMjAyMC8wNi8wMy9jb3JvbmF2aXJ1cy1xYS13aWxsLWFibGUtZ28taG9saWRheS1zdW1tZXItY291bnRyaWVzLWNhbi12aXNpdC9hbXAv?oc=5', 'image': None, 'publishedAt': '2020-06-03 12:19:54 UTC', 'source': {'name': 'The Telegraph', 'url': 'https://www.telegraph.co.uk'}},
    {'title': 'Harlesden street party of 500 people broken up by police', 'description': '', 'url': 'https://news.google.com/__i/rss/rd/articles/CBMiNWh0dHBzOi8vd3d3LmJiYy5jby51ay9uZXdzL3VrLWVuZ2xhbmQtbG9uZG9uLTUyOTAyOTg00gE5aHR0cHM6Ly93d3cuYmJjLmNvLnVrL25ld3MvYW1wL3VrLWVuZ2xhbmQtbG9uZG9uLTUyOTAyOTg0?oc=5', 'image': None, 'publishedAt': '2020-06-03 10:59:59 UTC', 'source': {'name': 'BBC News', 'url': 'https://www.bbc.co.uk'}},
    {'title': "How Labour’s Alleged Afriphobia Left Black People Feeling ‘Politically Homeless'", 'description': '', 'url': 'https://news.google.com/__i/rss/rd/articles/CBMiW2h0dHBzOi8vd3d3Lmh1ZmZpbmd0b25wb3N0LmNvLnVrL2VudHJ5L2FudGktYmxhY2stcmFjaXNtLWxhYm91cl91a181ZWNkMWExM2M1YjZhNjEzMWZlZDJmMTjSAV5odHRwczovL20uaHVmZmluZ3RvbnBvc3QuY28udWsvYW1wL2VudHJ5L2FudGktYmxhY2stcmFjaXNtLWxhYm91cl91a181ZWNkMWExM2M1YjZhNjEzMWZlZDJmMTgv?oc=5', 'image': None, 'publishedAt': '2020-06-03 05:30:58 UTC', 'source': {'name': 'HuffPost UK', 'url': 'https://www.huffingtonpost.co.uk'}}
]}]

while True:
    print("\nZones:")
    print("1) News by Topic")
    print("2) Breaking News")
    print("3) Search News")
    zone = input("\nSelect zone: ")

    if zone == "1" or "opic" in zone:
        print("\nTopics:")
        for i in range(len(topicList)):
            print(str(i+1) + ")", topicList[i])

    elif zone == "2" or "reaking" in zone:
        content = top_news[1]

        if top_news[0] == True:
            articleCount = content["articleCount"]
            articles = content["articles"]
            today = datetime.datetime.now()
            date = today.strftime("%c")

            while True:

                print("\nTops News Headlines (" + date + "):\n")
                for i in range(articleCount):
                    print(str(i+1) + ")", articles[i]['title'])

                selectedArticleNo = input("\nSelect article number: ")
                selectedArticle = articles[int(selectedArticleNo)-1]
                articleSource = selectedArticle['source']['name']

                if articleSource in biasChart.keys():
                    bias = str(biasChart[articleSource])
                    if bias == "FL":
                        bias = "Far Left"
                    elif bias == "L":
                        bias = "Left"
                    elif bias == "CL":
                        bias = "Center Left"
                    elif bias == "C":
                        bias = "Center"
                    elif bias == "CR":
                        bias = "Center Right"
                    elif bias == "R":
                        bias = "Right"
                    elif bias == "FR":
                        bias = "Far Right"
                else:
                    bias = "undefined"

                print()
                print(selectedArticle['title'])
                print(selectedArticle['publishedAt'].replace("UTC", ""))
                print(articleSource + ": " + selectedArticle['url'])
                print("Source bias: " + bias, end='\n')

                preview = getPreview(selectedArticle['url'])
                print(preview)

                time.sleep(5)

        else:
            print(content)

    elif zone == "3" or "earch" in zone:
        print("Search for news story")

    else:
        print("Invalid zone selected")