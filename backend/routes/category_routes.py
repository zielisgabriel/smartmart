from flask import Blueprint
from controllers.category.list_category_controller import ListCategoryController
from controllers.category.get_category_by_id_controller import GetCategoryByIdController
from controllers.category.create_category_controller import CreateCategoryController
from controllers.category.update_category_controller import UpdateCategoryController
from controllers.category.delete_category_controller import DeleteCategoryController

category_routes = Blueprint("categories", __name__)

listCategoryController = ListCategoryController()
getCategoryController = GetCategoryByIdController()
createCategoryController = CreateCategoryController()
updateCategoryController = UpdateCategoryController()
deleteCategoryController = DeleteCategoryController()

category_routes.add_url_rule("/list", view_func=listCategoryController.listCategory, methods=["GET"])
category_routes.add_url_rule("/create", view_func=createCategoryController.createCategory, methods=["POST"])
category_routes.add_url_rule("/<int:category_id>", view_func=getCategoryController.getCategory, methods=["GET"])
category_routes.add_url_rule("/update/<int:category_id>", view_func=updateCategoryController.updateCategory, methods=["PUT"])
category_routes.add_url_rule("/<int:category_id>", view_func=deleteCategoryController.deleteCategory, methods=["DELETE"])
