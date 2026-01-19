from werkzeug.exceptions import HTTPException

class NotFoundException(HTTPException):
  code = 404
  description = "Não foi encontrado!"
  
  def __init__(self, description=None):
    super().__init__(description)