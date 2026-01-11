from repositories.category_repository import CategoryRepository


class CreateCategoryUsecase:
    def __init__(self):
        self.repository = CategoryRepository()

    def execute(self, name):
        return self.repository.create(name)