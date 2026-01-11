from flask import Response, jsonify
from usecases.category.delete_category_usecase import DeleteCategoryUsecase


class DeleteCategoryController:
    def __init__(self):
        self.usecase = DeleteCategoryUsecase()

    def deleteCategory(self, category_id):
        success = self.usecase.execute(category_id)
        if not success:
            return jsonify({"error": "Categoria não encontrada"}), 404
        return Response(status=204)