from flask import Response, jsonify
from usecases.sales.delete_sale_usecase import DeleteSaleUsecase


class DeleteSaleController:
    def __init__(self):
        self.usecase = DeleteSaleUsecase()

    def deleteSale(self, sale_id):
        success = self.usecase.execute(sale_id)
        if not success:
            return jsonify({"error": "Venda não encontrada"}), 404
        return Response(status=204)
