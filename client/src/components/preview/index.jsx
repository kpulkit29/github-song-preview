import React, {useState} from "react";
import "./index.css";
import { Form, Input, Drawer, Typography  } from 'antd';

const { Text } = Typography;

export function Preview(props) {
    const { previewSong, open, toggleOpen } = props;
    const [form] = Form.useForm();
    const [gradStart, setGradStart] = useState('#e66465');
    const [gradEnd, setGradEnd] = useState('#9198e5');
    const [textColor, setTextColor] = useState('#FFFFFF');

    function getQuery() {
        let details = {
            st: window.btoa(gradStart),
            ed: window.btoa(gradEnd),
            txt: window.btoa(textColor),
            name: window.btoa(previewSong.name),
            sUrl: window.btoa(previewSong.image.url),
            artist: window.btoa(previewSong.artist)
        }
        return `st=${details.st}&ed=${details.ed}&txt=${details.txt}&name=${details.name}&sUrl=${details.sUrl}&artist=${details.artist}`
    }   
    
    if(!previewSong) return null;
    return (
        <Drawer
        title={`Preview song card`}
        placement="right"
        width="800"
        onClose={() =>toggleOpen(false)}
        visible={open}
      >
        <Form
            form={form}
            initialValues={{
                start: gradStart,
                end: gradEnd,
                text: textColor
            }}
            layout="vertical"
        >
            <Form.Item label="Gradient Start">
                <Input value={gradStart} onChange={(e) => setGradStart(e.target.value)} type="color" placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Gradient End">
                <Input value={gradEnd} onChange={(e) => setGradEnd(e.target.value)} type="color" placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Text Color">
                <Input value={textColor} onChange={(e) => setTextColor(e.target.value)} type="color" placeholder="input placeholder" />
            </Form.Item>
        </Form>
        <div className="song-card" style={{background: `linear-gradient(${gradStart}, ${gradEnd})`, color: `${textColor}`}}>
            <img src={previewSong.image.url} alt="song image"/>
            <div className="song-details">
                <div className="artist">{previewSong.name}</div>
                <div>{previewSong.artist}</div>
            </div>
            <div className="song-play">▶️</div>
        </div>
        <b>Copy and paste the below mentioned code in your Github profile README to see it in action</b>
        <br/>
        <Text code>{`${"[![](https://song-preview-readme.herokuapp.com/preview?" + getQuery() + ")](https://www.youtube.com/watch?v="+ previewSong.videoId +")"}`}</Text>
      </Drawer>
    )

}