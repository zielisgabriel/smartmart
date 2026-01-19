from usecases.category.list_category_usecase import ListCategoryUsecase
from flask import jsonify
from exceptions.required_action_exception import RequiredActionException

class ListCategoryController:
    def __init__(self):
        self.usecase = ListCategoryUsecase()

    def listCategory(self):
        categories = self.usecase.execute()
        return jsonify([c.to_dict() for c in categories])