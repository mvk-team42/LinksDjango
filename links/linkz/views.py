from linkz.models import Link
from django.http import HttpResponse
#from django.shortcuts import render_to_response


def home(request):
    '''Shows the ultimate homepage of ultimate destiny.'''
    link_list = Link.objects.all().order_by('-pub_date')
    output = "Hellowz, ur @ linkz index!\n"+', '.join([l.href for l in link_list])
    return HttpResponse(output)

# def linkhandler(request):
#     context = Context()
#     return render_to_response()
