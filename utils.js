module.exports = {
    massageSongData: function({content}) {
        let finalData = [];
        for(let item of content) {
            console.log(item);
            let currSong = {};
            currSong.name = item.name;
            currSong.artist = item.artist.name
            currSong.image = item.thumbnails.slice(-1)[0];
            finalData.push(currSong)
        }

        return finalData;
    }
}