# Analytics for Social Media

Simple node.js Tools that collects Information from Social Media Channels into a MySQL-Database.
It also provides a small Webserver for Reports

## Install

`git clone https://github.com/DSigmund/asm.git && npm install`

## Use

First configure it, then use it.

## Channels

Folgende Kanäle nutzen wir:

- Webseite
- Facebook
- Twitter
- Instagram
- YouTube
- Mastodon
- twtxt
- RSS-Feed
- Podcast (Predigt-Feed)
- Spotify
- iTunes
- Pocket Casts
- Acasts
- Radiopublic
- Listen Notes
- Plurk
- reddit
- medium
- linkedin

## Reports

Die Reports enthalten die konsolidierten Daten des Zeitraums und den Vergleich zu den Daten des Vor-Reports.

Wir berichten über 3 Zeiträume:

- Woche (jeden Montag Abend)
- Monat (jeder 01. Abends über den Vormonat)
- Jahr (01.01. über das Vorjahr)

## Daten pro Kanal

Hier finden sich die KPI, die wir pro Kanal messen.

Jeder Kanal hat folgende Daten:

- Reach (Hits oder Follower, Fans, ...)
- Posts (Beiträge mit Wert Reactions und evtl unterWerten)

### Webseite

Per Google Analytics

- Hits auf alle Seite
- Alle neuen Seiten (Hits)
- Top 10 des Zeitraums (Hits)

### Facebook

Per Facebook Insights

- Fans des Kanals
- Alle neuen Posts (All Reactions, Comments)
- Top 10 des Zeitraums (All Reactions, Comments)

### Twitter

Per Twitter API

- Follower des Kanals
- Alle neuen Tweets (Likes, Retweets, Komments)
- Top 10 des Zeitraums (Likes, Retweets, Komments)

### Instagram

Per Facebook Insights

- Follower des Kanals
- Alle neuen Posts (Likes, Comments)
- Top 10 des Zeitraums (Likes, Comments)

### YouTube

Per YouTube API

- Abbonenten des Kanals
- Alle neuen Videos (Likes, Dislikes, Comments, Watches)
- Top 10 des Zeitraums (Likes, Dislikes, Comments, Watches)

### Mastodon

Per Mastodon API https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#account

- Follower
- Alle neuen Toots (Replies, Reblogs, Favourites)
- Top 10 des Zeitraums (Replies, Reblogs, Favourites)

### twtxt

Per Google Analytics

- Hits im Berichtzeitraum
- Gesamthits

### RSS-Feed

Per Google Analytics

- Hits im Berichtzeitraum
- Gesamthits

### Podcast (Predigt-Feed)

Per Google Analytics

- Hits im Berichtzeitraum
- Gesamthits

### Spotify

Per Spotify API https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/

- Followers

### iTunes

Nicht möglich, indirekt über den Podcast-Feed

### Pocket Casts

Über API https://github.com/furgoose/Pocket-Casts

- Subscribers
- Neue Episodes (Listens)
- Top 10 Episodes (Listens)

### Acasts

Nicht möglich, indirekt über den Podcast-Feed

### Radiopublic

Nicht möglich, indirekt über den Podcast-Feed

### Listen Notes

Nicht möglich, indirekt über den Podcast-Feed

### Plurk

> https://www.plurk.com/API

- Follower des Kanals
- Alle neuen Posts (Likes, Comments)
- Top 10 des Zeitraums (Likes, Comments)

### Reddit

> https://www.reddit.com/r/FeGFFB/about.json
> https://www.reddit.com/r/FeGFFB/new.json

- Follower des Kanals
- Alle neuen Posts (Likes, Comments)
- Top 10 des Zeitraums (Likes, Comments)

### Medium

> https://github.com/Medium/medium-api-docs/

- Follower des Kanals
- Alle neuen Posts (Claps, Comments)
- Top 10 des Zeitraums (Claps, Comments)

### LinkedIn

> https://developer.linkedin.com/docs/guide/v2/organizations/follower-statistics#follower

- Follower des Kanals
- Alle neuen Posts (Claps, Comments)
- Top 10 des Zeitraums (Claps, Comments)


## Test

Powered by Jest, just use `npm run test`

## Linting

Powered by standard-js, just use `npm run lint`

## Build

`npm run build`

## Depencies

- 

## Authors

- Dominik Sigmund <dominik.sigmund@webdad.eu>
