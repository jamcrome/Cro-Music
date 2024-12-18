from django.db import models
from user_app.models import User

# Create your models here.
class SpotifyAccessToken(models.Model):
  # created_at = models.DateTimeField(auto_now_add=True)
  access_token = models.CharField(max_length=500)
  refresh_token = models.CharField(max_length=500)
  # expires_in = models.DateTimeField()
  # token_type = models.CharField(max_length=50)