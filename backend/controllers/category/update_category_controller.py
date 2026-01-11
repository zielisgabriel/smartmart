from usecases.category.update_category_usecase import UpdateCategoryUsecase
from flask import jsonify, request


class UpdateCategoryController:
    def __init__(self):
        self.usecase = UpdateCategoryUsecase()

    def updateCategory(self, category_id):
        data = request.get_json()
        category = self.usecase.execute(category_id, name=data.get("name"))
        if not category:
            return jsonify({"error": "Categoria não encontrada"}), 404
        return jsonify(category.to_dict())