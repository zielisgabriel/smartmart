from flask import jsonify, request
from usecases.imports.import_categories_usecase import ImportCategoriesUsecase
from io import StringIO


class ImportCategoriesController:
    def __init__(self):
        self.usecase = ImportCategoriesUsecase()

    def importCategories(self):
        if "file" not in request.files:
            return jsonify({"error": "Nenhum arquivo enviado"}), 400

        file = request.files["file"]
        if not file.filename or not file.filename.endswith(".csv"):
            return jsonify({"error": "Apenas arquivos .csv são permitidos"}), 400

        content = file.read().decode("utf-8")
        count = self.usecase.execute(StringIO(content))

        return jsonify({"imported": count}), 200