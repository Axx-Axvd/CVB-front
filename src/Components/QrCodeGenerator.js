import React, { useState, useEffect } from "react";
import axios from "axios";

const QrCodeGenerator = ({ qrCodeData }) => {
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateQrCode = async () => {
      if (!qrCodeData) return; // Если нет данных для QR-кода, выходим

      try {
        console.log("Данные для генерации QR-кода:", qrCodeData);

        // Запрос к API для получения QR-кода
        const response = await axios.post(
          "http://localhost:5000/api/qr/generate", // Укажите правильный URL API
          {
            InputData: qrCodeData.inputData,
            BgColor: qrCodeData.bgColor,
            FgColor: qrCodeData.fgColor,
          },
          { responseType: "arraybuffer" } // Важно! Указываем тип ответа arraybuffer для работы с бинарными данными
        );

        console.log("Ответ от API:", response);

        // Создаем Blob URL из бинарных данных
        const blob = new Blob([response.data], { type: "image/png" });
        const url = URL.createObjectURL(blob);

        console.log("Сгенерированный URL для QR-кода:", url);

        setQrCode(url);
        setError(null);
      } catch (err) {
        console.error("Ошибка при генерации QR-кода:", err);
        setError("Ошибка при генерации QR-кода. Проверьте данные.");
      }
    };

    generateQrCode();
  }, [qrCodeData]);

  return (
    <div>
      {qrCode ? (
        <div style={{ marginTop: "20px" }}>
          <img
            src={qrCode}
            alt="Generated QR Code"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      ) : (
        <p>{error || "QR-код еще не сгенерирован"}</p>
      )}
    </div>
  );
};

export default QrCodeGenerator;
