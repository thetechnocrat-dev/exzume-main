# Exzume
To run, make sure mongoDB is running and then navigate to directory and type in command line:
$ npm install
$ webpack --watch
$ node ./bin/www

# RESTful Architecture (Internal / Client-Facing)
- 'GET'     /auth/:username                   -- show user object as JSON

- 'GET'     /auth/insights                    -- show all user's insights
- 'GET'     /auth/insights/:insight-id        -- show insight
- 'PUT'     /auth/insights/:insight-id        -- update insight (star/unstar)
- 'DELETE'  /auth/insights/:insight-id        -- delete insight
- 'POST'    /auth/insights/:insight-id        -- create insight (based on data collection tool)

- 'GET'     /auth/features                    -- show all user's features as JSON
- 'GET'     /auth/features/:feature-id        -- show feature (db popularity, etc.)
- 'PUT'     /auth/features/:feature-id        -- add user to users array or edit user array
- 'POST'    /auth/features/:feature-id        -- create feature

- 'GET'     /auth/:datastream                 -- request auth resource (returns user credentials)
- 'GET'     /auth/:datastream/callbackURL     -- redirect user to dashboard
- 'GET'     /auth/:datastream/:feature-id     -- get user's datastream's feature document
- 'PUT'     /auth/:datastream/:feature-id     -- add data to feature document

- 'GET'     /auth/plot?feat1=:feature-id?feat2=:???     -- plot features over time

# Account Info - for signing up for api dev accounts

email: exzume.app@gmail.com
pw   : knowthyself42!

current accounts

fitbit: https://dev.fitbit.com/apps/details/227TQM
lastFM:
- Application name exzume
- API key	d92bbfbcd24fdfd9b30f342cfe704e2d
- Shared secret	a3c44d2356aba4e6f5257c9240e47ed8
- Registered to	frealism

https:
- Congratulations! Your certificate and chain have been saved at
  /etc/letsencrypt/live/exzume.com/fullchain.pem. Your cert will
  expire on 2016-10-06. To obtain a new or tweaked version of this
  certificate in the future, simply run letsencrypt-auto again. To
  non-interactively renew *all* of your certificates, run
  "letsencrypt-auto renew"
