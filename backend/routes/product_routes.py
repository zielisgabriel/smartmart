from flask import Blueprint
from controllers.product_controller import ProductController

product_routes = Blueprint("products", __name__)
controller = ProductController()

product_routes.add_url_rule("", view_func=controller.list, methods=["GET"])
product_routes.add_url_rule("", view_func=controller.create, methods=["POST"])
product_routes.add_url_rule("/<int:product_id>", view_func=controller.get, methods=["GET"])
product_routes.add_url_rule("/<int:product_id>", view_func=controller.update, methods=["PUT"])
product_routes.add_url_rule("/<int:product_id>", view_func=controller.delete, methods=["DELETE"])
