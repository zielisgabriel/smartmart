from repositories.category_repository import CategoryRepository

class GetCategoryUsecase():
  def __init__(self):
    self.repository = CategoryRepository()

  def execute(self, categoryId):
    return self.repository.find_by_id(categoryId)