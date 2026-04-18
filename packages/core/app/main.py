from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas, database

# Criar as tabelas no banco de dados (SQLite para desenvolvimento)
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Sistema Unificado de Gestão - Core API")

# Configuração de CORS para permitir acesso do Dashboard (Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "message": "Sistema Unificado de Gestão API"}

# Endpoints de Tarefas (Eisenhower Matrix)
@app.get("/tasks", response_model=List[schemas.Task])
def get_tasks(db: Session = Depends(database.get_db)):
    tasks = db.query(models.Task).all()
    return tasks

@app.post("/tasks", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(database.get_db)):
    db_task = models.Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task: schemas.TaskCreate, db: Session = Depends(database.get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    for key, value in task.model_dump().items():
        setattr(db_task, key, value)
    
    db.commit()
    db.refresh(db_task)
    return db_task

# Endpoints de Perfil (Gamificação)
@app.get("/profile", response_model=schemas.UserProfile)
def get_profile(db: Session = Depends(database.get_db)):
    profile = db.query(models.UserProfile).first()
    if not profile:
        # Criar um perfil padrão se não existir
        profile = models.UserProfile(username="Usuário Estudo", level=1, xp=0, streak_days=0)
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile
