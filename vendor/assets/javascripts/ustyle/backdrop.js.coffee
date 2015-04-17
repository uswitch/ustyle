class Backdrop
  instance = null

  constructor: ->
    if instance
      return instance
    else
      instance = this
