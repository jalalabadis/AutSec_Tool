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