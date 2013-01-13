from django.shortcuts import render_to_response
from django.http import HttpResponse
import primes
from links.lemonparty.primes import getPrimesInRange


def index(request):
    return HttpResponse("Hello, world. You're at the index")

def primes(request,prime_ceiling):
    # now = datetime.datetime.now()
    primes = getPrimesInRange(1,int(prime_ceiling))
    html = "<html><body>Primes in range 1,40: </body></html> <br></br>"
    for prime in primes:
        html = html + str(prime) + " "
    
    return HttpResponse(html)

def template(request, low_prime, high_prime):
    primes = getPrimesInRange(int(low_prime), int(high_prime))
    return render_to_response('template.html',{'primes': primes})