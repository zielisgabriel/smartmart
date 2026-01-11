from database import db
from sqlalchemy import Column, Integer, DECIMAL, Date

class Sale(db.Model):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, db.ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(DECIMAL, nullable=False)
    date = Column(Date, nullable=False)

    product = db.relationship("Product", back_populates="sales")

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "total_price": self.total_price,
            "date": self.date.isoformat(),
            "product": self.product.to_dict() if self.product else None,
        }
