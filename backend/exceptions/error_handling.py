from flask import json, Flask
from werkzeug.exceptions import HTTPException

def register_error_handlers(app: Flask):
  @app.errorhandler(HTTPException)
  def handler_http_exception(e: HTTPException):
    response = e.get_response()
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response
  
  @app.errorhandler(Exception)
  def handler_generic_exception(e: Exception):
    return json.dumps({
        "code": 500,
        "name": "Internal Server Error",
        "description": str(e),
    }), 500, {"Content-Type": "application/json"}