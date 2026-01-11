from database import db
from sqlalchemy import Column, Integer, String, DECIMAL, Text, ForeignKey

class Product(db.Model):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    price = Column(DECIMAL, nullable=False)
    brand = Column(String(50), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    category = db.relationship("Category", back_populates="products")
    sales = db.relationship("Sale", back_populates="product")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "brand": self.brand,
            "category_id": self.category_id,
            "category": self.category.to_dict() if self.category else None,
        }
