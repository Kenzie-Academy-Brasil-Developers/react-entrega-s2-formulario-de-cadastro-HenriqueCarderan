import { Container } from "./style";
import {
  FiInfo,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../contexts/ToastContext";

const icons = {
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
  info: <FiInfo size={24} />,
};

const Toast = ({ message }) => {
  const [isLeave, setIsLeave] = useState(false);
  const { removeToast } = useContext(ToastContext);

  useEffect(() => {
    let timer;
    if (isLeave) {
      timer = setTimeout(() => {
        removeToast(message.id);
      }, 700);
    } else {
      timer = setTimeout(() => {
        setIsLeave(true);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isLeave]);

  return (
    <Container isLeave={isLeave} type={message.type}>
      {icons[message.type]}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => setIsLeave(true)}>
        <FiXCircle size={16}></FiXCircle>
      </button>
    </Container>
  );
};

export default Toast;
