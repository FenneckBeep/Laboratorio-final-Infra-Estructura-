import requests


def send_notification(subject, recipient, message):
    url = "http://host.docker.internal:5000/notify"  # 🔹 corregido: host.docker.internal y ruta /notify
    payload = {
        "subject": subject,
        "recipient": recipient,
        "message": message
    }
    try:
        res = requests.post(url, json=payload)
        if res.status_code == 200:
            print("✅ Notificación enviada correctamente")
        else:
            print("⚠️ Error enviando notificación:", res.text)
    except Exception as e:
        print(f"⚠️ Excepción al enviar notificación: {e}")
