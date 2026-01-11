from usecases.products.get_product_usecase import GetProductUsecase
from flask import jsonify


class GetProductController:
    def __init__(self):
        self.usecase = GetProductUsecase()

    def getProduct(self, product_id):
        product = self.usecase.execute(product_id)
        if not product:
            return jsonify({"error": "Produto não encontrado"}), 404
        return jsonify(product.to_dict())