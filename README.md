### App Angular + Bootstrap

## Installation

`npm install` to get all modules downloaded

`bower install` to get all bower components

`find ./ -type f -exec sed -i '' -e 's/myAppName/newAppName/g' {} \;` Replace with your app name


## Run

`gulp serve` - to get local version

`gulp serve:dist` - to get production simulation


## Deploy

### Configure ssh
Configure `vim ~/.ssh/config`
```
Host myapp-prod
    User ubuntu
    HostName myapp
    IdentityFile ~/keys/mykey.pem

```

### Dev deploy
`gulp deploy-dev`
