from flask import request, jsonify
from usecases.products.create_product_usecase import CreateProductUsecase


class CreateProductController:
    def __init__(self):
        self.usecase = CreateProductUsecase()

    def createProduct(self):
        data = request.get_json()
        name = data.get("name")
        description = data.get("description")
        price = data.get("price")
        brand = data.get("brand")
        category_id = data.get("category_id")

        product = self.usecase.execute(
            name,
            description,
            price,
            brand,
            category_id
        )
        return jsonify(product.to_dict()), 201