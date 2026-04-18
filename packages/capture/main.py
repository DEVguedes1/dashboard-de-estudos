import time
import psutil
import win32gui
import win32process
import requests
from datetime import datetime, timedelta
from winotify import Notification, audio

# Configurações
API_BASE_URL = "http://localhost:8000"
CHECK_INTERVAL = 3  # segundos entre cada verificação
COOLDOWN_NOTIF = 60 # segundos entre notificações da mesma distração

# Listas de Distrações (Blacklist)
BLACKLIST_PROCESSES = [
    'Discord.exe', 'Spotify.exe', 'Steam.exe', 
    'EpicGamesLauncher.exe', 'League of Legends.exe', 'Telegram.exe'
]
BLACKLIST_KEYWORDS = ['YouTube', 'Netflix', 'Twitch', 'Facebook', 'Instagram', 'Twitter', 'X.com', 'Reddit']

# Controle de Cooldown
last_notif_time = {}

def show_native_notification(title, message):
    """Exibe uma notificação nativa no Windows Toast."""
    toast = Notification(
        app_id="Sistema Unificado de Gestão",
        title=title,
        msg=message,
        duration="short"
    )
    toast.set_audio(audio.Reminder, loop=False)
    toast.show()

def get_active_window_info():
    """Obtém o nome do processo e o título da janela ativa no Windows."""
    try:
        window_handle = win32gui.GetForegroundWindow()
        window_title = win32gui.GetWindowText(window_handle)
        _, pid = win32process.GetWindowThreadProcessId(window_handle)
        process = psutil.Process(pid)
        process_name = process.name()
        
        return {
            "process_name": process_name,
            "window_title": window_title
        }
    except Exception as e:
        return {"error": str(e)}

def is_distraction(info):
    """Verifica se a atividade atual é uma distração."""
    proc_name = info['process_name']
    win_title = info['window_title']
    
    is_black_proc = any(p.lower() in proc_name.lower() for p in BLACKLIST_PROCESSES)
    is_black_title = any(kw.lower() in win_title.lower() for kw in BLACKLIST_KEYWORDS)
    
    return is_black_proc or is_black_title

def send_activity_to_core(info):
    """Envia a atividade capturada para o Package 2 (Core API)."""
    try:
        requests.post(
            f"{API_BASE_URL}/activity",
            json={
                "process_name": info["process_name"],
                "window_title": info["window_title"]
            },
            timeout=1
        )
    except:
        pass

def main_loop():
    print("🚀 Inciando Monitoramento Nativo (Package 1 - Capture)...")
    last_process = None
    last_window_title = None
    
    global last_notif_time

    try:
        while True:
            info = get_active_window_info()
            
            if "error" not in info:
                current_process = info['process_name']
                current_title = info['window_title']
                
                # Sincroniza com Core
                if current_process != last_process or current_title != last_window_title:
                    send_activity_to_core(info)
                    last_process = current_process
                    last_window_title = current_title
                
                # Checa Distração e Notifica (Windows Nativo)
                if is_distraction(info):
                    now = datetime.now()
                    dist_key = current_process
                    
                    if dist_key not in last_notif_time or (now - last_notif_time[dist_key]) > timedelta(seconds=COOLDOWN_NOTIF):
                        print(f"⚠️ DISTRAÇÃO DETECTADA: {current_process}. Enviando alerta nativo...")
                        show_native_notification(
                            "🚨 Foco Perdido!", 
                            f"Você abriu '{current_process}'. Volte para suas tarefas Q1/Q2."
                        )
                        last_notif_time[dist_key] = now
                
            time.sleep(CHECK_INTERVAL)
            
    except KeyboardInterrupt:
        print("\n🛑 Monitoramento encerrado.")

if __name__ == "__main__":
    main_loop()
