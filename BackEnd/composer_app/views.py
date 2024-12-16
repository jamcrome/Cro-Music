from django.shortcuts import render
from rest_framework.views import APIView
import requests
from rest_framework.response import Response
from user_app.models import User
from .models import FavoriteComposers
from rest_framework.status import (
  HTTP_201_CREATED,
  HTTP_200_OK
)

# Create your views here.

class Composer(APIView):

  def get(self, request, id):

    api_endpoint = f"https://api.openopus.org/work/list/composer/{id}/genre/all.json"
    response = requests.get(api_endpoint)
    response_json = response.json()

    return Response(response_json)

class FavComposer(APIView):

  def post(self, request, id):

    user = request.user
    
    favorite_composer, created = FavoriteComposers.objects.get_or_create(composer_id=id, user=user)

    if created:
      return Response({"message": "Composer added to favorites"}, status=HTTP_201_CREATED)
    else:
      return Response({"message": "Composer already in favorites"}, status=HTTP_200_OK)

