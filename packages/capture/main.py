import time
import psutil
import win32gui
import win32process
import requests
from datetime import datetime

# Configurações (Ajustar quando a API estiver pronta para receber dados)
API_BASE_URL = "http://localhost:8000"
CHECK_INTERVAL = 3  # segundos entre cada verificação

def get_active_window_info():
    """Obtém o nome do processo e o título da janela ativa no Windows."""
    try:
        # Pega o handle da janela ativa
        window_handle = win32gui.GetForegroundWindow()
        # Obtém o título da janela
        window_title = win32gui.GetWindowText(window_handle)
        
        # Obtém o Process ID (PID) da janela
        _, pid = win32process.GetWindowThreadProcessId(window_handle)
        
        # Obtém o nome do processo usando psutil
        process = psutil.Process(pid)
        process_name = process.name()
        
        return {
            "process_name": process_name,
            "window_title": window_title,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        # Janelas do sistema ou erro de acesso (ex: janelas protegidas)
        return {"error": str(e)}

def main_loop():
    print("🚀 Inciando Monitoramento (Package 1 - Capture)...")
    print(f"Pressione CTRL+C para parar.")
    
    last_process = None
    
    try:
        while True:
            info = get_active_window_info()
            
            if "error" not in info:
                current_process = info['process_name']
                
                # Só imprime se houver mudança de janela ou após um tempo longo para evitar spam
                if current_process != last_process:
                    print(f"[{datetime.now().strftime('%H:%M:%S')}] Atividade: {current_process} | Janela: {info['window_title']}")
                    last_process = current_process
                
                # Futura lógica de bloqueio (exemplo básico)
                # blacklist = ["Discord.exe", "League of Legends.exe"]
                # if current_process in blacklist:
                #    print("⚠️ ALERTA: Aplicativo restrito detectado!")
                
            else:
                # Ignora erros rápidos de janelas de sistema (transições)
                pass
                
            time.sleep(CHECK_INTERVAL)
            
    except KeyboardInterrupt:
        print("\n🛑 Monitoramento encerrado pelo usuário.")

if __name__ == "__main__":
    main_loop()
