import requests
import os

bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
chat_id = os.getenv('TELEGRAM_CHAT_ID')

def send_markdown_message(chat_id, text):
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown"
    }
    response = requests.post(url, data=data)
    return response.json()


message = ""
res = requests.get(f'https://api.github.com/repos/WangGuibin/IPA-for-self/releases')
if res.status_code == 200:
    releases = res.json()
    for release in releases:
        assets = release['assets']
        for asset in assets:
            download_count = asset['download_count']
            message += f"*{asset['name']}*  共*{download_count}*次下载\n"
    send_markdown_message(chat_id, message)
    print("Release information sent to Telegram")
else:
    print("Failed to retrieve release information")
   