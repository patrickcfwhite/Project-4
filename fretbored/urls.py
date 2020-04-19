from django.urls import path
from .views import ListView, DetailView, UserListView, UserDetailView

urlpatterns = [
  path('', ListView.as_view()),
  path('<int:pk>', DetailView.as_view()),
  path('users/', UserListView.as_view()),
  path('users/<int:pk>', UserDetailView.as_view())
]