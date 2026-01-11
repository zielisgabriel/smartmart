from flask import jsonify
from repositories.product_repository import ProductRepository

class GetProductUsecase():
  def __init__(self):
    self.repository = ProductRepository()

  def execute(self, product_id: int):
    return jsonify(self.repository.find_by_id(product_id))