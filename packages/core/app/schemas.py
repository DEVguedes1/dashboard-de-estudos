from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    is_important: bool = False
    is_urgent: bool = False
    is_completed: bool = False

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class UserProfileBase(BaseModel):
    username: str
    level: int = 1
    xp: int = 0
    streak_days: int = 0

class UserProfile(UserProfileBase):
    id: int
    last_activity: datetime

    class Config:
        from_attributes = True

class ActivityLogBase(BaseModel):
    process_name: str
    window_title: str

class ActivityLogCreate(ActivityLogBase):
    pass

class ActivityLog(ActivityLogBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True
