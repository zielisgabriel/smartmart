from usecases.products.delete_product_usecase import DeleteProductUsecase
from flask import Response, jsonify


class DeleteProductController:
    def __init__(self):
        self.usecase = DeleteProductUsecase()

    def deleteProduct(self, product_id):
        success = self.usecase.execute(product_id)
        if not success:
            return jsonify({"error": "Produto não encontrado"}), 404
        return Response(status=204)