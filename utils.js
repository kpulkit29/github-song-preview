function joinArtistName(artist) {
    if(Array.isArray(artist)) {
        if(!artist.length) return "";
        const reducer = (previousValue, currentValue) => previousValue.name + "-" +currentValue.name;
        return artist.reduce(reducer);
    } else {
        return artist.name;
    }
}

module.exports = {
    massageSongData: function({content}) {
        let finalData = [];
        for(let item of content) {
            let currSong = {};
            currSong.name = item.name;
            currSong.artist = joinArtistName(item.artist);
            currSong.image = item.thumbnails.slice(-1)[0];
            currSong.videoId = item.videoId;
            finalData.push(currSong)
        }

        return finalData;
    }
}