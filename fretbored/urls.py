from django.urls import path
from .views import CategoryListView, CategoryDetailView, ScaleListView, ScaleDetailView, UserListView, UserDetailView, SavedScaleListView

urlpatterns = [
  path('', CategoryListView.as_view()),
  path('<int:pk>', CategoryDetailView.as_view()),
  path('scales/', ScaleListView.as_view()),
  path('scales/<int:pk>', ScaleDetailView.as_view()),
  path('saved_scales/', SavedScaleListView.as_view()),
  path('users/', UserListView.as_view()),
  path('users/<int:pk>', UserDetailView.as_view())
]