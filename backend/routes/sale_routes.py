from flask import Blueprint
from controllers.sales.list_sale_controller import ListSaleController
from controllers.sales.get_sale_controller import GetSaleController
from controllers.sales.create_sale_controller import CreateSaleController
from controllers.sales.delete_sale_controller import DeleteSaleController
from controllers.sales.stats_sale_controller import StatsSaleController
from controllers.sales.monthly_stats_sale_controller import MonthlyStatsSaleController

sale_routes = Blueprint("sales", __name__)

listSaleController = ListSaleController()
getSaleController = GetSaleController()
createSaleController = CreateSaleController()
deleteSaleController = DeleteSaleController()
statsSaleController = StatsSaleController()
monthlyStatsSaleController = MonthlyStatsSaleController()

sale_routes.add_url_rule("", view_func=listSaleController.listSales, methods=["GET"])
sale_routes.add_url_rule("", view_func=createSaleController.createSale, methods=["POST"])
sale_routes.add_url_rule("/stats", view_func=statsSaleController.getStats, methods=["GET"])
sale_routes.add_url_rule("/stats/monthly", view_func=monthlyStatsSaleController.getMonthlyStats, methods=["GET"])
sale_routes.add_url_rule("/<int:sale_id>", view_func=getSaleController.getSale, methods=["GET"])
sale_routes.add_url_rule("/<int:sale_id>", view_func=deleteSaleController.deleteSale, methods=["DELETE"])
