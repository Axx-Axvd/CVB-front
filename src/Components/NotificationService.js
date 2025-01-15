import emailjs from "emailjs-com";
import axios from "axios";

export const sendNotificationAndGenerateQr = async (message, recipientEmail, setQrCode, setError) => {
  try {
    const apiPayload = {
      message: message,
      recipientEmail: recipientEmail,
      scheduledTime: new Date().toISOString(),
      status: "Pending",
      isScheduled: false,
    };

    console.log("Отправляемый на API объект:", apiPayload);

    // 1. Отправка уведомления
    const reminderResponse = await axios.post("https://cvb-production.up.railway.app/api/reminder", apiPayload);
    const reminderId = reminderResponse.data.id;
    const reminderUrl = `https://cvb-production.up.railway.app/api/reminder/${reminderId}`;
    console.log("Ссылка на уведомление:", reminderUrl);

    // 2. Отправка через EmailJS
    const emailParams = {
      to_email: recipientEmail,
      from_name: "API Integration Platform",
      message: `${message}\nСсылка на уведомление: ${reminderUrl}`,
    };

    await emailjs.send("service_ghrxwnj", "template_l24ofqc", emailParams, "h-VIiLtU7ajOj-HHu");
    console.log("Уведомление успешно отправлено на почту!");

    // 3. Генерация QR-кода
    console.log("Запрос на генерацию QR-кода...");
    const qrResponse = await axios.post(
      "https://helpful-orca-worthy.ngrok-free.app/api/GetQr",
      {
        InputData: reminderUrl,
        BgColor: "#FFFFFF",
        FgColor: "#000000",
      }
    );

    console.log("Ответ от API QR-кода (JSON):", qrResponse.data);

    // Использование Base64-данных напрямую, если они есть
    if (qrResponse.data && qrResponse.data.outputData) {
      const qrUrl = `data:image/png;base64,${qrResponse.data.outputData}`;
      console.log("Сгенерированный QR-код URL:", qrUrl);

      setQrCode(qrUrl);
      setError(null);
    } else {
      throw new Error("API вернул некорректный ответ или отсутствует outputData.");
    }
  } catch (error) {
    console.error("Ошибка при отправке уведомления или генерации QR-кода:", error);
    setError(`Ошибка при отправке уведомления или генерации QR-кода: ${error.message}`);
  }
};
