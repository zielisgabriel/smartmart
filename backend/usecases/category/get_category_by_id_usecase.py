from repositories.category_repository import CategoryRepository

class GetCategoryByIdUsecase():
  def __init__(self):
    self.repository = CategoryRepository()

  def execute(self, category_id):
    return self.repository.find_by_id(category_id)