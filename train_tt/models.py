from django.db import models

# Create your models here.


class train_dest(models.Model):

    train_no = models.CharField(max_length=5, default="0")
    train_name = models.CharField(max_length=50, default='')
    station_codes = models.TextField(max_length=500, default='')
    reversed = models.BooleanField(default=False)

    def __str__(self):
        return self.train_name+" "+str(self.train_no)


class Coach_detail(models.Model):
    train_no = models.CharField(max_length=5, default="0")
    train_name = models.CharField(max_length=50, default='')
    Coach = models.TextField(max_length=500, default='')

    def __str__(self):
        return self.train_name+" "+str(self.train_no)
