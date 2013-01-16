from django.http import HttpResponse
#from django.shortcuts import render_to_response


def home(request):
    '''Shows the ultimate homepage of ultimate destiny.'''
    return HttpResponse("Hellowz, ur @ linkz index!")

# def linkhandler(request):
#     context = Context()
#     return render_to_response()
