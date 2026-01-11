from database import db
from entities.product import Product
from sqlalchemy import desc
from decimal import Decimal

class ProductRepository:
    def find_all(
        self,
        page=1,
        size=10
    ):
        query = Product.query

        total = query.count()
        products = query.order_by(desc(Product.price)).offset((page - 1) * size).limit(size).all()

        return products, total

    def find_by_id(self, product_id):
        return Product.query.get(product_id)

    def create(
        self,
        name: str,
        description: str,
        price: Decimal,
        brand: str,
        category_id: int
    ):
        product = Product(
            name = name,
            description = description,
            price = price,
            brand = brand,
            category_id = category_id
        )
        db.session.add(product)
        db.session.commit()
        return product

    def update(self,
        id: int,
        name: str,
        description: str,
        price: Decimal,
        brand: str,
        category_id: int
    ):
        product = self.find_by_id(id)
        if not product:
            return None
        product.name = name
        product.description = description
        product.price = price
        product.brand = brand
        product.category_id = category_id
        db.session.commit()
        return product

    def delete(
        self,
        product_id: int
    ):
        product = self.find_by_id(product_id)
        if not product:
            return False
        db.session.delete(product)
        db.session.commit()
        return True

    def bulk_create(
        self,
        products_data
    ):
        try:
            created = []
            for data in products_data:
                product = Product(
                    name=data["name"],
                    description=data["description"],
                    price=data["price"],
                    brand=data["brand"],
                    category_id=data["category_id"],
                )
                db.session.add(product)
                created.append(product)
            db.session.commit()
            return created
        except Exception:
            db.session.rollback()
            raise
