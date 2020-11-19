/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

const createTweetElement = (tweet) => {
  const dateInMs = 1000 * 60 * 60 * 24;
  const daysGoneBy = Math.floor((Date.now() - tweet.created_at) / dateInMs);
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div>
        <img src="${tweet.user.avatars}" alt="prof-pic"/>
        <span>${tweet.user.name}</span>
      </div>
      <span>${tweet.user.handle}</span>
    </header>
    <div class="tweet-body">${escape(tweet.content.text)}</div>
    <footer>
      <div>${daysGoneBy} day${daysGoneBy === 1 ? "" : "s"} ago</div>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
  `);
  return $tweet;
};

const renderTweets = (tweets,target) => {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    target.append($tweet);
  }
};

const loadTweets = () => {
  console.log('/tweets')
  $.ajax('/tweets', {type: 'get'})
    .then((data) => {
      renderTweets(data,$('.tweets'));
    })
    .catch((data) => {

    });
};

loadTweets();

});
