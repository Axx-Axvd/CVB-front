import React, { useState } from "react";
import { sendNotificationAndGenerateQr } from "./Components/NotificationService";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSendNotification = async () => {
    setError(null);
    setQrCode(null);
    setSuccess(null);
    try {
      await sendNotificationAndGenerateQr(message, email, setQrCode, setError);
      setSuccess("Уведомление успешно отправлено и QR-код сгенерирован!");
    } catch (error) {
      setError("Ошибка при отправке уведомления или генерации QR-кода.");
    }
  };

  const handleImageError = () => {
    setError("Не удалось отобразить QR-код. Попробуйте позже.");
    setQrCode(null);
  };

  return (
    <div className="container">
      <h1 className="title">API Integration Platform</h1>
      <div className="card">
        <h2>Send Notification</h2>
        <div className="form-group">
          <label>Сообщение:</label>
          <input
            type="text"
            placeholder="Введите сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email получателя:</label>
          <input
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn" onClick={handleSendNotification}>
          Отправить уведомление
        </button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
      <div className="card">
        <h2>QR Code</h2>
        {qrCode ? (
          <img
            src={qrCode}
            alt="Generated QR Code"
            style={{ marginTop: "20px", width: "200px", height: "200px" }}
            onError={handleImageError}
          />
        ) : (
          <p>QR-код будет сгенерирован после отправки уведомления.</p>
        )}
      </div>
    </div>
  );
}

export default App;
