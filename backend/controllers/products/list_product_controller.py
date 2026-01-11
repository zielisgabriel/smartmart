from flask import request
from usecases.products.list_product_usecase import ListProductsUsecase


class ListProductController:
    def __init__(self):
        self.usecase = ListProductsUsecase()

    def listProduct(self):
        page = request.args.get("page", "1")
        size = request.args.get("size", "10")

        return self.usecase.execute(page, size)