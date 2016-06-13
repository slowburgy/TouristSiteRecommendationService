# Tourist Site Recommendation Service
Team Infinite Refill
임형선
허원영
임진석

_Execution guidelines_
(Based on Ubuntu 14.04)

Install mysql-server if not already installed. Set password to 'toursql'
$ sudo apt-get install mysql-server

Import the database toursql.sql in this directory into your default mysql database with:
$ mysql -u root -p mysql < toursql.sql

If node.js is not already installed, run:
$ sudo apt-get install -y build-essential
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ sudo ln -s /usr/bin/nodejs /usr/bin/node

Run:
$ node server.js 

and connect to http://localhost:3000 in your browser.

If the server fails in the login page, just restart the server.
