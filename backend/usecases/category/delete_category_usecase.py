from repositories.category_repository import CategoryRepository


class DeleteCategoryUsecase:
    def __init__(self):
        self.repository = CategoryRepository()

    def execute(self, category_id):
        return self.repository.delete(category_id)