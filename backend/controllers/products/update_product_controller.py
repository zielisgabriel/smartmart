from flask import request, jsonify
from usecases.products.update_product_usecase import UpdateProductUsecase
from decimal import Decimal


class UpdateProductController:
    def __init__(self):
        self.usecase = UpdateProductUsecase()

    def updateProduct(self, product_id):
        data = request.get_json()
        name = data.get("name")
        description = data.get("description")
        price = data.get("price")
        brand = data.get("brand")
        category_id = data.get("category_id")

        product = self.usecase.execute(
            product_id,
            name,
            description,
            Decimal(price),
            brand,
            category_id
        )
        if not product:
            return jsonify({"error": "Produto não encontrado"}), 404
        return jsonify(product.to_dict())