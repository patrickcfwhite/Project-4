from django.contrib.postgres.fields import ArrayField, HStoreField
from django.db import models
from django.contrib.auth.models import AbstractUser
# User = get_user_model()

# Create your models here.


class Scale(models.Model):
    name = models.CharField(max_length=50)
    intervals = ArrayField(models.IntegerField())
    modes = HStoreField()
    # user = models.ForeignKey(User, related_name='scales', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}'


class User(AbstractUser):
    savedScales = models.ForeignKey('Scale', related_name='users', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.username}'
