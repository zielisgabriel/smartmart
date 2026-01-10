from database import db
from entities.category import Category


class CategoryRepository:
    def find_all(self):
        return Category.query.all()

    def find_by_id(self, category_id):
        return Category.query.get(category_id)

    def create(self, name):
        category = Category(name=name)
        db.session.add(category)
        db.session.commit()
        return category

    def update(self, category_id, name):
        category = self.find_by_id(category_id)
        if not category:
            return None
        category.name = name
        db.session.commit()
        return category

    def delete(self, category_id):
        category = self.find_by_id(category_id)
        if not category:
            return False
        db.session.delete(category)
        db.session.commit()
        return True

    def bulk_create(self, categories_data):
        try:
            created = []
            for data in categories_data:
                category = Category(name=data["name"])
                db.session.add(category)
                created.append(category)
            db.session.commit()
            return created
        except Exception:
            db.session.rollback()
            raise
