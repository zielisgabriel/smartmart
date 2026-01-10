from flask import jsonify, request
from usecases.category_usecases import (
    ListCategories,
    GetCategory,
    CreateCategory,
    UpdateCategory,
    DeleteCategory,
)


class CategoryController:
    def list(self):
        usecase = ListCategories()
        categories = usecase.execute()
        return jsonify(categories)

    def get(self, category_id):
        usecase = GetCategory()
        category = usecase.execute(category_id)
        if not category:
            return jsonify({"error": "Categoria não encontrada"}), 404
        return jsonify(category)

    def create(self):
        data = request.get_json()
        if not data or "name" not in data:
            return jsonify({"error": "Campo 'name' é obrigatório"}), 400

        usecase = CreateCategory()
        category = usecase.execute(data["name"])
        return jsonify(category), 201

    def update(self, category_id):
        data = request.get_json()
        if not data or "name" not in data:
            return jsonify({"error": "Campo 'name' é obrigatório"}), 400

        usecase = UpdateCategory()
        category = usecase.execute(category_id, data["name"])
        if not category:
            return jsonify({"error": "Categoria não encontrada"}), 404
        return jsonify(category)

    def delete(self, category_id):
        usecase = DeleteCategory()
        success = usecase.execute(category_id)
        if not success:
            return jsonify({"error": "Categoria não encontrada"}), 404
        return "", 204
