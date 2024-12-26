from django.db import models
from user_app.models import User

# Create your models here.
class Composer(models.Model):
  pass

class FavoriteComposers(models.Model):
  composer_id = models.PositiveIntegerField()
  portrait_url = models.URLField(max_length=255, blank=True, null=True)
  name = models.CharField(max_length=100, blank=True)
  user = models.ForeignKey(User, related_name='fav_composer_list', on_delete=models.CASCADE)

  def __str__(self):
    return self.name