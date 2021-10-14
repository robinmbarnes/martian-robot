# martian-robot

## Important points

The app is locked to node version >= 14.0.0. This is to ensure you don't try and use it with a different version, which may cause issues. It will not install on a version lower than this.

If you really want to try running it on a lower version you can remove the 

```
engine-strict=true
```

line from ./npmrc

I did not build a backend, because it seemed pointless as you can run the app via webpack dev server to see that it works.

## Running the app

From the project root directory do

```
npm install
```

When that is complete do

```
npm run serve
```

Run the tests

```
npm test
```

This should open the browser and serve the app. I know in the past webpack has had some config issues when running under windows, but I don't have a windows machine to test on.
I think it should be fine, but if you run under windows and get a blank webpage, please contact me via the recruiter, it's probably just a small webpack config tweak needed, but it's hard to tell since I have not been able to test using windows.

## Caveats

There are some things I think I could be improved upon, but there is a limit to the time I will spend before I've even have an interview. These are a list of things
I'd improve given more time:

* Setup a webpack deployment build. Since I think no backend is required for this app, this would just build a html / css / js bundle that in production would just be served via something like nginx. Don't see the point in node purely to serve a frontend.
* Add error handling to the input parser. At the moment this assumes good inputs. Things I'd check for: malformed input, invalid input (max size of grid being 50 x 50, no robots with starting position off the grid).
* A basic test in somthing like webdriver io to test e2e
* Possibly some unit tests around the react components, but if I had an e2e test (above) to test input / output via headless browser, when combined with current unit tests this could be an overkill
* Better typing: types which aren't local to state-machine (like State, Direction) should be moved to their own type file, seems odd importing all types from state-machine. Also could probably do something better for the types around the action payload so I wouldn't have to use any for the payload type in the state machine function.
