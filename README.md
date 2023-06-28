### Here we go

Little diary of events

#### Jan 1st ish - wrote some code with end points, users and notes

- Pretty fun just hammering away for a bit

#### March 7th - how the hell did I make a data base?

Nice one, I wrote a script to do data base things with some commands.

okay brew is your new best friend `brew services list` is your home.

Then `brew services start` something...

- ahhh ok after restarting and re-install everything I realized I was using the wrong command. I was running
  `psql postgresql` but it's `psql postgres`

- check what users are installed - \du (inside Postgres)

...

Basically all the good set up notes were here - https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/

Okay after having issues with software versioning I was told the best thing to do is to run the DB on Docker. They you get an nice image and container you can connect to and don't have to worry about the version of node etc..

I've got it running in docker now. That took a day lol.

Okay here's how to run the docker instance


Start docker container using this:
docker run --name notesdb -d -p 5432:5432 -e POSTGRES_PASSWORD=<<<>>> -e POSTGRES_USER=freddie -d postgres

HOW TO OPEN TERMINAL IN DOCKER
docker exec -it notesdb bash or
docker exec -it notesdb psql -U Freddie


Issue with local host FE pointing at localhost BE is that firstly you have to ask it to save the auth cookies and second the dreaded CORS issues. 

