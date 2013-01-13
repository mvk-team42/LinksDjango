def isPrime(n):
	if n < 2:
		return False
	else:
		return isFactorOfSomeElement(n, range(2,n))

def isFactorOfSomeElement(n, array):
	for element in array:
		if n % element == 0:
			return False
	return True

def getPrimesInRange(first, last):
	primesInRange = []
	for n in range(first, last+1):
		if isPrime(n):
			primesInRange.append(n)
	return primesInRange

def getNPrimesFrom(n, first):
	primes = []
	i = first
	while len(primes) < n:
		if isPrime(i):
			primes.append(i)
		i += 1
	return primes
