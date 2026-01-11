from repositories.sale_repository import SaleRepository
from datetime import datetime


class GetMonthlySalesStatsUsecase:
    def __init__(self):
        self.repository = SaleRepository()

    def execute(self, year: int = None):
        if year is None:
            year = datetime.now().year
        
        return self.repository.get_monthly_stats(year)
