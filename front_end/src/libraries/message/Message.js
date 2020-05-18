import { message } from 'antd';

const TYPES = ["success", "error", "warning", "info"]
export default Notification = (description, type="info")=>{
    message.config({
        top: "95%",
        duration: 3
    });
    message[type](description)
}