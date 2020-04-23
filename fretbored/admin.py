from django.contrib import admin
from .models import Scale, User, Category, SavedScale

# Register your models here.
admin.site.register(Scale)
admin.site.register(User)
admin.site.register(Category)
admin.site.register(SavedScale)
