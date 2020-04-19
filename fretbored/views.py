from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Scale, User
from .serializers import ScaleSerializer, PopulatedScaleSerializer, PopulatedUserSerializer
# OwnerSerializer PopulatedOwnerSerializer
# from django.contrib.auth import get_user_model
# User = get_user_model()


# Create your views here.
class ListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

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

class DetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, pk):
        scale = Scale.objects.get(pk=pk)
        serializer = PopulatedScaleSerializer(scale)

        return Response(serializer.data)

    def put(self, request, pk):
        # request.data['owner'] = request.user.id
        scale = Scale.objects.get(pk=pk)
        # if cat.owner.id != request.user.id:
        #     return Response(status=HTTP_401_UNAUTHORIZED)
        updated_scale = ScaleSerializer(scale, data=request.data)
        if (updated_scale.is_valid()):
            updated_scale.save()
            return Response(updated_scale.data)
        return Response(updated_scale.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        scale = Scale.objects.get(pk=pk)
        scale.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class UserListView(APIView):

    def get(self, request):
        users = User.objects.all()
        serializer = PopulatedUserSerializer(users, many=True)

        return Response(serializer.data)
