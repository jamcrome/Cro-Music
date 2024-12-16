from rest_framework.serializers import ModelSerializer
from .models import User
# from composer_app.models import FavoriteComposers
from composer_app.serializers import FavoriteComposersSerializer

class UserSerializer(ModelSerializer):
  fav_composer_list = FavoriteComposersSerializer(many=True)

  class Meta:
    model = User
    fields = ['first_name', 'email', 'date_joined', 'fav_composer_list']
    # fields = '__all__'