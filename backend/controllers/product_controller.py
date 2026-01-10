from flask import jsonify, request
from usecases.product_usecases import (
    ListProducts,
    GetProduct,
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
)


class ProductController:
    def list(self):
        page = request.args.get("page", 1, type=int)
        size = request.args.get("size", 10, type=int)
        sort_by = request.args.get("sortBy", "id")
        sort_order = request.args.get("sortOrder", "asc")
        categories = request.args.get("categories")
        search = request.args.get("search")

        category_ids = None
        if categories:
            category_ids = [int(c) for c in categories.split(",")]

        usecase = ListProducts()
        result = usecase.execute(
            page=page,
            size=size,
            sort_by=sort_by,
            sort_order=sort_order,
            category_ids=category_ids,
            search=search,
        )
        return jsonify(result)

    def get(self, product_id):
        usecase = GetProduct()
        product = usecase.execute(product_id)
        if not product:
            return jsonify({"error": "Produto não encontrado"}), 404
        return jsonify(product)

    def create(self):
        data = request.get_json()

        required_fields = ["name", "description", "price", "brand", "category_id"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Campo '{field}' é obrigatório"}), 400

        usecase = CreateProduct()
        product = usecase.execute(
            name=data["name"],
            description=data["description"],
            price=data["price"],
            brand=data["brand"],
            category_id=data["category_id"],
        )
        return jsonify(product), 201

    def update(self, product_id):
        data = request.get_json()

        required_fields = ["name", "description", "price", "brand", "category_id"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Campo '{field}' é obrigatório"}), 400

        usecase = UpdateProduct()
        product = usecase.execute(
            product_id=product_id,
            name=data["name"],
            description=data["description"],
            price=data["price"],
            brand=data["brand"],
            category_id=data["category_id"],
        )
        if not product:
            return jsonify({"error": "Produto não encontrado"}), 404
        return jsonify(product)

    def delete(self, product_id):
        usecase = DeleteProduct()
        success = usecase.execute(product_id)
        if not success:
            return jsonify({"error": "Produto não encontrado"}), 404
        return "", 204
