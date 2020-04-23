from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.contrib.auth.models import AbstractUser
# User = get_user_model()

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=50)
    parent_scale = models.ForeignKey(
        'Scale', related_name='parent_categories', blank=True, null=True, on_delete=models.CASCADE)
    scales = models.ManyToManyField(
        'Scale', related_name='categories', null=True)

    def __str__(self):
        return f'{self.name}'


class Scale(models.Model):
    name = models.CharField(max_length=50)
    intervals = ArrayField(models.IntegerField())
    scale_position = models.IntegerField()
    # user = models.ForeignKey(User, related_name='scales', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}'


class SavedScale(models.Model):
    scale = models.ForeignKey(
        'Scale', related_name='savedScales', null=True, on_delete=models.CASCADE)
    position = models.IntegerField()

    def __str__(self):
        return f'{self.scale} position {self.position}'


class User(AbstractUser):
    savedScales = models.ManyToManyField(
        'savedScale', related_name='users', null=True)

    def __str__(self):
        return f'{self.username}'
