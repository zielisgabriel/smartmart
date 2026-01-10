from flask import jsonify, request
from datetime import datetime
from usecases.sale_usecases import (
    ListSales,
    GetSale,
    CreateSale,
    DeleteSale,
    GetSalesStats,
)


class SaleController:
    def list(self):
        page = request.args.get("page", 1, type=int)
        size = request.args.get("size", 10, type=int)

        usecase = ListSales()
        result = usecase.execute(page=page, size=size)
        return jsonify(result)

    def get(self, sale_id):
        usecase = GetSale()
        sale = usecase.execute(sale_id)
        if not sale:
            return jsonify({"error": "Venda não encontrada"}), 404
        return jsonify(sale)

    def create(self):
        data = request.get_json()

        required_fields = ["product_id", "quantity", "total_price"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Campo '{field}' é obrigatório"}), 400

        date = datetime.fromisoformat(data.get("date")) if data.get("date") else datetime.utcnow()

        usecase = CreateSale()
        sale = usecase.execute(
            product_id=data["product_id"],
            quantity=data["quantity"],
            total_price=data["total_price"],
            date=date,
        )
        return jsonify(sale), 201

    def delete(self, sale_id):
        usecase = DeleteSale()
        success = usecase.execute(sale_id)
        if not success:
            return jsonify({"error": "Venda não encontrada"}), 404
        return "", 204

    def stats(self):
        usecase = GetSalesStats()
        result = usecase.execute()
        return jsonify(result)
