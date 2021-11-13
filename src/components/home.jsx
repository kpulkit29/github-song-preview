import React ,{useState} from "react";
import "../App.css";
import { Preview } from "./preview/index";
import { Input } from 'antd';
import { List, Avatar, Button, Skeleton } from 'antd';
const { Search } = Input;
export function Home(props) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [currSong, setSong] = useState(null);
    const [songs, setSongList] = useState([]);
    const [open, setOpen] = useState(false);
    const [currSelectedSong, setSelectedSong] = useState(null); 
    const [loaded, setLoading] = useState(false);
    async function getSongs(name) {
        setLoading(true)
        if((currSong === name)) {
            return
        }

        let result =  await fetch('/getSongList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name}),
        });
        const parsedResult = await result.json();
        setSong(name);
        setSongList(parsedResult);
        setLoading(false)
    }


    return (
        <div className="home">
                <Search placeholder="input search text" onSearch={getSongs} style={{width: '100%', marginBottom: "50px"}} enterButton />
                <List
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  dataSource={songs}
                  loading={loaded}
                  renderItem={item =>
                    console.log(item) || (
                      <List.Item
                        actions={[<a onClick={() => {debugger;setOpen(true); setSelectedSong(item)}}>See Preview</a>]}
                      >
                        <Skeleton avatar title={true} loading={loaded}>
                          <List.Item.Meta
                            avatar={<Avatar size="large" src={item.image.url} />}
                            title={item.name}
                            description={item.artist}
                          />
                        </Skeleton>
                      </List.Item>
                    )
                  }
                />
                <Preview previewSong={currSelectedSong} open={open} toggleOpen={setOpen}/>
        </div>
    )
}