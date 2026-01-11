from flask import Flask
from flask_cors import CORS
from config import Config
from database import db
from routes.category_routes import category_routes
from routes.product_routes import product_routes
from routes.sale_routes import sale_routes
from routes.import_routes import import_routes
from routes.export_routes import export_routes


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)

    app.register_blueprint(category_routes, url_prefix="/api/categories")
    app.register_blueprint(product_routes, url_prefix="/api/products")
    app.register_blueprint(sale_routes, url_prefix="/api/sales")
    app.register_blueprint(import_routes, url_prefix="/api/import")
    app.register_blueprint(export_routes, url_prefix="/api/export")

    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(port=5000, debug=True)
