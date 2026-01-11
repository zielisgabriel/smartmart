from flask import Blueprint
from controllers.products.list_product_controller import ListProductController
from controllers.products.get_product_controller import GetProductController
from controllers.products.create_product_controller import CreateProductController
from controllers.products.update_product_controller import UpdateProductController
from controllers.products.delete_product_controller import DeleteProductController

product_routes = Blueprint("products", __name__)

listProductController = ListProductController()
getProductController = GetProductController()
createProductController = CreateProductController()
updateProductController = UpdateProductController()
deleteProductController = DeleteProductController()

product_routes.add_url_rule("/list", view_func=listProductController.listProduct, methods=["GET"])
product_routes.add_url_rule("/create", view_func=createProductController.createProduct, methods=["POST"])
product_routes.add_url_rule("/<int:product_id>", view_func=getProductController.getProduct, methods=["GET"])
product_routes.add_url_rule("/update/<int:product_id>", view_func=updateProductController.updateProduct, methods=["PUT"])
product_routes.add_url_rule("/delete/<int:product_id>", view_func=deleteProductController.deleteProduct, methods=["DELETE"])
