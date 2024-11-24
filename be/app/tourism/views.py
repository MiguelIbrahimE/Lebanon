from django.http import JsonResponse
from django.conf import settings

def get_destinations(request):
    destinations = TourismDestination.objects.all()
    response = [
        {
            "id": destination.id,
            "name": destination.name,
            "image": f"/{destination.image}",  # Adjusted for public folder
            "description": destination.description,
        }
        for destination in destinations
    ]
    return JsonResponse(response, safe=False)
