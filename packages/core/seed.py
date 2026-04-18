from app.database import SessionLocal, engine
from app import models

# Criar tabelas se não existirem
models.Base.metadata.create_all(bind=engine)

def seed():
    db = SessionLocal()
    
    # Adicionar Perfil se não existir
    if not db.query(models.UserProfile).first():
        profile = models.UserProfile(username="Usuário Estudo", level=15, xp=750, streak_days=12)
        db.add(profile)
    
    # Adicionar Tarefas iniciais se a tabela estiver vazia
    if db.query(models.Task).count() == 0:
        initial_tasks = [
            models.Task(title="Finalizar documentação técnica do Core API", is_important=True, is_urgent=True),
            models.Task(title="Corrigir bug de persistência no DB", is_important=True, is_urgent=True),
            models.Task(title="Refatoração da Engine de Gamificação", is_important=True, is_urgent=False),
            models.Task(title="Planejamento da Fase 3 (Integração IA)", is_important=True, is_urgent=False),
            models.Task(title="Responder e-mails da equipe de QA", is_important=False, is_urgent=True),
            models.Task(title="Assinar newsletter de tech news", is_important=False, is_urgent=False),
        ]
        db.add_all(initial_tasks)
    
    db.commit()
    db.close()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed()
