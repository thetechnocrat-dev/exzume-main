git # Exzume
To run, make sure mongoDB is running and then navigate to directory and type in command line:
$ npm install
$ webpack --watch
$ node ./bin/www

# RESTful Architecture (Internal / Client-Facing)
- `GET`     /auth/insights                    -- show all user's insights
- `GET`     /auth/insights/:insight-id        -- show insight
- `PUT`     /auth/insights/:insight-id        -- update insight (star/unstar)
- `DELETE`  /auth/insights/:insight-id        -- delete insight
- `POST`    /auth/insights/:insight-id        -- create insight (based on data collection tool)

- `GET`     /auth/features                    -- show all user's features as JSON
- `GET`     /auth/features/:feature-id        -- show feature (db popularity, etc.)
- `PUT`     /auth/features/:feature-id        -- add user to users array or edit user array
- `POST`    /auth/features/:feature-id        -- create feature* (validation later?)

- `GET`     /auth/datastreams/:datastream               -- request auth resource (returns user credentials)
- `GET`     /auth/datastreams/:datastream/callback      -- redirect user to dashboard
- `GET`     /auth/datastreams/:datastream/:feature-id   -- get user's datastream's feature document
- `PUT`     /auth/datastreams/:datastream/:feature-id   -- add data to feature document

- `GET`     /auth/plot?feat1=:feature-id?feat2=:???     -- plot features over time

# Account Info - for signing up for api dev accounts

email: exzume.app@gmail.com
pw   : knowthyself42!

lastfm:
username -- exzume
pw -- knowthyself42!

fitbit: https://dev.fitbit.com/apps/details/227TQM
lastFM:
Application name	exzume-development
API key	efe65c99aaf387249c3cf8ca16e6b884
Shared secret	78bff7ac8ce66ea1c5f1f43017dd9b21
Registered to	exzume
Application name	exzume-staging
API key	6165e89160ea80b699cb473f41028be6
Shared secret	48a32fc7b2e9d3c40dd5a69f235c48c5
Registered to	exzume

https:
- Congratulations! Your certificate and chain have been saved at
  /etc/letsencrypt/live/exzume.com/fullchain.pem. Your cert will
  expire on 2016-10-06. To obtain a new or tweaked version of this
  certificate in the future, simply run letsencrypt-auto again. To
  non-interactively renew *all* of your certificates, run
  "letsencrypt-auto renew"
