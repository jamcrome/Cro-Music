from django.shortcuts import render
from rest_framework.views import APIView
import requests
from rest_framework.response import Response
from user_app.models import User
from .models import FavoriteComposers
from rest_framework.status import (
  HTTP_201_CREATED,
  HTTP_200_OK,
  HTTP_404_NOT_FOUND
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

# Create your views here.

class Composer(APIView): #(rename ComposerInfo for composer info page)

  def get(self, request, id):

    api_endpoint = f"https://api.openopus.org/work/list/composer/{id}/genre/all.json"
    response = requests.get(api_endpoint)
    response_json = response.json()
    # update how data is returned

    return Response(response_json)

class TokenReq(APIView):
  authentication_classes=[TokenAuthentication]
  permission_classes=[IsAuthenticated]

class FavComposer(TokenReq):
  print("here")

  def get(self, request):
    pass

  def post(self, request, id):
    
    api_endpoint = f"https://api.openopus.org/work/list/composer/{id}/genre/all.json"
    response = requests.get(api_endpoint)
    response_json = response.json()
    composer = response_json['composer']

    # print(composer)
    # print(request.user)
    user = request.user
    favorite_composer, created = FavoriteComposers.objects.get_or_create(composer_id=id, portrait_url=composer['portrait'], name=composer['complete_name'], user=user)

    if created:
      return Response({"message": "Composer added to favorites"}, status=HTTP_201_CREATED)
    else:
      return Response({"message": "Composer already in favorites"}, status=HTTP_200_OK)
    
  def delete(self, request, id):
    
    user = request.user
    try:
      fav_composer = FavoriteComposers.objects.get(user=user, composer_id=id)
    except:
      # print(fav_composer)
      return Response({"error": "Composer not in favorites"}, status=HTTP_404_NOT_FOUND)

    fav_composer.delete()

    return Response({"message": f"Composer {id} removed from list"}, status=HTTP_200_OK)