from flask import Flask, request, jsonify
from flask_mail import Mail, Message


app = Flask(__name__)


# --- CONFIGURACIÓN DE CORREO ---
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'descartable2312@gmail.com'  # reemplazar con tu correo
app.config['MAIL_PASSWORD'] = 'txbp zckq zgcq efyj'        # App Password de Gmail


mail = Mail(app)


@app.route('/notify', methods=['POST'])
def notify():
    data = request.json
    subject = data.get('subject', 'Notificación')
    message = data.get('message', '')
    recipient = data.get('recipient')


    if not recipient:
        return jsonify({"status": "error", "detail": "Falta el destinatario"}), 400


    print(f"📩 Recibida solicitud de notificación -> {recipient} | Asunto: {subject}")


    try:
        msg = Message(subject, sender=app.config['MAIL_USERNAME'], recipients=[recipient])
        msg.body = message
        msg.charset = 'utf-8'
        mail.send(msg)


        print(f"✅ Correo enviado correctamente a {recipient}")
        return jsonify({"status": "success"}), 200
    except Exception as e:
        print(f"❌ Error al enviar correo: {e}")
        return jsonify({"status": "error", "detail": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
