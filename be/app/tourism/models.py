from django.db import models

class TourismDestination(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='destinations/')
    description = models.TextField()

    def __str__(self):
        return self.name
