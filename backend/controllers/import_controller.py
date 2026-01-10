from flask import jsonify, request
from sqlalchemy.exc import IntegrityError
from usecases.import_usecases import ImportCategories, ImportProducts, ImportSales


class ImportController:
    def import_categories(self):
        if "file" not in request.files:
            return jsonify({"error": "Nenhum arquivo enviado"}), 400

        file = request.files["file"]
        if not file.filename or not file.filename.endswith(".csv"):
            return jsonify({"error": "Apenas arquivos .csv são permitidos"}), 400

        try:
            content = file.read().decode("utf-8")
            usecase = ImportCategories()
            count = usecase.execute(content)
            return jsonify({"imported": count})
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        except IntegrityError as e:
            return jsonify({"error": "Erro de integridade: categoria já existe ou dados inválidos"}), 400

    def import_products(self):
        if "file" not in request.files:
            return jsonify({"error": "Nenhum arquivo enviado"}), 400

        file = request.files["file"]
        if not file.filename or not file.filename.endswith(".csv"):
            return jsonify({"error": "Apenas arquivos .csv são permitidos"}), 400

        try:
            content = file.read().decode("utf-8")
            usecase = ImportProducts()
            count = usecase.execute(content)
            return jsonify({"imported": count})
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        except IntegrityError as e:
            return jsonify({"error": "Erro de integridade: importe as categorias primeiro"}), 400

    def import_sales(self):
        if "file" not in request.files:
            return jsonify({"error": "Nenhum arquivo enviado"}), 400

        file = request.files["file"]
        if not file.filename or not file.filename.endswith(".csv"):
            return jsonify({"error": "Apenas arquivos .csv são permitidos"}), 400

        try:
            content = file.read().decode("utf-8")
            usecase = ImportSales()
            count = usecase.execute(content)
            return jsonify({"imported": count})
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        except IntegrityError as e:
            return jsonify({"error": "Erro de integridade: importe os produtos primeiro"}), 400
