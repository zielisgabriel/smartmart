from database import db
from entities.product import Product


class ProductRepository:
    def find_all(self, page=1, size=10, sort_by="id", sort_order="asc", category_ids=None, search=None):
        query = Product.query

        if category_ids:
            query = query.filter(Product.category_id.in_(category_ids))

        if search:
            query = query.filter(Product.name.ilike(f"%{search}%"))

        order_column = getattr(Product, sort_by, Product.id)
        if sort_order == "desc":
            order_column = order_column.desc()

        total = query.count()
        products = query.order_by(order_column).offset((page - 1) * size).limit(size).all()

        return products, total

    def find_by_id(self, product_id):
        return Product.query.get(product_id)

    def create(self, name, description, price, brand, category_id):
        product = Product(
            name=name,
            description=description,
            price=price,
            brand=brand,
            category_id=category_id,
        )
        db.session.add(product)
        db.session.commit()
        return product

    def update(self, product_id, name, description, price, brand, category_id):
        product = self.find_by_id(product_id)
        if not product:
            return None
        product.name = name
        product.description = description
        product.price = price
        product.brand = brand
        product.category_id = category_id
        db.session.commit()
        return product

    def delete(self, product_id):
        product = self.find_by_id(product_id)
        if not product:
            return False
        db.session.delete(product)
        db.session.commit()
        return True

    def bulk_create(self, products_data):
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
