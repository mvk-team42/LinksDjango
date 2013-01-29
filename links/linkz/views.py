
from django.core import serializers
from django.shortcuts import render_to_response
from linkz.models import Link
from django.http import HttpResponse
from django.template.loader import get_template
from django.template import RequestContext
from models import *

#from django.shortcuts import render_to_response


def home(request):
    '''Shows the ultimate homepage of ultimate destiny.'''
    link_list = Link.objects.all().order_by('-pub_date')
    output = "Hellowz, ur @ linkz index!\n"+', '.join([l.href for l in link_list])
    return HttpResponse(output)
    
def super_slide(request, slide):
    if not slide:
        alla_daniels = Daniel.objects.all()
        return HttpResponse(alla_daniels)
    else:
        return HttpResponse(Daniel.objects.filter(name__contains=slide))
        
def daniel(request):
    c = RequestContext(request)
    return render_to_response('daniel_site.html', c)
        
def search(request):
    response = '[]'

    if 'free_text' in request.GET:
        response = serializers.serialize('json', Publication.objects.filter(title__contains=request.GET['free_text']))
        
    elif 'source' in request.GET:
        if 'tag' in request.GET:
            tags = request.GET['tag'].split('+')
        
            for t in tags:
                if response == '[]':
                    response = serializers.serialize('json', Source.objects.filter(name__contains=request.GET['source']).filter(tag=t))
        else:
            response = serializers.serialize('json', Source.objects.filter(name__contains=request.GET['source']))
    
    print response
    
    return HttpResponse(response, mimetype="application/json")

# def linkhandler(request):
#     context = Context()
#     return render_to_response()
