from rest_framework import serializers
from .models import Scale
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
User = get_user_model()

class ScaleSerializer(serializers.ModelSerializer):

  class Meta:
      model = Scale
      fields = ('id', 'name', 'intervals', 'modes')



class PopulatedScaleSerializer(serializers.ModelSerializer):

  class Meta:
      model = Scale
      fields = ('id', 'name', 'intervals', 'modes')


# class UserSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = ('username', 'email', 'saved')

class PopulatedUserSerializer(serializers.ModelSerializer):
    savedScales = PopulatedScaleSerializer(many=True)
    class Meta:
        model = User
        fields = ('username', 'email', 'savedScales')
