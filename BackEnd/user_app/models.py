from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True, max_length=255)
    first_name = models.CharField(blank=False, max_length=50)
    last_name = models.CharField(blank=False, max_length=50)
    # token = models.CharField

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =['first_name', 'last_name']


# class Favorites




# class Profile(models.Model):

#     profile_pic = models.ImageField(null=True, blank=True)
#     user = models.ForeignKey(User, max_length=10, on_delete=models.CASCADE, null=True)


# class UserManager(BaseUserManager):
    
#     def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):

#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)

#         if extra_fields.get('is_staff') is not True:
#             raise ValueError('Superuser must have is_staff=True.')
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError('Superuser must have is_superuser=True.')
        
#         super_user = User(email=email, first_name=first_name, last_name=last_name)

#         return self.create_u