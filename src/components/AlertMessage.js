import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function AlertMessage() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2200}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
      theme="light"
    />
  );
}

export default AlertMessage;
