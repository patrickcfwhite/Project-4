from django.urls import path
from .views import ListView, DetailView, UserListView

urlpatterns = [
  path('', ListView.as_view()),
  path('<int:pk>', DetailView.as_view()),
  path('users/', UserListView.as_view())
]