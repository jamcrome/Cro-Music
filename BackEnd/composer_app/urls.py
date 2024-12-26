from django.urls import path
from .views import Composer, FavComposer

urlpatterns = [
  path('<int:id>/', Composer.as_view(), name='composer'),
  path('<int:id>/favorite/', FavComposer.as_view(), name='favorite_composer'),
  path('favorites/', FavComposer.as_view(), name='favorites'),
]