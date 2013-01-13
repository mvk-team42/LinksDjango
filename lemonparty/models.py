from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=300)
    personal_number = models.IntegerField()

    def __unicode__(self):
        return "[" + self.name + "," + str(self.personal_number) + "]"