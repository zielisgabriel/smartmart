from flask import jsonify
from usecases.sales.get_sale_usecase import GetSaleUsecase


class GetSaleController:
    def __init__(self):
        self.usecase = GetSaleUsecase()

    def getSale(self, sale_id):
        sale = self.usecase.execute(sale_id)
        if not sale:
            return jsonify({"error": "Venda não encontrada"}), 404
        return jsonify(sale.to_dict())
