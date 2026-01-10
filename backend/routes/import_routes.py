from flask import Blueprint
from controllers.import_controller import ImportController

import_routes = Blueprint("import", __name__)
controller = ImportController()

import_routes.add_url_rule("/categories", view_func=controller.import_categories, methods=["POST"])
import_routes.add_url_rule("/products", view_func=controller.import_products, methods=["POST"])
import_routes.add_url_rule("/sales", view_func=controller.import_sales, methods=["POST"])
