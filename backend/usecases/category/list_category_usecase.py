from repositories.category_repository import CategoryRepository

class ListCategoryUsecase():
  def __init__(self):
    self.repository = CategoryRepository()

  def execute(self):
    return self.repository.find_all()