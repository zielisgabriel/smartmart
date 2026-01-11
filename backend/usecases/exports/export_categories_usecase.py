from repositories.category_repository import CategoryRepository
import csv
from io import StringIO


class ExportCategoriesUsecase:
    def __init__(self):
        self.repository = CategoryRepository()

    def execute(self):
        categories = self.repository.find_all()
        
        output = StringIO()
        writer = csv.writer(output)
        
        writer.writerow(["id", "name"])
        
        for category in categories:
            writer.writerow([
                category.id,
                category.name
            ])
        
        return output.getvalue()
