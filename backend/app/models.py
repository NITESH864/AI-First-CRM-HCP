from sqlalchemy import Column, Integer, String, Text
from .database import Base

class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    hcp_name = Column(String)
    interaction_type = Column(String)
    date = Column(String)
    sentiment = Column(String)
    topics = Column(Text)