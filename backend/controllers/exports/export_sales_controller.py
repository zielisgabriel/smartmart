from flask import Response
from usecases.exports.export_sales_usecase import ExportSalesUsecase


class ExportSalesController:
    def __init__(self):
        self.usecase = ExportSalesUsecase()

    def exportSales(self):
        csv_content = self.usecase.execute()
        
        return Response(
            csv_content,
            mimetype="text/csv",
            headers={"Content-Disposition": "attachment; filename=sales.csv"}
        )
