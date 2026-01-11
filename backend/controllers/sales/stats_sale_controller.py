from flask import jsonify
from usecases.sales.get_sales_stats_usecase import GetSalesStatsUsecase


class StatsSaleController:
    def __init__(self):
        self.usecase = GetSalesStatsUsecase()

    def getStats(self):
        result = self.usecase.execute()
        return jsonify(result)
