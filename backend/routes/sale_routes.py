from flask import Blueprint
from controllers.sale_controller import SaleController

sale_routes = Blueprint("sales", __name__)
controller = SaleController()

sale_routes.add_url_rule("", view_func=controller.list, methods=["GET"])
sale_routes.add_url_rule("", view_func=controller.create, methods=["POST"])
sale_routes.add_url_rule("/stats", view_func=controller.stats, methods=["GET"])
sale_routes.add_url_rule("/<int:sale_id>", view_func=controller.get, methods=["GET"])
sale_routes.add_url_rule("/<int:sale_id>", view_func=controller.delete, methods=["DELETE"])
