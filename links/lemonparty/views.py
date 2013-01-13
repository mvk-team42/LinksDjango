from django.http import HttpResponse
import datetime

def index(request):
    return HttpResponse("Hello, world. You're at the index")

def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html> <br></br> Bla" % now
    return HttpResponse(html)