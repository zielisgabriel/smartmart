from repositories.sale_repository import SaleRepository
import csv
from io import StringIO


class ExportSalesUsecase:
    def __init__(self):
        self.repository = SaleRepository()

    def execute(self):
        sales, _ = self.repository.find_all(page=1, size=10000)
        
        output = StringIO()
        writer = csv.writer(output)
        
        writer.writerow(["id", "product_id", "quantity", "total_price", "date"])
        
        for sale in sales:
            writer.writerow([
                sale.id,
                sale.product_id,
                sale.quantity,
                float(sale.total_price),
                sale.date.isoformat()
            ])
        
        return output.getvalue()
