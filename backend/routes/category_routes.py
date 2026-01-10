from flask import Blueprint
from controllers.category_controller import CategoryController

category_routes = Blueprint("categories", __name__)
controller = CategoryController()

category_routes.add_url_rule("", view_func=controller.list, methods=["GET"])
category_routes.add_url_rule("", view_func=controller.create, methods=["POST"])
category_routes.add_url_rule("/<int:category_id>", view_func=controller.get, methods=["GET"])
category_routes.add_url_rule("/<int:category_id>", view_func=controller.update, methods=["PUT"])
category_routes.add_url_rule("/<int:category_id>", view_func=controller.delete, methods=["DELETE"])
