from repositories.product_repository import ProductRepository


class ListProducts:
    def __init__(self):
        self.repository = ProductRepository()

    def execute(self, page=1, size=10, sort_by="id", sort_order="asc", category_ids=None, search=None):
        products, total = self.repository.find_all(
            page=page,
            size=size,
            sort_by=sort_by,
            sort_order=sort_order,
            category_ids=category_ids,
            search=search,
        )
        return {
            "products": [product.to_dict() for product in products],
            "totalElements": total,
            "page": page,
            "size": size,
            "totalPages": (total + size - 1) // size,
        }


class GetProduct:
    def __init__(self):
        self.repository = ProductRepository()

    def execute(self, product_id):
        product = self.repository.find_by_id(product_id)
        if not product:
            return None
        return product.to_dict()


class CreateProduct:
    def __init__(self):
        self.repository = ProductRepository()

    def execute(self, name, description, price, brand, category_id):
        product = self.repository.create(name, description, price, brand, category_id)
        return product.to_dict()


class UpdateProduct:
    def __init__(self):
        self.repository = ProductRepository()

    def execute(self, product_id, name, description, price, brand, category_id):
        product = self.repository.update(product_id, name, description, price, brand, category_id)
        if not product:
            return None
        return product.to_dict()


class DeleteProduct:
    def __init__(self):
        self.repository = ProductRepository()

    def execute(self, product_id):
        return self.repository.delete(product_id)
