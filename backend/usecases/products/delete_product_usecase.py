from repositories.product_repository import ProductRepository


class DeleteProductUsecase:
    def __init__(self):
        self.repository = ProductRepository()

    def execute(self, product_id):
        return self.repository.delete(product_id)