from usecases.category.get_category_by_id_usecase import GetCategoryByIdUsecase
from flask import jsonify


class GetCategoryByIdController:
    def __init__(self):
        self.usecase = GetCategoryByIdUsecase()

    def getCategory(self, category_id):
        category = self.usecase.execute(category_id)
        if not category:
            return jsonify({"error": "Categoria não encontrada"}), 404
        return jsonify(category.to_dict())