from database import db
from entities.sale import Sale
from sqlalchemy import func
from decimal import Decimal
from datetime import datetime

class SaleRepository:
    def find_all(self, page=1, size=10):
        total = Sale.query.count()
        sales = Sale.query.order_by(Sale.date.desc()).offset((page - 1) * size).limit(size).all()
        return sales, total

    def find_by_id(self, sale_id):
        return Sale.query.get(sale_id)

    def create(self, product_id: int, quantity: int, total_price: Decimal, date: datetime):
        sale = Sale(
            product_id=product_id,
            quantity=quantity,
            total_price=total_price,
            date=datetime.strftime(date, "%Y-%m-%d"),
        )
        db.session.add(sale)
        db.session.commit()
        return sale

    def delete(self, sale_id):
        sale = self.find_by_id(sale_id)
        if not sale:
            return False
        db.session.delete(sale)
        db.session.commit()
        return True

    def get_stats(self):
        total_sales = db.session.query(func.sum(Sale.total_price)).scalar() or 0
        total_quantity = db.session.query(func.sum(Sale.quantity)).scalar() or 0
        sales_count = Sale.query.count()
        return {
            "total_sales": total_sales,
            "total_quantity": total_quantity,
            "sales_count": sales_count,
        }

    def bulk_create(self, sales_data):
        try:
            created = []
            for data in sales_data:
                sale = Sale(
                    product_id=data["product_id"],
                    quantity=data["quantity"],
                    total_price=data["total_price"],
                    date=data["date"],
                )
                db.session.add(sale)
                created.append(sale)
            db.session.commit()
            return created
        except Exception:
            db.session.rollback()
            raise

    def get_monthly_stats(self, year: int):
        from sqlalchemy import extract
        
        results = db.session.query(
            extract('month', Sale.date).label('month'),
            func.sum(Sale.quantity).label('total_quantity'),
            func.sum(Sale.total_price).label('total_revenue'),
            func.count(Sale.id).label('sales_count')
        ).filter(
            extract('year', Sale.date) == year
        ).group_by(
            extract('month', Sale.date)
        ).order_by(
            extract('month', Sale.date)
        ).all()
        
        monthly_data = []
        for month in range(1, 13):
            month_result = next((r for r in results if int(r.month) == month), None)
            if month_result:
                monthly_data.append({
                    "month": month,
                    "total_quantity": int(month_result.total_quantity),
                    "total_revenue": float(month_result.total_revenue),
                    "sales_count": int(month_result.sales_count)
                })
            else:
                monthly_data.append({
                    "month": month,
                    "total_quantity": 0,
                    "total_revenue": 0.0,
                    "sales_count": 0
                })
        
        return monthly_data
