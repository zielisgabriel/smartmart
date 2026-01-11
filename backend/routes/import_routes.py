from flask import Blueprint
from controllers.imports.import_categories_controller import ImportCategoriesController
from controllers.imports.import_products_controller import ImportProductsController
from controllers.imports.import_sales_controller import ImportSalesController

import_routes = Blueprint("import", __name__)

importCategoriesController = ImportCategoriesController()
importProductsController = ImportProductsController()
importSalesController = ImportSalesController()

import_routes.add_url_rule("/categories", view_func=importCategoriesController.importCategories, methods=["POST"])
import_routes.add_url_rule("/products", view_func=importProductsController.importProducts, methods=["POST"])
import_routes.add_url_rule("/sales", view_func=importSalesController.importSales, methods=["POST"])
