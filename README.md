Example Django project!
=======================

Sweet links project. :)


Setup instructions for LinksDjango
----------------------------------

The settings.py.default should be renamed settings.py and contain a
variable called SITE_ID, containing whatever mysterious id generated
by
	python manage.py tellsiteid

Another good idea is to add yourself as an admin in the settings.py file.


Installing Django+MongoDB
-------------------------
### Linux instructions  

Install virtualenv:  
`pip install virtualenv`  

Create a new environment:  
`virtualenv nonrel-env`  

Change to new environment:  
`source nonrel-env/bin/activate`  

Install django-nonrel from git repo:  
`nonrel-env/bin/pip install git+https://github.com/django-nonrel/django-nonrel.git`  

Install djangotoolbox from git repo:  
`nonrel-env/bin/pip install djangotoolbox

Install MongoDB from git repo:  
`nonrel-env/bin/pip install git+https://github.com/django-nonrel/mongodb-engine.git`  
