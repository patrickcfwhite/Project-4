from django.urls import path
from .views import RegisterView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view()), # sending requests to  '/register' to the register view(controller)
    path('login/', LoginView.as_view()), # and the same for login
]
