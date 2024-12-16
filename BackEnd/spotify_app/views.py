from django.shortcuts import render
from rest_framework.views import APIView
from requests import Request, post
from django.http import HttpResponseRedirect, JsonResponse
# from .credentials import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
from cro_music_proj.settings import env
import base64

CLIENT_ID = env.get("CLIENT_ID")
CLIENT_SECRET = env.get("CLIENT_SECRET")
REDIRECT_URI = env.get("REDIRECT_URI")
# from ..user_app.views import TokenReq
# from rest_framework import status, response
# from rest_framework.response import Response
# from .extras import check_tokens, create_or_update_tokens, is_spotify_authenticated, spotify_request_execution
# from .models import Token

# Create your views here.
class SpotifyLogin(APIView):

  def get(self, request):
    scopes = "user-read-currently-playing user-read-playback-state user-modify-playback-state"
    url = Request('GET', 'https://accounts.spotify.com/authorize?', params={
      'client_id' : CLIENT_ID,
      'response_type' : 'code',
      'redirect_uri' : REDIRECT_URI,
      'scope' : scopes
    }).prepare().url
    return HttpResponseRedirect(url)

# class SpotifyRedirect(APIView):

def spotify_redirect(request):
  print(request)
  code = request.GET.get('code')
  error = request.GET.get('error')
  print('Hello')
  print(code)
  if error:
    print(error)

  credentials = f"{CLIENT_ID}:{CLIENT_SECRET}".encode('utf-8')
  base64_credentials = base64.b64encode(credentials).decode("utf-8")

  response = post("https://accounts.spotify.com/api/token", data = {
    'grant_type' : 'authorization_code',
    'code' : code,
    'redirect_uri' : REDIRECT_URI,
    # 'client_id' : CLIENT_ID,
    # 'client_secret' : CLIENT_SECRET
  },
  headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'Authorization': f"Basic {base64_credentials}"
  }).json()
  print(response)

  token = response.get('access_token')


  return JsonResponse(token, safe=False)

  pass



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