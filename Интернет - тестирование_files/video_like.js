var videoLike = (function () {
    var players = {},
        likeTemplate = 'Ваше мнение о видеоматериале? \
            <a class="like-button" href="#" title="нравится"><i class="icon-thumbs-up"></i></a>\
            <a class="dislike-button" href="#" title="не нравится"><i class="icon-thumbs-down"></i></a>',
        id,
        player;

    /* Evaluating full view time and time of video for every player. */
    setInterval(function () {
        var status;
        for (id in players) {
            
            if (players.hasOwnProperty(id) && players[id].el.readyState >= 2) {
                if (!players[id].el.paused) {
                    players[id].fulltime += 1;
                }
                if (players[id].el.ended) {
                    players[id].ended = true;
                }
                players[id].name = ~players[id].el.currentSrc.indexOf(window.location.host) ? players[id].el.currentSrc.split(window.location.host)[1] : players[id].el.currentSrc;
                players[id].time = parseInt(players[id].el.duration, 10);
            }
        }
        
    }, 1000);

    /* Creates node with like/dislike buttons. */
    function createLikeButtons(parent) {
        var likeContainer = document.createElement('p'), likeBtn, dislikeBtn;
        likeContainer.innerHTML = likeTemplate;
        likeBtn = likeContainer.getElementsByClassName('like-button')[0];
        dislikeBtn = likeContainer.getElementsByClassName('dislike-button')[0];
        likeBtn.onclick = function () {
            if (this.className.search('active') === -1) {
                this.className += " active";
            }
            dislikeBtn.className = dislikeBtn.className.replace(/active/g, "").trim();
            players[parent.id].like = true;
        };
        dislikeBtn.onclick = function () {
            if (this.className.search('active') === -1) {
                this.className += " active";
            }
            likeBtn.className = likeBtn.className.replace(/active/g, "").trim();
            players[parent.id].like = false;
        };
        parent.parentNode.insertBefore(likeContainer, parent.nextSibling);
    }

    /* Getting video tags from HTML into players var. */
    [].forEach.call(document.querySelectorAll('video'), function (el, index) {
        var player;

        if (~[].indexOf.call(el.classList, 'videoLectionPlayer')) {
            createLikeButtons(el);
            player = {
                id: 'videoplayer' + index,
                el: el,
                fulltime: 0,
                ended: false
            };
            players[player.id] = player;
        }
    });

    /* Returns JSON data */
    this.getJSON = function () {
        var data = [], player;
        for (id in players) {
            if (players.hasOwnProperty(id)) {
                player = players[id];
                if (player.fulltime === 0) {
                    continue;
                }
                data.push({
                    name: player.name,
                    time: player.time,
                    sumtime: player.fulltime,
                    ended: player.ended,
                    like: player.like
                });
            }
        }
        return JSON.stringify(data);
    };

    this.getPlayers = function () {
        return players;
    };

    return this;
})();