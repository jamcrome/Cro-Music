from .views import SpotifyLogin, spotify_redirect
from django.urls import path

urlpatterns = [
  path('login/', SpotifyLogin.as_view()),
  path("redirect/", spotify_redirect),
  # path("auth-url", AuthenticationURL.as_view()),
  # path("check-auth", CheckAuthentication.as_view()),
  # path("current-song", CurrentSong.as_view())
]