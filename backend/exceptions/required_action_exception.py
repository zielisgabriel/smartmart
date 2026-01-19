from werkzeug.exceptions import HTTPException

class RequiredActionException(HTTPException):
  code=409
  description="Ação necessária!"
  actions: list[str]=[]

  def __init__(self, description=None, action=[]):
    super().__init__(description)
    self.actions=action