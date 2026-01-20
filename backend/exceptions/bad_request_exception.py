from werkzeug.exceptions import HTTPException

class BadRequestException(HTTPException):
  code = 400
  description = "Requisição sem sucesso!"

  def __init__(self, description=None):
    super().__init__(description)