from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    first_name = models.CharField(blank=False, max_length=50)
    last_name = models.CharField(blank=False, max_length=50)
    email = models.EmailField(unique=True, max_length=255)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =['first_name', 'last_name']