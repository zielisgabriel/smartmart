from flask import jsonify, request
from datetime import datetime
from usecases.sales.create_sale_usecase import CreateSaleUsecase


class CreateSaleController:
    def __init__(self):
        self.usecase = CreateSaleUsecase()

    def createSale(self):
        data = request.get_json()

        required_fields = ["product_id", "quantity", "total_price"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Campo '{field}' é obrigatório"}), 400

        date = datetime.fromisoformat(data.get("date")) if data.get("date") else datetime.utcnow()

        sale = self.usecase.execute(
            product_id=data["product_id"],
            quantity=data["quantity"],
            total_price=data["total_price"],
            date=date,
        )
        return jsonify(sale.to_dict()), 201
