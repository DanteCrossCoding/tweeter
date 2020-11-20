/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  //submission, error validation, and async posting of new tweets
  $(".alert").hide();
  
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    const maxChar = 140;
    const $tweetText = $('.new-tweet textarea');
    
    if ($tweetText.val() === "") {
      $("#alert1").slideDown('slow');
    } else if ($tweetText.val().length > maxChar) {
      $("#alert2").slideDown('slow');
    }

    const formData = $( this ).serialize();
    $.ajax('/tweets', {type: "post", data: formData, success: (d) => console.log(d)})
      .then((data) => {
        $tweetText.val("");
        $( ".new-tweet .counter" ).val(maxChar);
        $('.tweets').empty();
        $(".alert").hide();
        loadTweets();
      })
      .catch((err) => {

      });
  });

//Escape function to prevent hijacking threats
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

//puts tweets into HTML form accessible to css layout
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
//Loop that handles tweets order on the page
const renderTweets = (tweets,target) => {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    target.append($tweet);
  }
};

//Loads the tweets
const loadTweets = () => {
  console.log('/tweets')
  $.ajax('/tweets', {type: 'get'})
    .then((data) => {
      renderTweets(data,$('.tweets'));
    })
    .catch((data) => {

    });
};
//Tweet Loader
loadTweets();

});
