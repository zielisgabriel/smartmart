from repositories.category_repository import CategoryRepository


class UpdateCategoryUsecase:
    def __init__(self):
        self.repository = CategoryRepository()

    def execute(self, category_id, name):
        return self.repository.update(category_id, name)