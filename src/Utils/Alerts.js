import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//--> Show Error
export const showError = (msg) => {
    toast.error(msg,{position: toast.POSITION.BOTTOM_RIGHT});
}

//--> Show Successful
export const showSuccess  = (msg) => {
    toast.success(msg,{position: toast.POSITION.BOTTOM_RIGHT});
}

///--->Export Date Formet
export const formatDate = (date)=> {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
