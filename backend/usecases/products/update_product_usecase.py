from repositories.product_repository import ProductRepository


class UpdateProductUsecase:
    def __init__(self):
        self.repository = ProductRepository()

    def execute(self, product_id, name, description, price, brand, category_id):
        return self.repository.update(
            product_id,
            name,
            description,
            price,
            brand,
            category_id
        )