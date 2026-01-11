from flask import jsonify, request
from usecases.sales.get_monthly_sales_stats_usecase import GetMonthlySalesStatsUsecase
from datetime import datetime


class MonthlyStatsSaleController:
    def __init__(self):
        self.usecase = GetMonthlySalesStatsUsecase()

    def getMonthlyStats(self):
        year = request.args.get("year", datetime.now().year, type=int)
        result = self.usecase.execute(year)
        return jsonify(result)
