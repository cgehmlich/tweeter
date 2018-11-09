
function renderTweets(tweets) {
  tweets.forEach(tweet => {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  })
}

function createTweetElement(tweet) {
  let $tweet = `<article>
    <header>
      <img class="avatar" src=${tweet.user.avatars.small}>
      <span name="username" style="vertical-align:top">${tweet.user.name}</span>
      <span name="handle" style="float:right">${tweet.user.handle}</span>
    </header>
    <textarea readonly> ${tweet.content.text} </textarea>
    <footer>
      <span name="days" >${moment(tweet.created_at).fromNow()}</span>
      <img id="like" src="/images/like.png">
      <img id="retweet" src="/images/retweet.png">
      <img id="flag" src="/images/flag.png">
    </footer>
  </article>`
  return $tweet;
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
    const $form = $(this);
    var text = event.target.elements.text
    if (text.value === '' || text.value.length > 140) {
      $("#error").toggle().slideDown();
      return
    }
    $("#error").hide();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $form.serialize()
    }).then(() => {
      $('#tweets-container').html("")
      loadData();
      text.value = ''
      $('span.counter').text(140);
    })
  })
})
