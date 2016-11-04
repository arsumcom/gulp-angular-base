### App Angular + Bootstrap

## Installation

`npm install` to get all modules downloaded
`bower install` to get all bower components

## Run

`gulp serve` - to get local version
`gulp serve:dist` - to get production simulation


## Deploy

### Configure ssh
Configure `vim ~/.ssh/config`
```
Host jopwellfeeds-prod
    User ubuntu
    HostName feeds.jopwell.com
    IdentityFile ~/keys/knotwork.pem

```

### Dev
`gulp deploy-dev` - For development http://feedsdev.introstellar.com