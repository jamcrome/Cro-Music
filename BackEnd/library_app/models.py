from django.db import models
from user_app.models import User

# Create your models here.
class UploadedFile(models.Model):
  # name = models.CharField(max_length=255, default='')
  file = models.FileField(upload_to='uploads/')
  uploaded_at = models.DateTimeField(auto_now_add=True)
  # user = models.ForeignKey(User, related_name='library', on_delete=models.CASCADE)

