from django.urls import path
from .views import SignUp, LogIn, LogOut, Info, AdminUser

urlpatterns = [
  path('signup/', SignUp.as_view(), name='signup'),
  path('login/', LogIn.as_view(), name='login'),
  path('logout/', LogOut.as_view(), name='logout'),
  path('info/', Info.as_view(), name='info'),
  path('admin-user/', AdminUser.as_view(), name='admin_user'),
  # path('fav-composers/', FavComposerList.as_view(), name='fav-composers')
]