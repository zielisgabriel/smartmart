from repositories.product_repository import ProductRepository


class ListProductsUsecase:
    def __init__(self):
        self.repository = ProductRepository()

    def execute(self, page, size):
        page = int(page)
        size = int(size)

        products, total = self.repository.find_all(page=page, size=size)

        return {
            "products": [product.to_dict() for product in products],
            "totalElements": total,
            "page": page,
            "size": size,
            "totalPages": (total + size - 1) // size,
        }
