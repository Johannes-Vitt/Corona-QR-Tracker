# API Documentation 
## API Secret: qrona_app

# how to hash
# params is a json object of all parameters passed except for the hash
# str = secret + JSON.stringify(params) + secret
# hash256(str)

## User 

Post /user: {
    mail: string
    tel: string
    hash: string required!
}, {
    _id: string
    mail: string
    tel: string
    code: string
}
<!-- mail or tel, one is required -->

Get /user: {
    hash: string
}, {
    [
        users
    ]
}


## POI

Post /poi: {
    location: string required!
    mail: string
    tel: string
    title: string required!
    category: string
    hash: string required!
}, {
    _id: string
    code: string
    location: string required!
    mail: string
    tel: string
    title: string required!
    category: string
    hash: string required!
}
<!-- mail or tel, one is required -->

Get /poi: {
    hash: string
}, {
    [
        pois
    ]
}


## Views

Post /view: {
    uid: string required!
    pid: string required!
    hash: string required!
}, {
    _id: string
    uid: string
    pid: string
    timestamp: string
}

Get /view: {
    hash: string
}, {
    [
        views
    ]
}