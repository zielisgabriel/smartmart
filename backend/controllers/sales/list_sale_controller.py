from flask import jsonify, request
from usecases.sales.list_sales_usecase import ListSalesUsecase


class ListSaleController:
    def __init__(self):
        self.usecase = ListSalesUsecase()

    def listSales(self):
        page = request.args.get("page", 1, type=int)
        size = request.args.get("size", 10, type=int)

        result = self.usecase.execute(page=page, size=size)
        return jsonify(result)
