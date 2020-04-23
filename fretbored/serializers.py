from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Scale, Category, SavedScale
User = get_user_model()


class ScaleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Scale
        fields = ('id', 'name', 'intervals', 'scale_position')


class PopulatedScaleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Scale
        fields = ('id', 'name', 'intervals', 'scale_position')


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'name', 'parent_scale', 'scales')


class PopulatedCategorySerializer(serializers.ModelSerializer):
    parent_scale = ScaleSerializer()
    scales = ScaleSerializer(many=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'parent_scale', 'scales')


class SavedScaleSerializer(serializers.ModelSerializer):

    class Meta:
        model = SavedScale
        fields = ('id', 'scale', 'position')


class PopulatedSavedScaleSerializer(serializers.ModelSerializer):
    scale = ScaleSerializer()

    class Meta:
        model = SavedScale
        fields = ('id', 'scale', 'position')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'savedScales')


class PopulatedUserSerializer(serializers.ModelSerializer):
    savedScales = PopulatedScaleSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'savedScales')
