from rest_framework.serializers import ModelSerializer
from .models import SpotifyAccessToken

class TokenSerializer(ModelSerializer):

  class Meta:
    model = SpotifyAccessToken
    fields = '__all__'