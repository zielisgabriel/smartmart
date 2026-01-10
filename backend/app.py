from flask import Flask
from config import Config
from database import db
from routes import category_routes, product_routes, sale_routes, import_routes


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    app.register_blueprint(category_routes, url_prefix="/api/categories")
    app.register_blueprint(product_routes, url_prefix="/api/products")
    app.register_blueprint(sale_routes, url_prefix="/api/sales")
    app.register_blueprint(import_routes, url_prefix="/api/import")

    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(port=5000, debug=True)
