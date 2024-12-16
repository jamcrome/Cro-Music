from django.db import models

# Create your models here.
class Documents(models.Model):
  name = models.CharField(max_length=255, default='')
  pdf_file = models.FileField(upload_to='library/')
  uploaded_at = models.DateTimeField(auto_now_add=True)

