from flask import request, jsonify
from usecases.category.create_category_usecase import CreateCategoryUsecase


class CreateCategoryController:
    def __init__(self):
        self.usecase = CreateCategoryUsecase()

    def createCategory(self):
        data = request.get_json()
        category = self.usecase.execute(data.get("name"))
        return jsonify(category.to_dict()), 201