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

# class TokenReq(APIView):


class SpotifyLogin(APIView):

  # authentication_classes=[TokenAuthentication]
  # permission_classes=[IsAuthenticated]

  # def get(self, request):
  #   user = request.user
  #   print(user)

  def get(self, request):
    # print(request.query_params.get('user'))
    # user = request.query_params.get('user')
    scopes = "user-read-private user-read-email"
    url = Request('GET', 'https://accounts.spotify.com/authorize?', params={
      'client_id' : CLIENT_ID,
      'response_type' : 'code',
      'redirect_uri' : REDIRECT_URI,
      'scope' : scopes
    }).prepare().url
    return HttpResponseRedirect(url)

def spotify_redirect(request):
  print(request)
  # if not request.user.is_authenticated:
  #       return JsonResponse({"error": "User not authenticated"}, status=HTTP_400_BAD_REQUEST)
  
  code = request.GET.get('code')
  error = request.GET.get('error')
  # print('Hello')
  # print(code)
  if error:
    print(error)
    # return JsonResponse({"error": error}, status=HTTP_400_BAD_REQUEST)

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
  
  # if not access_token or not refresh_token:
  #       return JsonResponse({"error": "Failed to retrieve access token."}, status=HTTP_400_BAD_REQUEST)

  # user = request.query_params.get('user')
  # print(user)
  # spotify_token, created = SpotifyAccessToken.objects.get_or_create(user=user)

  # spotify_token.access_token = access_token
  # spotify_token.refresh_token = refresh_token  
  # spotify_token.save()
  
  tokens = SpotifyAccessToken(
    access_token = access_token,
    refresh_token = refresh_token,
  )
  tokens.save()
  print(tokens)
  
  url = f'http://localhost:5173/account/?access_token={access_token}'
  return HttpResponseRedirect(url)

# class SpotifyUserProfile(APIView):



  # access_token = response.get('access_token')
  # refresh_token = response.get('refresh_token')
  # expires_in = response.get('expires_in')
  # token_type = response.get('token_type')

  # authKey = request.session.session_key
  # print(authKey)
  # if not request.session.exists(authKey):
  #   print('not authKey exist')
  #   request.session.create()
  #   authKey = request.session.session_key

  # create_or_update_tokens(
  #   session_id=str(authKey),
  #   access_token=access_token,
  #   refresh_token=refresh_token,
  #   expires_in=expires_in,
  #   token_type=token_type
  # )

  # # Create a reidirect url to the current song details
  # redirect_url = "http://127.0.0.1:8000/spotify/current-song?key={authKey}"
  # return HttpResponseRedirect(redirect_url)
  # pass

# Checking whether the user has been authenticated by spotify
# class CheckAuthentication(APIView):
  
  # def get(self, request, format=None):
  #   key = self.request.session.session_key
  #   if not self.request.session.exists(key):
  #     self.request.session.create()
  #     key = self.request.session.session_key
  #   auth_status = is_spotify_authenticated(key)

  #   if auth_status:
  #     # Will be redirected to the credentials of a song
  #     redirect_url = f"http://localhost:8000/spotify/current-song?key={key}"
  #     return HttpResponseRedirect(redirect_url)
  #   else:
  #     # Will redirect us to Authentication
  #     redirect_url = f"http://127.0.0.1:8000/spotify/auth-url"
  #     return HttpResponseRedirect(redirect_url)
#   pass
    
# class CurrentSong(APIView):
  # kwarg = "key"
  # def get(self, request, format=None):
  #   key = request.GET.get(self.kwarg)
  #   token = Token.objects.filter(user=key)
  #   print(token)
  #   # print(key)

  #   # Create an endpoint
  #   endpoint = "player/currently-playing/"
  #   response = spotify_request_execution(key, endpoint)

  #   if "error" in response or "item" not in response:
  #     return Response({}, status = status.HTTP_204_NO_CONTENT)
    
  #   item = response.get('item')
  #   progress = response.get('progress_ms')
  #   is_playing = response.get('is_playing')
  #   duration = item.get('duration_ms')
  #   song_id = item.get('id')
  #   title = item.get('name')
  #   album_cover = item.get('album').get('images')[0].get('url')

  #   artists = ""
  #   for i, artist in enumerate(item.get("artists")):
  #     if i > 0:
  #       artist += ","
  #     name = artist.get("name")
  #     artists += name

  #   song = {
  #     "id" : song_id,
  #     "title" : title,
  #     "artist" : artists,
  #     "duration" : duration,
  #     "time" : progress,
  #     "album_cover" : album_cover,
  #     "is_playing" : is_playing
  #   }

  #   print(song)
  #   return Response(song, status=status.HTTP_200_OK)
  # pass