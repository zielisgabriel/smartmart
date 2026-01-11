from flask import Response
from usecases.exports.export_categories_usecase import ExportCategoriesUsecase


class ExportCategoriesController:
    def __init__(self):
        self.usecase = ExportCategoriesUsecase()

    def exportCategories(self):
        csv_content = self.usecase.execute()
        
        return Response(
            csv_content,
            mimetype="text/csv",
            headers={"Content-Disposition": "attachment; filename=categories.csv"}
        )
