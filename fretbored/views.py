from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth import get_user_model

from .models import Scale, Category, SavedScale
from .serializers import ScaleSerializer, PopulatedScaleSerializer, UserSerializer, PopulatedUserSerializer, CategorySerializer, PopulatedCategorySerializer, SavedScaleSerializer
# OwnerSerializer PopulatedOwnerSerializer
# from django.contrib.auth import get_user_model
User = get_user_model()


class CategoryListView(APIView):

    def get(self, request):
        categories = Category.objects.all()
        serializer = PopulatedCategorySerializer(categories, many=True)

        return Response(serializer.data)

    def post(self, request):
        # request.data['owner'] = request.user.id
        category = CategorySerializer(data=request.data)
        if category.is_valid():
            category.save()
            return Response(category.data, status=HTTP_201_CREATED)
        return Response(category.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class CategoryDetailView(APIView):

    # permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, pk):
        category = Category.objects.get(pk=pk)
        serializer = PopulatedCategorySerializer(category)

        return Response(serializer.data)

    def put(self, request, pk):
        category = Category.objects.get(pk=pk)
        updated_category = CategorySerializer(category, data=request.data)
        if (updated_category.is_valid()):
            updated_category.save()
            return Response(updated_category.data)
        return Response(updated_category.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        category = Category.objects.get(pk=pk)
        category.delete()
        return Response(status=HTTP_204_NO_CONTENT)


# Create your views here.
class ScaleListView(APIView):

    # permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        scales = Scale.objects.all()
        serializer = PopulatedScaleSerializer(scales, many=True)

        return Response(serializer.data)

    def post(self, request):
        # request.data['owner'] = request.user.id
        scale = ScaleSerializer(data=request.data)
        if scale.is_valid():
            scale.save()
            return Response(scale.data, status=HTTP_201_CREATED)
        return Response(scale.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class ScaleDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, pk):
        scale = Scale.objects.get(pk=pk)
        serializer = PopulatedScaleSerializer(scale)

        return Response(serializer.data)

    def put(self, request, pk):
        scale = Scale.objects.get(pk=pk)
        updated_scale = ScaleSerializer(scale, data=request.data)
        if (updated_scale.is_valid()):
            updated_scale.save()
            return Response(updated_scale.data)
        return Response(updated_scale.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        scale = Scale.objects.get(pk=pk)
        scale.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class SavedScaleListView(APIView):

    def post(self, request):
        savedScale = SavedScaleSerializer(data=request.data)
        if savedScale.is_valid():
            savedScale.save()
            return Response(savedScale.data, status=HTTP_201_CREATED)
        return Response(savedScale.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class UserListView(APIView):

    def get(self, request):
        users = User.objects.all()
        serializer = PopulatedUserSerializer(users, many=True)

        return Response(serializer.data)

    # def post(self, request):
    #     user = UserSerializer(data=request.data)
    #     if user.is_valid():
    #         user.save()
    #         return Response(user.data, status=HTTP_201_CREATED)
    #     return Response(user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class UserDetailView(APIView):

    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        serializer = PopulatedUserSerializer(user)

        return Response(serializer.data)

    def put(self, request, pk):

        user = User.objects.get(pk=pk)
        # if user.id != request.user.id:
        #     return Response(status=HTTP_401_UNAUTHORIZED)
        # if request.data.scale:
        #     scale = ScaleSerializer(data=request.data.scale)
        #     if not scale.is_valid():
        #         return Response(scale.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        updated_user = UserSerializer(user, data=request.data)
        if (updated_user.is_valid()):
            updated_user.save()
            return Response(updated_user.data)
        return Response(updated_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        user = User.objects.get(pk=pk)
        user.delete()
        return Response(status=HTTP_204_NO_CONTENT)
