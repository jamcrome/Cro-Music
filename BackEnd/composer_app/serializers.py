from rest_framework import serializers
from .models import FavoriteComposers

class FavoriteComposersSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteComposers
        fields = ['composer_id']