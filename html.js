module.exports = {
    html: `<html>
    <style>
        .song-card {
            text-align: center;
            padding: 4px 4px 4px 4px;
            color: {{txt}};
            border-radius: 10px;
        }

        body {
            width: 300px;
            height: 300px;
            background: linear-gradient({{st}}, {{ed}});
        }

        img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin-top: 10%;
        }

        .song-details .artist {
            font-size: 16px;
            font-weight: 600;
        }

        .song-play {
            font-size: 30px;
        }
    </style>
    <body>
        <div class="song-card">
            <img src="{{sUrl}}" />
            <div class="song-details">
                <p class="artist">{{name}}</p>
                <p>{{artist}}</p>
            </div>
            <div class="song-play">▶️</div>
    </body>
</html>`
}