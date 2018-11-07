/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  // loops through tweets
  tweets.forEach(tweet => {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  })
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

function createTweetElement(tweet) {
  if (tweet) {

    let $tweet = `<article>
    <header>
      <img class="avatar" src=${tweet.user.avatars.small}>
      <span name="username" style="vertical-align:top">${tweet.user.name}</span>
      <span name="handle" style="float:right">${tweet.user.handle}</span>
    </header>
    ${tweet.content.text}
    <footer>
      <span name="days" >${Math.round((tweet.created_at-1541635200000) / 86400000) + ' days ago'}</span>
    </footer>
  </article>`
    return $tweet;
  }
}
function loadData() {

  $.ajax({
    method: "GET",
    url: "/tweets",
  })
    .done(function (tweets) {
      renderTweets(tweets)
    })
}

$(document).ready(function () {

  loadData();

  $('form').on('submit', function (event) {
    event.preventDefault()
    var text = event.target.elements.text
    if (text.value === '' || text.value.length+1 > 140) { 
      $( "#error" ).toggle().slideDown();
      return }
      $( "#error" ).hide();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    })
      .done(function (tweets) {
        renderTweets([tweets])
      })
    text.value = ''
    loadData()
  })

})
