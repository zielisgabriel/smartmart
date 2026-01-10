from repositories.category_repository import CategoryRepository


class ListCategories:
    def __init__(self):
        self.repository = CategoryRepository()

    def execute(self):
        categories = self.repository.find_all()
        return [category.to_dict() for category in categories]


class GetCategory:
    def __init__(self):
        self.repository = CategoryRepository()

    def execute(self, category_id):
        category = self.repository.find_by_id(category_id)
        if not category:
            return None
        return category.to_dict()


class CreateCategory:
    def __init__(self):
        self.repository = CategoryRepository()

    def execute(self, name):
        category = self.repository.create(name)
        return category.to_dict()


class UpdateCategory:
    def __init__(self):
        self.repository = CategoryRepository()

    def execute(self, category_id, name):
        category = self.repository.update(category_id, name)
        if not category:
            return None
        return category.to_dict()


class DeleteCategory:
    def __init__(self):
        self.repository = CategoryRepository()

    def execute(self, category_id):
        return self.repository.delete(category_id)
