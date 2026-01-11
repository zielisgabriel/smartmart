from usecases.category.get_category_usecase import GetCategoryUsecase
from flask import jsonify


class GetCategoryController:
    def __init__(self):
        self.usecase = GetCategoryUsecase()

    def getCategory(self, category_id):
        category = self.usecase.execute(category_id)
        if not category:
            return jsonify({"error": "Categoria não encontrada"}), 404
        return jsonify(category.to_dict())