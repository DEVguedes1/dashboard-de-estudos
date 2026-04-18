import requests

def send_telegram_push(token, chat_id, message):
    """Envia uma notificação push para o celular via Telegram Bot API."""
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "Markdown"
    }
    try:
        response = requests.post(url, json=payload, timeout=5)
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Erro ao enviar Telegram: {e}")
        return False
