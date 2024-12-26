from django.shortcuts import render
from rest_framework.views import APIView
from requests import Request, post
from django.http import HttpResponseRedirect, JsonResponse
from cro_music_proj.settings import env
import base64
from .models import SpotifyAccessToken
from user_app.models import User
from rest_framework.status import HTTP_400_BAD_REQUEST

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

CLIENT_ID = env.get("CLIENT_ID")
CLIENT_SECRET = env.get("CLIENT_SECRET")
REDIRECT_URI = env.get("REDIRECT_URI")

# Create your views here.
class SpotifyLogin(APIView):

  def get(self, request):
    scopes = "user-read-private user-read-email"
    url = Request('GET', 'https://accounts.spotify.com/authorize?', params={
      'client_id' : CLIENT_ID,
      'response_type' : 'code',
      'redirect_uri' : REDIRECT_URI,
      'scope' : scopes
    }).prepare().url
    return HttpResponseRedirect(url)

def spotify_redirect(request):
  
  code = request.GET.get('code')
  error = request.GET.get('error')

  if error:
    print(error)

  credentials = f"{CLIENT_ID}:{CLIENT_SECRET}".encode('utf-8')
  base64_credentials = base64.b64encode(credentials).decode("utf-8")

  response = post("https://accounts.spotify.com/api/token", data = {
    'grant_type' : 'authorization_code',
    'code' : code,
    'redirect_uri' : REDIRECT_URI,
  },
  headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'Authorization': f"Basic {base64_credentials}"
  }).json()
  print(response)

  # authKey = request.session.session_key
  access_token = response.get('access_token')
  refresh_token = response.get('refresh_token')
  # expires_in = response.get('expires_in')
  # token_type = response.get('token_type')
  
  tokens = SpotifyAccessToken(
    access_token = access_token,
    refresh_token = refresh_token,
  )
  tokens.save()
  print(tokens)
  
  url = f'http://localhost:5173/account/?access_token={access_token}'
  return HttpResponseRedirect(url)

