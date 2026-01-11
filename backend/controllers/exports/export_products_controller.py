from flask import Response
from usecases.exports.export_products_usecase import ExportProductsUsecase


class ExportProductsController:
    def __init__(self):
        self.usecase = ExportProductsUsecase()

    def exportProducts(self):
        csv_content = self.usecase.execute()
        
        return Response(
            csv_content,
            mimetype="text/csv",
            headers={"Content-Disposition": "attachment; filename=products.csv"}
        )
