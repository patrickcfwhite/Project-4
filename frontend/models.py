from django.contrib.postgres.fields import ArrayField, HStoreField
from django.db import models

# Create your models here.
class Scale(models.Model):
    name = models.CharField(max_length=50)
    intervals = ArrayField(models.IntegerField())
    modes = HStoreField()

