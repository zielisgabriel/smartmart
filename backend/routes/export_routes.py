from flask import Blueprint
from controllers.exports.export_products_controller import ExportProductsController
from controllers.exports.export_sales_controller import ExportSalesController
from controllers.exports.export_categories_controller import ExportCategoriesController

export_routes = Blueprint("exports", __name__)

exportProductsController = ExportProductsController()
exportSalesController = ExportSalesController()
exportCategoriesController = ExportCategoriesController()

export_routes.add_url_rule("/products", view_func=exportProductsController.exportProducts, methods=["GET"])
export_routes.add_url_rule("/sales", view_func=exportSalesController.exportSales, methods=["GET"])
export_routes.add_url_rule("/categories", view_func=exportCategoriesController.exportCategories, methods=["GET"])
