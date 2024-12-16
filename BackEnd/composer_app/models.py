from django.db import models
from user_app.models import User

# Create your models here.
class Composer(models.Model):
  pass

class FavoriteComposers(models.Model):
  composer_id = models.PositiveIntegerField()
  user = models.ForeignKey(User, related_name='fav_composer_list', on_delete=models.CASCADE)