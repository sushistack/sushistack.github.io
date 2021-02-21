var Search = {
    posts: [],
    initialize: function () {
        this.fetchPosts();
    },
    search: function (keyWord) {
        var self = this;
        document.getElementById('search-result').innerHTML = keyWord.length < 2 ? '' : this.posts
            .filter(function (post) { return self.match(post, keyWord) })
            .map(function (post) { return self.templatize(post) })
            .join('');
    },
    match: function (post, keyWord) {
        return post.title.has(keyWord) || post.excerpt.has(keyWord) || post.tags.has(keyWord)
    },
    fetchPosts : function() {
        var self = this;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState === xmlHttp.DONE && xmlHttp.status === 200) {
            self.posts = JSON.parse(xmlHttp.responseText);
          }
        };
        xmlHttp.open( "GET", '/assets/json/search.json');
        xmlHttp.send(null);
    },
    templatize: function (post) {
        return '<a class="card-link-wrap" href="' + post.url + '" rel="noopener noreferrer">' +
        '  <div class="card-header">' +
        '    <div class="card-title">' +
        '      <span>'+ post.title +'</span>' +
        '    </div>' +
        '    <div class="card-desc">' +
        '      <span>' + post.excerpt + '</span>' +
        '    </div>' +
        '  </div>' +
        '  <div class="card-icon">' + html_unescape(post.icon) + '</div>' +
        '</a>';
      }
};

String.prototype.has = function (keyWord) {
    return this.toLowerCase().indexOf(keyWord.toLowerCase()) > -1;
};

function html_unescape(s) {
  var div = document.createElement("div");
  div.innerHTML = s;
  return div.textContent || div.innerText;
}

var isSearchDataLoaded = false;

var initSearch = function () {
  document.querySelector('.search-button').addEventListener('click', function (e) {
    switchExpand(e.target, 'active');
    switchExpand(document.querySelector('#search-nav'), 'active');

    if (!isSearchDataLoaded && e.target.classList.contains('active')) {
      isSearchDataLoaded = true;
      Search.initialize();
    }

    if (e.target.classList.contains('active')) {
      document.querySelector('#search-input').select()
      burgerSwitchDown();
      dim(true);
    } else {
      dim(false);
    }
  });
  document.querySelector('#search-input').addEventListener('input', function (e) {
    Search.search(e.target.value);
  });
}

var searchSwitchDown = function () {
  dim(false);
  document.querySelector('.search-button').classList.remove('active');
  document.querySelector('#search-nav').classList.remove('active');
}
