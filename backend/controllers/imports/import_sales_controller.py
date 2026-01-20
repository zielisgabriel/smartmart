from flask import jsonify, request
from usecases.imports.import_sales_usecase import ImportSalesUsecase
from io import StringIO
from exceptions.bad_request_exception import BadRequestException

class ImportSalesController:
    def __init__(self):
        self.usecase = ImportSalesUsecase()

    def importSales(self):
        if "file" not in request.files:
            raise BadRequestException("Nenhum arquivo enviado")

        file = request.files["file"]
        if not file.filename or not file.filename.endswith(".csv"):
            raise BadRequestException("Apenas arquivos .csv são permitidos")

        content = file.read().decode("utf-8")
        count = self.usecase.execute(StringIO(content))

        return jsonify({"imported": count}), 200