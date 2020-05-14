import { notification } from 'antd';

export default Notification = (message, type="warning", placement="bottomRight")=>{
    notification[type]({
        message,
        placement
    });
}